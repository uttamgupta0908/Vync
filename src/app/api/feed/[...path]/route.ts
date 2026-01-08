import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { mapError } from '@/src/utils/error-mapping';

// Generic handler for GET, POST, DELETE
async function proxyRequest(
    request: Request,
    ctx: { params: Promise<{ path: string[] }> },
    method: 'get' | 'post' | 'delete'
) {
    const { path } = await ctx.params;
    
    // Construct backend URL path
    const backendPath = `/api/v1/feed/${path.join('/')}/`;
    
    console.log(`[Feed Proxy] ${method.toUpperCase()} ${request.url} -> ${backendPath}`);

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
        console.log(`[Feed Proxy Debug] SUCCESS ${backendPath}: ${Object.keys(responseData).length} keys in response`);
        return NextResponse.json(responseData);
    } catch (error: any) {
        const { message } = mapError(error);
        console.error(`[Feed Proxy Debug] ERROR ${method.toUpperCase()} ${backendPath}:`, {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        
        return NextResponse.json(
            { 
                error: message, 
                details: error.response?.data || error.message 
            },
            { status: error.response?.status || 500 }
        );
    }
}

export async function GET(req: Request, ctx: any) {
    return proxyRequest(req, ctx, 'get');
}

export async function POST(req: Request, ctx: any) {
    return proxyRequest(req, ctx, 'post');
}

export async function DELETE(req: Request, ctx: any) {
    return proxyRequest(req, ctx, 'delete');
}
