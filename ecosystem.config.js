/**
 * PM2 process definition for the TechGrit marketing site.
 *
 * `name` must match APP_NAME in .github/workflows/deploy-site.yml.
 * Runs in root's PM2 daemon, alongside techgrit-cms. (call-summary and kaffeax-sales
 * live in ubuntu's separate daemon, so `pm2 list` differs by user.)
 *
 * PORT 3002 must match the nginx proxy_pass. 3000 and 3001 are taken by
 * call-summary and kaffeax-sales, 1337 by the CMS.
 */
module.exports = {
  apps: [
    {
      name: 'techgrit-site',
      script: './node_modules/.bin/next',
      args: 'start',
      cwd: '.',

      instances: 1,
      exec_mode: 'fork',

      autorestart: true,
      watch: false,
      max_memory_restart: '768M',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 5000,
      kill_timeout: 5000,

      time: true,
      merge_logs: true,
      out_file: './logs/techgrit-site-out.log',
      error_file: './logs/techgrit-site-error.log',

      // HOSTNAME binds to loopback so the app is reachable only through nginx.
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
