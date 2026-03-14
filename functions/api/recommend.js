// Cloudflare Pages Function: /api/recommend
// This runs on Cloudflare's edge, keeping the API key secret.
// The frontend calls POST /api/recommend and this proxies to Gemini.

export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // GEMINI_API_KEY is set in Cloudflare Pages > Settings > Environment variables
    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured. Add GEMINI_API_KEY in Cloudflare Pages settings." }),
        { status: 500, headers: corsHeaders }
      );
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Gemini API error (${geminiResponse.status})`, details: data }),
        { status: geminiResponse.status, headers: corsHeaders }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated. Please try again.";

    return new Response(JSON.stringify({ result: text }), {
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal error", message: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
