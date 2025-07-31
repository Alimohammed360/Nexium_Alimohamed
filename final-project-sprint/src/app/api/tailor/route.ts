export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Incoming body:", body);

    const { resume, jobDesc } = body;

    if (!resume || !jobDesc) {
      console.error("❌ Missing resume or jobDesc");
      return new Response(JSON.stringify({ error: 'Missing resume or job description' }), { status: 400 });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    console.log("📦 N8N_WEBHOOK_URL:", webhookUrl);

    if (!webhookUrl) {
      console.error("❌ Server misconfiguration: missing N8N_WEBHOOK_URL");
      return new Response(JSON.stringify({ error: 'Server misconfiguration: missing N8N webhook URL' }), { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDesc }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Webhook response not OK:", errorText);
      return new Response(JSON.stringify({ error: 'n8n webhook call failed', detail: errorText }), { status: 500 });
    }

    const result = await response.json();
    console.log("✅ Webhook response:", result);

    return new Response(JSON.stringify({ tailoredResume: result }), { status: 200 });
  } catch (err: any) {
    console.error("🔥 Server crashed in /api/tailor:", err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error', detail: err.message }), { status: 500 });
  }
}
