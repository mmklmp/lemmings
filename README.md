<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a2f17a55-fe8f-40f8-a2fe-5364481c090b

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

### Using OpenClaw (Tailscale gateway)

If you'd like to expose the development server over a Tailscale network or
otherwise run it through OpenClaw's gateway, install OpenClaw and use the
helper scripts added to `package.json`.

```sh
# install the CLI (or add as a dev dependency)
npm install --save-dev openclaw

# development mode through the gateway
npm run openclaw:dev

# build and then serve the static output
npm run build
npm run openclaw:serve
```

The configuration in `openclaw.config.js` sets up a simple Tailscale tunnel on
port 3000; adjust ports or static directory as needed.  You can also run the
commands manually if you prefer:

```sh
npx openclaw dev --gateway tailscale -- npm run dev
npx openclaw serve dist --gateway tailscale
```
