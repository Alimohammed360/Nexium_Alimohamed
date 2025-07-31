export async function POST(req: Request) {
  
  console.log("📥 Request received in /api/tailor");
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  console.log("📦 N8N_WEBHOOK_URL:", webhookUrl); // server-side log

  try {
    // Parse incoming JSON
    const body = await req.json();
    console.log("📥 Incoming request body:", body);

    const { resume, jobDesc } = body;

    // Basic validation
    if (!resume || !jobDesc) {
      return new Response(
        JSON.stringify({ error: 'Missing resume or job description' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Ensure webhookUrl is defined
    if (!webhookUrl) {
      console.error("❌ N8N_WEBHOOK_URL is not defined.");
      return new Response(
        JSON.stringify({ error: 'N8N_WEBHOOK_URL is not set in environment variables' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send POST request to n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDesc }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ n8n webhook error:", errorText);
      return new Response(
        JSON.stringify({ error: 'n8n webhook call failed', details: errorText }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

         const result = await response.json();
     console.log("✅ Response from n8n:", result);

    // Extract tailored content
    let tailoredContent =
      result.tailoredResume ||
      result.data ||
      result.result ||
      result.output ||
      (typeof result === 'string' ? result : null);

    if (!tailoredContent) {
      console.error("❌ Could not find tailored content in n8n response. Keys:", Object.keys(result));
      return new Response(
        JSON.stringify({
          error: 'Invalid response format from AI service',
          debug: `Available keys: ${Object.keys(result).join(', ')}`
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Success
    return new Response(
      JSON.stringify({ tailoredResume: tailoredContent }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error("❌ Server error in /api/tailor:", error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message || 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
