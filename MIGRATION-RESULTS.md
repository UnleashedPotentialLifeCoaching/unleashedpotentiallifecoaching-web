# Migration results: Prismic + server rendering → Contentful + static generation

Before: commit `85ff22c` (2022-03-29), documented in [BASELINE.md](BASELINE.md)
After: commit `4dbc2a0` (2025-07-01), the commit that is live in production (its `_app` chunk hash matches the live site)
After fixes: `4dbc2a0` plus the follow-up fixes (hero image through `next/image`, AVIF enabled, email check fixed), measured 2026-10-09
Recorded: 2026-10-09

## Summary

The migration ran from June 2022 to October 2023. It moved the CMS from Prismic to Contentful (PR #3), and in October 2023 it switched every content page from rendering on each request to rendering once at build time (PR #17). Those changes did what they were meant to do: the server answers 30–45× faster, text appears about twice as fast, and the site no longer depends on the CMS being up when a visitor arrives.

Along the way the home page hero became a raw 3.6 MB phone photo, which hid those gains in Lighthouse's headline score. The follow-up fix serves it through `next/image` as a resized AVIF (3,622 KiB → 162 KiB). With that in place, the page weighs 749 KiB, down from 4,322, LCP is 5.3 s, down from 23.2, and Lighthouse Performance is 80, up from 75 on the live site and 73 on the old one.

## Before and after

Home page, Lighthouse 12.8.2, mobile, simulated throttling, 3 runs each against `next start` on the same machine. Medians.

| Metric                                     | Before (Prismic, SSR)              | After migration (live)                       | After fixes                           |
| ------------------------------------------ | ---------------------------------- | -------------------------------------------- | ------------------------------------- |
| Routes rendered on every request           | 7 of 10                            | 1 of 14 (`/sitemap.xml`, plus the email API) | Same                                  |
| Server response, median of 5 pages (local) | 58–92 ms                           | 2 ms                                         | 2 ms                                  |
| Production cache                           | `no-store`, `x-vercel-cache: MISS` | `x-vercel-cache: HIT`                        | Same                                  |
| First Contentful Paint                     | 2.8 s                              | 1.5 s                                        | 1.5 s (−46% vs before)                |
| Speed Index                                | 5.4 s                              | 1.8 s                                        | 1.7 s (−69% vs before)                |
| Largest Contentful Paint                   | 4.8 s                              | 23.2 s                                       | 5.3 s (−77% vs live)                  |
| Total Blocking Time                        | 0 ms                               | 30 ms                                        | 40 ms                                 |
| Cumulative Layout Shift                    | 0                                  | 0.008                                        | 0.008                                 |
| Total transfer                             | 578 KiB, 28 requests               | 4,322 KiB, 48 requests                       | 749 KiB, 49 requests (−83% vs live)   |
| Hero image                                 | 301 KiB AVIF (Prismic CDN)         | 3,622 KiB JPEG (raw)                         | 162 KiB AVIF (−96% vs live)           |
| JavaScript transferred                     | 159 KiB                            | 245 KiB                                      | 246 KiB                               |
| Lighthouse Performance                     | 73                                 | 75                                           | 80                                    |
| Lighthouse Accessibility                   | 96                                 | 92                                           | 92                                    |
| Lighthouse Best Practices                  | 100                                | 96                                           | 96                                    |
| Lighthouse SEO                             | 100                                | 100                                          | 100                                   |
| Site renders when the CMS request fails    | No (every page returns 500)        | Yes (prebuilt HTML)                          | Yes                                   |
| Routes                                     | 10                                 | 14                                           | 14                                    |
| `next build`                               | 7.7 s                              | 16.7 s (prerenders 22 pages)                 | Passes (`HEAD` before the fix failed) |
| Next.js / React / TypeScript               | 12 (unpinned `latest`) / 17 / 4.5  | 14.2 / 18 / 5                                | Same                                  |
| Node version declared                      | None                               | `>=18.18.0`                                  | Same                                  |
| `yarn audit`, runtime deps (today)         | 37 (5 critical)                    | 150 (3 critical)                             | Same                                  |

## What improved

**Pages are built once instead of on every visit.** Before, 7 of 10 routes called Prismic on every request and sent `no-store` cache headers. Vercel's response header showed `x-vercel-cache: MISS` on every 2022 capture in the Wayback Machine. Now 12 of 14 routes are prerendered at build time: 22 HTML pages, including 5 blog posts, 3 service pages and the coach page. Production returns `x-vercel-cache: HIT`, and Lighthouse measured the live root document at 40–50 ms.

**Visitors see content sooner.** Because the HTML arrives immediately, First Contentful Paint dropped from 2.8 s to 1.5 s and Speed Index from 5.4 s to 1.8 s. This is what a visitor notices first: the header, the headline and the layout.

**The site stays up when the CMS doesn't respond.** In the old architecture, one failed CMS request took the page down. This happened during testing: as committed, every Prismic-backed page now returns 500. The current site only talks to Contentful at build time. If Contentful has an outage, the live site keeps serving the last build.

**More content, same codebase.** 10 routes became 14. The blog (`/blog`, `/post/[slug]`), interviews, per-service pages (`/service/[slug]`) and website support were added. The sitemap now includes blog posts.

**A maintained stack.** Next 12 became Next 14.2 and React 17 became React 18. The old package.json pinned `next` to `latest`, so any fresh install could pull a new major version. Contentful types are generated (`yarn codegen` → `types/contentful.d.ts`) instead of hand-written. Forms gained validation (Formik + Yup), toast feedback and explicit SendGrid error handling. Google Analytics was added (Jul 2024).

## What got worse

**The home page hero image (fixed).** The LCP element was the same in both versions: the banner div with a CSS `background-image`. Before, Prismic's image CDN compressed it automatically (`auto=compress,format`) and served a 301 KiB AVIF. After the migration the banner was a 3024×4032 JPEG served straight from Contentful at 3,622 KiB, 84% of the page's bytes. That is why live LCP is 23.2 s.

Fix: `HomeBanner` and `PageBanner` now render the image with `next/image` (`fill`, `priority`, `sizes="100vw"`), and `next.config.js` enables AVIF. Next.js now preloads the hero, picks a width from `srcset`, and serves a 162 KiB AVIF on mobile. The page looks the same: Lighthouse's final screenshots before and after match.

What remains of LCP (5.3 s) is almost all render delay (4.8 s), not loading. The image arrives immediately, but `FadeInContainer` server-renders the whole home page at `opacity: 0` and fades it in over 1.2 s after JavaScript hydrates. The old site had the same wrapper.

**More JavaScript.** Shared First Load JS went from 86.9 kB to 134 kB, mostly from Next 14's larger runtime and the `_app` chunk (16 → 44 kB). Home page JavaScript is up 54%. That cost is not yet showing up as blocking time (TBT 30 ms).

**Small accessibility and console regressions.** Accessibility fell from 96 to 92 and Best Practices from 100 to 96. Lighthouse flags low text contrast on the banner (in both versions), a `<ul class="flex mt-4">` with non-`<li>` children, and React hydration errors #418, #423 and #425 (server and client HTML disagree) in the console.

**Dependency audit.** Both lockfiles were audited today against the same advisory database. The current one has more findings: 150 runtime vs 37. Most come from packages the code never imports. 12 runtime dependencies are unused, including `contentful-import`, which pulls in the 12 high-severity `axios` advisories. Another 12 advisories (2 critical, 10 high) are against the installed `next` 14.2.30 itself.

## Live production check

https://www.unleashedpotentiallifecoaching.com/ (and https://www.jessrebelo.com/, which serves the same build), Oct 9 2026, same Lighthouse settings, 3 runs:

| Category       | Median |
| -------------- | ------ |
| Performance    | 74     |
| Accessibility  | 92     |
| Best Practices | 96     |
| SEO            | 100    |

FCP 1.8 s, LCP 23.3 s, TBT 0 ms, CLS 0, 4,298 KiB across 48 requests. These match the local measurement of the same commit.

## Methodology

- Both versions were built from git in scratch worktrees with `yarn install --frozen-lockfile` and served with `next start`. So the comparison is between production builds of the code, not between two live sites five years apart.
- The old version reads from the original Prismic repository, which is still public. It needed two local-only patches to run today: encoding the GraphQL query in the URL, and leaving out the `Authorization` header when no token is set. See [BASELINE.md](BASELINE.md).
- Images are fetched from each CMS's real CDN, so the hero image comparison reflects what each CMS actually serves.
- Server response time is time to first byte with `curl`, 20 requests per page, on localhost. That isolates rendering cost from network distance.
- Lighthouse runs through the Wayback Machine were discarded: timings served through the archive measure the archive.
- `HEAD` (`4835081`) was not measured because it did not build. The "After fixes" column includes the fix for that.
- "After fixes" was measured on a fresh build with the image cache warmed by one request. The first run after a cold start (when Next.js encodes the AVIF) was slower (LCP 5.7 s, Performance 67) and is excluded from the median.
- Raw Lighthouse JSON and build logs were kept out of the repo.

## Backlog

Ordered by impact. Hero image and the broken build are done. The rest is not.

**Performance**

- ~~Hero image~~: done. Served through `next/image` as AVIF, 3,622 → 162 KiB.
- LCP render delay: `layouts/FadeInContainer.tsx` starts the home page at `opacity: 0`, so nothing counts as painted until hydration plus the 1.2 s fade. Rendering the banner outside the fade (or starting at `opacity: 1`) should take most of the remaining 4.8 s off LCP. This changes how the page appears, so it's a design call.
- Remove the 12 unused runtime dependencies: `@apollo/client`, `@hookform/resolvers`, `@vercel/kv`, `contentful-import`, `embla-carousel-react`, `fauna`, `graphql`, `graphql-request`, `next-cloudinary`, `react-hook-form`, `react-query` (v3, duplicated by `@tanstack/react-query`), `react-share`. Re-run `yarn audit`.
- Render-blocking resources: Lighthouse estimates 560–710 ms of savings (the Google Fonts stylesheet). `next/font` would self-host the fonts.
- Pages have no `revalidate`, so content edits in Contentful only go live after a redeploy. Add ISR (`revalidate`) or a Contentful webhook that triggers a deploy.

**Correctness**

- ~~`HEAD` fails `next build`~~: done. `contexts/EmailsContext.tsx` checked `request?.status === 200`, but `sendClientEmail` returns `{ success, data }`. Besides breaking the build, it would have shown the error message for every successful form submission. It now checks `request.success`.
- Fix the React hydration mismatch (#418/#423/#425) and the `<ul>` markup on the home page.
- Banner text contrast (`text-cream` over the photo): add an overlay or a text shadow.

**Security**

- The Contentful token is exposed in the browser through `NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN`. If it is a management token rather than a read-only delivery token, rotate it and move fetching to build time only. The old site had the same pattern with `NEXT_PUBLIC_YT_API_KEY`.
- Remove `FAUNA_SECRET` from `.env` and revoke it. Fauna was removed from the code in July 2025.
- Upgrade within Next 14 (or move to 15) to clear the remaining `next` advisories.

**Documentation**

- README: add setup steps, the required environment variables and the Node version. Fix the stack list (Formik + Yup, no Prismic).
