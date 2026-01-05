import { NextResponse } from 'next/server';
import { backendClient } from '@/src/shared/lib/server/backend-client';

// Generic handler for GET, POST, DELETE
async function proxyRequest(
    request: Request,
    ctx: { params: Promise<{ path: string[] }> },
    method: 'get' | 'post' | 'delete'
) {
    const { path } = await ctx.params;
    
    // Construct backend URL path
    // Incoming: /api/feed/feeds/123 -> path=['feeds', '123']
    // Backend: /api/v1/feed/feeds/123
    const backendPath = `/api/v1/feed/${path.join('/')}/`;
    
    console.log(`[Feed Proxy] ${method.toUpperCase()} ${request.url} -> ${backendPath}`);

    try {
        let response;
        
        if (method === 'get') {
            const url = new URL(request.url);
            // Append query params if any
            const query = url.search ? url.search : '';
            console.log(`[Feed Proxy] Forwarding with query: ${query}`);
            response = await backendClient.get(`${backendPath}${query}`);
        } else if (method === 'post') {
            const body = await request.json().catch(() => ({}));
            response = await backendClient.post(backendPath, body);
        } else if (method === 'delete') {
            response = await backendClient.delete(backendPath);
        }

        return NextResponse.json(response?.data || {});
    } catch (error: any) {
        console.error(`Feed Proxy Error [${method.toUpperCase()} ${backendPath}]:`, error.response?.data || error.message);
        
        return NextResponse.json(
            { 
                error: 'Request failed', 
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
