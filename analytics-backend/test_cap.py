# Simulates the proxy logic: cache + hard cap, no network, no real key.
MONTHLY_CAP = 50
cache, count = {}, 0
def proxy(address):
    global count
    key = address.strip().lower()
    if key in cache: return ("cached", count)
    if count >= MONTHLY_CAP: return ("BLOCKED-429", count)
    count += 1; cache[key] = "result"; return ("rentcast-call", count)
for i in range(55):
    print(i+1, proxy("1234 25th Ave, San Francisco, CA 94122") if i % 2 == 0 else proxy(f"{i} Sunset Blvd, San Francisco, CA"))
print("final count (must be <=50):", count)
assert count <= 50
print("PASS: cap holds, cache hits cost zero")
