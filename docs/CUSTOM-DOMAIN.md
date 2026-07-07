# Custom domain: dispatches.fallenwyrms.com

Use this when you want a branded URL instead of the GitHub Pages default.

## Recommended DNS record

At your DNS provider for `fallenwyrms.com`, add:

| Type | Name | Value |
|------|------|-------|
| CNAME | `dispatches` | `fellowship-intel.github.io` |

Propagation can take a few minutes to 48 hours.

## GitHub Pages setup

1. In the repo: **Settings → Pages → Custom domain**
2. Enter: `dispatches.fallenwyrms.com`
3. Wait for DNS check; enable **Enforce HTTPS**

Alternatively, add a `CNAME` file to the repo root (GitHub creates this automatically when you save the domain in Settings):

```
dispatches.fallenwyrms.com
```

## After the domain is live

Update absolute URLs in `index.html` (Open Graph and canonical tags) from the GitHub Pages URL to:

```
https://dispatches.fallenwyrms.com/
```

Update `public/robots.txt` sitemap line to match.

Redeploy by pushing to `main`.

## Link from the main site

Add a play link on [fallenwyrms.com](https://fallenwyrms.com/) pointing to the dispatches URL, for example:

```html
<a href="https://dispatches.fallenwyrms.com/">Play Dispatches</a>
```

## Apex domain (fallenwyrms.com root)

GitHub Pages does not serve apex domains with a simple CNAME. Options:

- Use a subdomain (`dispatches.fallenwyrms.com`), recommended
- Host the apex on Cloudflare/Netlify with ALIAS/ANAME records
- Redirect apex to `www` or `dispatches` at your DNS provider
