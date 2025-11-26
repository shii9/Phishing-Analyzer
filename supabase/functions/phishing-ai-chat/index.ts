import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert cybersecurity assistant specializing in phishing detection and email security. 

Your expertise includes:
- Identifying phishing indicators (urgency tactics, suspicious URLs, brand impersonation)
- Explaining email authentication protocols (SPF, DKIM, DMARC)
- Analyzing malicious URLs and domains
- Educating users about social engineering tactics
- Providing actionable security recommendations

Guidelines:
- Keep responses clear, concise, and educational
- Use examples when explaining concepts
- Provide step-by-step guidance for checking suspicious emails
- Emphasize security best practices
- Never click suspicious links, always verify sender addresses
- Explain technical terms in simple language
- Be encouraging and supportive - cybersecurity can be complex

Common phishing indicators to discuss:
- Urgency and pressure tactics ("Act now!", "Account suspended!")
- Generic greetings ("Dear customer")
- Requests for sensitive information (passwords, SSNs, credit cards)
- Suspicious URLs (IP addresses, misspelled domains, URL shorteners)
- Poor grammar and spelling
- Unexpected attachments
- Mismatched sender addresses
- Too-good-to-be-true offers (prizes, inheritances)`;

    console.log("Sending request to Lovable AI Gateway");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "Rate limit exceeded. Please try again in a moment." 
          }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "Payment required. Please add credits to your Lovable AI workspace." 
          }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("Lovable AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service unavailable" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Successfully connected to Lovable AI Gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
