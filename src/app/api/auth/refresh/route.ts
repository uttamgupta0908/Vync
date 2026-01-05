// import { NextResponse } from 'next/server';
// import { backendClient } from '@/src/shared/lib/server/backend-client';
// import { getRefreshToken, setAuthCookies } from '@/src/shared/lib/server/auth-utils';
// import { VYNC_API } from '@/src/shared/lib/constants';

// export async function POST() {
//     const refreshToken = await getRefreshToken();
    
//     if (!refreshToken) {
//         return NextResponse.json(
//             { error: 'No refresh token' },
//             { status: 401 }
//         );
//     }
    
//     try {
//         // backendClient doesn't automatically refresh on REFRESH route loops, 
//         // but we can use explicit call here as it's the refresh endpoint itself
//         const response = await backendClient.post(VYNC_API.AUTH.REFRESH, {
//             refresh: refreshToken
//         });
        
//         const { access, refresh } = response.data;
        
//         // Update Cookies
//         await setAuthCookies(access, refresh);
        
//         return NextResponse.json({ accessToken: access });
//     } catch (error: unknown) {
//         console.error('Refresh error:', error.response?.data || error.message);
//         return NextResponse.json(
//             { error: 'Refresh failed' },
//             { status: 401 }
//         );
//     }
// }
import { NextResponse } from 'next/server';
import axios from 'axios';
import { backendClient } from '@/src/shared/lib/server/backend-client';
import { getRefreshToken, setAuthCookies } from '@/src/shared/lib/server/auth-utils';
import { VYNC_API } from '@/src/shared/lib/constants';

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'No refresh token' },
      { status: 401 }
    );
  }

  try {
    const response = await backendClient.post(VYNC_API.AUTH.REFRESH, {
      refresh: refreshToken,
    });

    const { access, refresh } = response.data;

    await setAuthCookies(access, refresh);

    return NextResponse.json({ accessToken: access });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Refresh error:',
        error.response?.data ?? error.message
      );
    } else if (error instanceof Error) {
      console.error('Refresh error:', error.message);
    } else {
      console.error('Refresh error: Unknown error', error);
    }

    return NextResponse.json(
      { error: 'Refresh failed' },
      { status: 401 }
    );
  }
}
