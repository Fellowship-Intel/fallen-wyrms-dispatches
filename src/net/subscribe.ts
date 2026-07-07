import { getSupabase } from "./supabase";

export type SubscribeResult = "success" | "duplicate" | "offline" | "error";

export async function subscribeEmail(
  email: string,
  honeypot: string,
  source = "dispatches-end-cta"
): Promise<SubscribeResult> {
  if (honeypot.trim()) return "success";
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "error";

  const sb = getSupabase();
  if (!sb) return "offline";

  const { error } = await sb.from("subscribers").insert({ email: trimmed, source });
  if (!error) return "success";
  if (error.code === "23505") return "duplicate";
  return "error";
}
