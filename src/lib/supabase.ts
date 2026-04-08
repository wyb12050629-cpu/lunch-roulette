import { createClient, SupabaseClient, RealtimeChannel } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export async function getVotes(restaurantId: string) {
  if (!supabase) return { up_count: 0, down_count: 0 };

  const { data } = await supabase
    .from("votes")
    .select("up_count, down_count")
    .eq("restaurant_id", restaurantId)
    .single();

  return data ?? { up_count: 0, down_count: 0 };
}

export async function vote(restaurantId: string, type: "up" | "down") {
  if (!supabase) return null;

  const column = type === "up" ? "up_count" : "down_count";

  const { data: existing } = await supabase
    .from("votes")
    .select("up_count, down_count")
    .eq("restaurant_id", restaurantId)
    .single();

  if (existing) {
    const { data } = await supabase
      .from("votes")
      .update({ [column]: existing[column] + 1 })
      .eq("restaurant_id", restaurantId)
      .select("up_count, down_count")
      .single();
    return data;
  } else {
    const { data } = await supabase
      .from("votes")
      .insert({
        restaurant_id: restaurantId,
        up_count: type === "up" ? 1 : 0,
        down_count: type === "down" ? 1 : 0,
      })
      .select("up_count, down_count")
      .single();
    return data;
  }
}

export function subscribeVotes(
  restaurantId: string,
  onUpdate: (votes: { up_count: number; down_count: number }) => void
): RealtimeChannel | null {
  if (!supabase) return null;

  const channel = supabase
    .channel(`votes:${restaurantId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "votes",
        filter: `restaurant_id=eq.${restaurantId}`,
      },
      (payload) => {
        const row = payload.new as { up_count: number; down_count: number } | undefined;
        if (row) {
          onUpdate({ up_count: row.up_count, down_count: row.down_count });
        }
      }
    )
    .subscribe();

  return channel;
}
