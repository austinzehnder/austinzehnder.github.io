// RentCast proxy with a HARD monthly cap. Deployed as a Supabase Edge Function.
// The RentCast API key lives ONLY in Edge Function secrets (RENTCAST_API_KEY).
// It is NEVER sent to the browser, NEVER committed to git, NEVER in analytics.html.
// Rules:
//  - 1 RentCast call per unique address per month, max (cache first)
//  - Hard stop at 50 calls/month (Developer plan free tier). Call 51+ returns 429, no RentCast call made.
//  - Only the /avm/value endpoint is used (value + comps in one call). No separate property/listings calls.
//  - Only paid full-report orders should call this in production; the free brief estimate on the site stays details-based.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MONTHLY_CAP = 50;
const RENTCAST_KEY = Deno.env.get("RENTCAST_API_KEY")!;
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

function monthKey(d = new Date()) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}
function normAddress(a: string) {
  return a.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("POST only", { status: 405 });
  const { address } = await req.json().catch(() => ({}));
  if (!address || typeof address !== "string") return new Response(JSON.stringify({ error: "address required" }), { status: 400, headers: { "Content-Type": "application/json" } });
  const key = normAddress(address);
  const month = monthKey();

  // 1. Cache first: repeat lookups cost zero RentCast calls.
  const { data: cached } = await supabase.from("rentcast_cache").select("result").eq("address_key", key).single();
  if (cached) return new Response(JSON.stringify({ cached: true, result: cached.result }), { headers: { "Content-Type": "application/json" } });

  // 2. Atomic-ish counter check: read current month count, refuse before calling RentCast.
  const { data: usage } = await supabase.from("rentcast_usage").select("call_count").eq("month", month).single();
  const count = usage?.call_count ?? 0;
  if (count >= MONTHLY_CAP) {
    return new Response(JSON.stringify({ error: "Monthly RentCast cap reached (50). No call made. Try again next month, or upgrade the plan deliberately." }), { status: 429, headers: { "Content-Type": "application/json" } });
  }

  // 3. Only now call RentCast, one call, AVM + comps together.
  const url = `https://api.rentcast.io/v1/avm/value?address=${encodeURIComponent(address)}&compCount=5`;
  const res = await fetch(url, { headers: { "X-Api-Key": RENTCAST_KEY, Accept: "application/json" } });
  if (!res.ok) return new Response(JSON.stringify({ error: `RentCast ${res.status}` }), { status: 502, headers: { "Content-Type": "application/json" } });
  const result = await res.json();

  // 4. Record the call and cache the result, so a retry cannot double-spend.
  await supabase.from("rentcast_usage").upsert({ month, call_count: count + 1 });
  await supabase.from("rentcast_cache").insert({ address_key: key, address, result, month });
  return new Response(JSON.stringify({ cached: false, result, calls_used: count + 1, cap: MONTHLY_CAP }), { headers: { "Content-Type": "application/json" } });
});
