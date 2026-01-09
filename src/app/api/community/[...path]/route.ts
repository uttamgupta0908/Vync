import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { mapError } from '@/src/utils/error-mapping';

async function proxyRequest(
    request: Request,
    ctx: { params: Promise<{ path: string[] }> },
    method: 'get' | 'post' | 'delete'
) {
    const { path } = await ctx.params;
    const backendPath = `/api/v1/community/${path.join('/')}/`;
    
    console.log(`[Community Proxy] ${method.toUpperCase()} ${request.url} -> ${backendPath}`);

    try {
        let response;
        if (method === 'get') {
            const url = new URL(request.url);
            const query = url.search ? url.search : '';
            response = await backendClient.get(`${backendPath}${query}`);
        } else if (method === 'post') {
            const body = await request.json().catch(() => ({}));
            response = await backendClient.post(backendPath, body);
        } else if (method === 'delete') {
            response = await backendClient.delete(backendPath);
        }

        const responseData = response?.data || {};
        console.log(`[Community Proxy Debug] SUCCESS ${backendPath}: ${Object.keys(responseData).length} keys in response`);
        return NextResponse.json(responseData);
    } catch (error: unknown) {
        const { message } = mapError(error);
        const axiosError = error as { response?: { status?: number; data?: unknown }; message?: string };
        console.error(`[Community Proxy Debug] ERROR ${method.toUpperCase()} ${backendPath}:`, {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            message: axiosError.message
        });
        
        return NextResponse.json(
            { 
                error: message, 
                details: axiosError.response?.data || axiosError.message 
            },
            { status: axiosError.response?.status || 500 }
        );
    }
}

export async function GET(
    req: Request,
    ctx: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(req, ctx, 'get');
}

export async function POST(
    req: Request,
    ctx: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(req, ctx, 'post');
}

export async function DELETE(
    req: Request,
    ctx: { params: Promise<{ path: string[] }> }
) {
    return proxyRequest(req, ctx, 'delete');
}
