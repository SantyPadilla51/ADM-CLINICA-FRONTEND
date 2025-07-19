import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hzapzfyxfsvaabpvvgis.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YXB6Znl4ZnN2YWFicHZ2Z2lzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDc1NjU5NSwiZXhwIjoyMDYwMzMyNTk1fQ.atX6Q8w9SrA7GCe4cYd16jqkK2X-4OWEfqj4Ipi9o-Q"; // no uses la secreta aquí

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
