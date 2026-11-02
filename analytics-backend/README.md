# Austin Zehnder Analytics — backend cap (RentCast)

Status: code built, NOT deployed, NOT activated.
RentCast is signed in (austinzehnder@gmail.com) but plan is "Not Subscribed".
Do NOT activate the Developer plan or create an API key until Austin adds his card.

## Why this exists
RentCast has no hard usage cap of its own. It emails at 85% and 100%,
then charges $0.20 per call past 50. This proxy is the cap:
- Cache first: repeat address = 0 calls
- Hard stop at 50 calls/month: call 51 returns 429, RentCast is never called
- One call per property: /avm/value only (value + comps together)
- Key lives only in Edge Function secrets, never in the browser or git

## Deploy (after card is added, in this order)
1. In Supabase (project whats-cookin, or a new analytics project):
   run supabase/migrations/20261101_rentcast_cap.sql
2. Deploy the function: supabase functions deploy rentcast-proxy
3. Set the secret: supabase secrets set RENTCAST_API_KEY=<key from RentCast dashboard>
   Never paste the key into analytics.html, a repo file, or chat.
4. Activate RentCast Developer plan ($0, 50 calls/mo), create the API key,
   then test ONE Sunset SFR address through the proxy, not directly.
5. In analytics.html, point paid full-report orders at the proxy URL.
   Free brief estimates stay details-based and never call the proxy.

## Kill switch
Delete / rotate the RentCast API key in the RentCast dashboard,
or set the function to return 429. Either stops all spend immediately.
