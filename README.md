# RasterBros — Next.js (CSR)

This folder contains a Next.js version of the original Vite React website, configured to run in CSR mode (SPA behavior preserved).

Key files:
- `pages/[[...slug]].tsx`: catch-all route so every path loads the SPA
- `src/NextApp.tsx`: providers previously wired in Vite `main.tsx`
- `pages/_app.tsx`: imports global Tailwind CSS

## Careers Form -> Google Sheet setup

`CareersApplicationModal` now supports a dedicated Google Apps Script endpoint through:

- `NEXT_PUBLIC_CAREERS_GOOGLE_SCRIPT_URL`

Add this in `.env.local`:

```bash
NEXT_PUBLIC_CAREERS_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec"
```

Then restart the dev server.

Payload keys sent by careers form:
- `formType`
- `appliedRole`
- `fullName`
- `age`
- `phone`
- `email`
- `designation`
- `experience`
- `interestedIn`
- `tools`
- `portfolioLink`
- `instagramProfile`
- `city`
- `currentLpa`
- `whyRasterBros`
- `submittedAt`
