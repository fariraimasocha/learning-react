import { NextResponse } from 'next/server';

const baseUrl = process.env.ZOHO_BASE_URL;

export async function POST(request) {
  const accessToken = process.env.ZOHO_ACCESS_TOKEN;

  try {
    // Validate environment variables
    if (!baseUrl) {
      console.error('ZOHO_BASE_URL environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error: Missing base URL' },
        { status: 500 }
      );
    }

    if (!accessToken) {
      console.error('ZOHO_ACCESS_TOKEN environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error: Missing access token' },
        { status: 500 }
      );
    }

    const { orgName, domainName, emailId, firstName, lastName, password } =
      await request.json();

    // Validate required fields
    const requiredFields = {
      orgName,
      domainName,
      emailId,
      firstName,
      lastName,
      password,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const body = {
      orgName,
      domainName,
      emailId,
      firstName,
      lastName,
      password,
    };

    const url = `${baseUrl}/organization`;
    console.log('Making request to:', url);
    console.log('Request body:', JSON.stringify(body, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(30000),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));

    // Get response text first for better error handling
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }

      console.error('Zoho API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });

      return NextResponse.json(
        {
          error: 'Failed to create organization',
          details: errorData,
          status: response.status,
          statusText: response.statusText,
        },
        { status: response.status }
      );
    }

    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error(
        'Failed to parse successful response as JSON:',
        responseText
      );
      return NextResponse.json(
        { error: 'Invalid response format from Zoho API' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error creating organization:', error);

    if (error.name === 'TimeoutError') {
      return NextResponse.json(
        { error: 'Request timeout - Zoho API took too long to respond' },
        { status: 408 }
      );
    }

    if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to create organization',
        message: error.message,
        type: error.name,
      },
      { status: 500 }
    );
  }
}
