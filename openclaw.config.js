// openclaw.config.js
// Basic configuration for running this project with OpenClaw's Tailscale gateway.

module.exports = {
  // choose the gateway; "tailscale" will open a Tailscale network for the local ports
  gateway: "tailscale",

  // ports that should be exposed through the gateway
  ports: [3000],

  // directory to serve when running in production/build mode
  staticDir: "dist",

  // command to launch the development server; this example simply invokes the
  // existing npm script. OpenClaw will keep it alive and tunnel the port.
  devCommand: "npm run dev",
};
