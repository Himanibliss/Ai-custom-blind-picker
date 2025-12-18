import { supabase } from "@/integrations/supabase/client";

interface BlindsPreferences {
  color: string;
  type: string;
  opacity: number;
  mount?: string;
}

interface GenerationResult {
  image: string | null;
  error?: string;
  errorType?: string;
}

export const generateBlindsVisualization = async (
  imageBase64: string,
  preferences: BlindsPreferences
): Promise<GenerationResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-blinds-visualization', {
      body: { 
        imageBase64,
        preferences 
      }
    });

    if (error) {
      console.error("Edge function error:", error);
      return { 
        image: null, 
        error: "Failed to generate visualization", 
        errorType: "FUNCTION_ERROR" 
      };
    }

    if (data.error) {
      return { 
        image: null, 
        error: data.error, 
        errorType: data.errorType || "UNKNOWN" 
      };
    }

    return { image: data.image };
  } catch (err) {
    console.error("Service error:", err);
    return { 
      image: null, 
      error: "Network error occurred", 
      errorType: "NETWORK_ERROR" 
    };
  }
};
