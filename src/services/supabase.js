import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jsueftowrqtwtohtuuwr.supabase.co";
//Safe to expose due to RLS Policy in Supabase
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdWVmdG93cnF0d3RvaHR1dXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMjU3ODAsImV4cCI6MjA0MTkwMTc4MH0.W2EiDyPBCe66-CTwtqL3wxGPZP1t9aMHU2FGcTPWk2c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
