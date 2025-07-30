export async function POST(req: Request) {
  try {
    // Parse JSON body from request
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

    // Send POST request to n8n webhook
    const response = await fetch('https://farhanlakha-122.app.n8n.cloud/webhook/resume-tailor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDesc }),
    });

    if (!response.ok) {
      console.error("❌ n8n webhook error:", await response.text());
      return new Response(
        JSON.stringify({ error: 'n8n webhook call failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

         const result = await response.json();
     console.log("✅ Response from n8n:", result);

     // Check if the response contains the original resume data (which means n8n didn't process it)
     if (result.resume && result.resume.name) {
       console.error("❌ n8n returned original resume data instead of tailored version");
       return new Response(
         JSON.stringify({
           error: 'The AI service returned the original resume instead of a tailored version. Please check the n8n workflow configuration.',
           debug: 'n8n returned input data instead of processed output'
         }),
         { status: 500, headers: { 'Content-Type': 'application/json' } }
       );
     }

     // Try to extract the tailored content from various possible response structures
     let tailoredContent = null;
     
     if (result.tailoredResume) {
       tailoredContent = result.tailoredResume;
     } else if (result.data) {
       tailoredContent = result.data;
     } else if (result.result) {
       tailoredContent = result.result;
     } else if (result.output) {
       tailoredContent = result.output;
     } else if (typeof result === 'string') {
       tailoredContent = result;
     } else {
       console.error("❌ Could not find tailored content in response. Available keys:", Object.keys(result));
       return new Response(
         JSON.stringify({
           error: 'Invalid response format from AI service',
           debug: `Available keys: ${Object.keys(result).join(', ')}`
         }),
         { status: 500, headers: { 'Content-Type': 'application/json' } }
       );
     }

     // Return tailored resume from n8n
     return new Response(
       JSON.stringify({
         tailoredResume: tailoredContent,
       }),
       { status: 200, headers: { 'Content-Type': 'application/json' } }
     );
  } catch (error: any) {
    console.error("❌ Server error in /api/tailor:", error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
