import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, preferences } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided", errorType: "NO_IMAGE" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the prompt similar to Google AI Studio implementation
    const { color, type, opacity, mount } = preferences;
    const opacityDescription = opacity >= 75 ? 'blackout' : opacity >= 50 ? 'room darkening' : 'light filtering';
    
    const prompt = `
      Edit this image of a room. 
      Digitally install ${color} ${type} on the windows.
      Mount type: ${mount || 'inside mount'}.
      Fabric texture: High quality ${opacityDescription}.
      Maintain the original room perspective, lighting, and furniture exactly as they are. 
      Only change the window covering.
      Make it look photorealistic.
    `;

    console.log("Generating blinds visualization with prompt:", prompt);
    console.log("Preferences:", preferences);

    // Call Lovable AI Gateway with Nano banana model (gemini-2.5-flash-image-preview)
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt },
            { 
              type: "image_url", 
              image_url: { 
                url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
              } 
            }
          ]
        }],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later.", errorType: "RATE_LIMIT" }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your workspace.", errorType: "PAYMENT_REQUIRED" }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error", errorType: "GATEWAY_ERROR" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("AI response received");

    // Extract image from response
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (generatedImageUrl) {
      return new Response(
        JSON.stringify({ image: generatedImageUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If no image returned, diagnose the issue
    console.warn("No image in response, diagnosing issue...");
    const diagnosisResult = await diagnoseImageIssue(imageBase64, LOVABLE_API_KEY);
    
    return new Response(
      JSON.stringify({ 
        error: diagnosisResult.error, 
        errorType: diagnosisResult.errorType 
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-blinds-visualization:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error", 
        errorType: "UNKNOWN" 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function diagnoseImageIssue(
  imageBase64: string, 
  apiKey: string
): Promise<{ error: string; errorType: string }> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{
          role: "user",
          content: [
            { 
              type: "image_url", 
              image_url: { 
                url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
              } 
            },
            { 
              type: "text", 
              text: "Analyze this image for window blind visualization. Return JSON with field 'issue'. Values: 'NO_WINDOW' (if no window or window is completely obscured/too small), 'POOR_QUALITY' (if lighting is bad, too dark, blurry, or low resolution), 'NONE' (if ok)." 
            }
          ]
        }],
      }),
    });

    if (!response.ok) {
      return { error: "Poor lighting or unclear frame", errorType: "POOR_QUALITY" };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    try {
      const jsonMatch = content.match(/\{[^}]+\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.issue === 'NO_WINDOW') {
          return { error: "Couldn't find a window to show the recommendation", errorType: "NO_WINDOW" };
        }
      }
    } catch {
      // Parsing failed, default to poor quality
    }
    
    return { error: "Poor lighting or unclear frame", errorType: "POOR_QUALITY" };
  } catch (e) {
    console.error("Diagnosis failed:", e);
    return { error: "Poor lighting or unclear frame", errorType: "POOR_QUALITY" };
  }
}
