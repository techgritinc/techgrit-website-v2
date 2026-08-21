/**
 * PM2 process definition for the TechGrit marketing site (Next.js).
 *
 * The app name MUST match APP_NAME in .github/workflows/deploy-site.yml. A mismatch
 * would start a second server against the same port while the old one still holds it.
 *
 * Modelled on techgrit-website-cms-v2/ecosystem.config.js, the working reference for
 * this VM, so both apps are operated the same way.
 *
 * DAEMON OWNERSHIP: this app runs under the `ubuntu` user's PM2 daemon, alongside
 * call-summary and kaffeax-sales. The CMS runs under root's separate daemon -- that
 * split is pre-existing and deliberate to leave alone here, but it means `pm2 list`
 * shows different apps depending on who you are. Deploy as `ubuntu`, always.
 *
 * PORT 3002 -- this box is crowded. Confirmed in use: 3000 by call-summary and 3001
 * by kaffeax-sales (both Next.js apps under the same ubuntu PM2 daemon), and 1337 by
 * the Strapi CMS under root. Verify before the first deploy:
 *   sudo ss -tlnp | grep 3002
 * If you move this port, change it here AND in the nginx proxy_pass together -- a mismatch
 * makes the health check fail in a way indistinguishable from a crash.
 *
 * Usage on the VM (from the app directory, as ubuntu):
 *   pm2 start ecosystem.config.js --env production
 *   pm2 restart techgrit-site --update-env
 *   pm2 save
 */
module.exports = {
  apps: [
    {
      name: 'techgrit-site',

      // Run the Next binary directly rather than `npm start`, so PM2 owns the Node
      // process itself instead of supervising an npm wrapper, which muddies signal
      // handling and restart accounting.
      script: './node_modules/.bin/next',
      args: 'start',

      // Relative to wherever PM2 is invoked from, so DEPLOY_PATH stays the single
      // place the location is configured.
      cwd: '.',

      instances: 1,
      // fork, not cluster: matches the other apps on this box, and `pm2 reload` only
      // delivers true zero-downtime in cluster mode anyway -- so the deploy uses
      // `restart` and accepts a 1-3s gap rather than pretending otherwise.
      exec_mode: 'fork',

      autorestart: true,
      watch: false,
      max_memory_restart: '768M',

      // Next boots in ~1-2s, far quicker than Strapi. 10s is enough to distinguish a
      // real start from a boot that fails late.
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 5000,
      kill_timeout: 5000,

      time: true,
      merge_logs: true,
      out_file: './logs/techgrit-site-out.log',
      error_file: './logs/techgrit-site-error.log',

      // HOSTNAME binds the server to loopback so it is reachable only through nginx.
      // Without it Next listens on 0.0.0.0 and the app is directly exposed on :3002,
      // bypassing the proxy, TLS, and any header handling.
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 3002,
      },

      env_production: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 3002,
      },
    },
  ],
};
