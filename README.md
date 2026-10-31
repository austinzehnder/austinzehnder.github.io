# austinzehnder.com — GitHub Pages site

Personal site for Austin Zehnder, San Francisco finance & real estate professional, founder of Zehndra.

## Files
- `index.html` — homepage: bio, work history, writing, Zehndra, social links, Person schema
- `writing/how-to-underwrite-a-rental-deal.html` — first full article
- `sitemap.xml`, `robots.txt` — SEO
- `CNAME` — custom domain: austinzehnder.com

## Deploy to GitHub Pages (to be done once GitHub login is connected)
1. Create a public repo on GitHub and push these files to its main branch.
   - For a user site, the repo is usually `<github-username>.github.io`.
2. In repo Settings → Pages, set Source to Deploy from a branch, Branch main, folder / (root).
3. In Settings → Pages → Custom domain, enter `austinzehnder.com` and enable Enforce HTTPS once DNS resolves.
4. In Dynadot DNS for austinzehnder.com:
   - Apex (@): A records to GitHub Pages IPs (check GitHub's current docs at deploy time; historically 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
   - www: CNAME to `<github-username>.github.io`
   - Remove / replace the Dynadot Parking records.
5. Wait for DNS propagation (usually minutes to a few hours), then verify https://austinzehnder.com/ loads and HTTPS is enforced.

## Notes
- No phone number, home address, or personal email is published on the site on purpose.
- Do not publish until Austin approves the homepage wording.
