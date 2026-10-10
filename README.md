<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/7b732891-bff1-4952-bfc5-1dc91aa83738

## Run Locally

**Prerequisites:** Node.js 20.19+ (or 22.12+) and npm.


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set the credentials you need. `GEMINI_API_KEY` enables Gemini chat (a canned fallback reply is used without it); `RESEND_API_KEY` enables brochure email delivery. `APP_URL` is optional and is used to create brochure links.
3. Run the app:
   `npm run dev`

The development server is available at `http://localhost:3000`. Run `npm run lint` for a TypeScript check and `npm run build` to create a production frontend bundle. To serve that bundle, set `NODE_ENV=production` and run `npm start`.
