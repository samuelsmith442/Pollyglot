import OpenAI from 'openai';

// CORS headers configuration
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS request for CORS
async function handleOptions(request) {
    return new Response(null, {
        headers: corsHeaders
    });
}

// Initialize OpenAI client
function initOpenAI(apiKey) {
    return new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.openai.com/v1'
    });
}

// Main request handler
async function handleRequest(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
        return handleOptions(request);
    }

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { text, language } = await request.json();
        
        if (!text || !language) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: text and language' }), 
                { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                }
            );
        }

        const openai = initOpenAI(env.OPENAI_API_KEY);
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'system',
                    content: 'You are PollyGlot, an intelligent language translation assistant. Provide the translation text only, no extra words or explanations.'
                },
                {
                    role: 'user',
                    content: `Translate "${text}" from English to ${language}`
                }
            ],
            temperature: 0.2,
            max_tokens: 256
        });

        const translation = completion.choices[0].message.content.trim();

        return new Response(
            JSON.stringify({ translation }), 
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            }
        );
    } catch (error) {
        console.error('Request handling error:', error);
        return new Response(
            JSON.stringify({ error: error.message }), 
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            }
        );
    }
}

// Export for Cloudflare Workers
export default {
    fetch(request, env, ctx) {
        return handleRequest(request, env);
    }
};
