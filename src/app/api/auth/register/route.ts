import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Call Real API
        // Endpoint: POST https://api.vync.live/api/v1/auth/register/
        const response = await axios.post('https://api.vync.live/api/v1/auth/register/', body);
        
        return NextResponse.json(response.data, { status: 201 });
    } catch (error: any) {
        console.error('Register error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data || 'Registration failed' },
            { status: error.response?.status || 500 }
        );
    }
}
