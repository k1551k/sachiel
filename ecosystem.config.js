module.exports = {
  apps: [
    {
      script: "src/index.js",
      node_args: "--env-file=.env.prod",
      name: "sachiel",
      max_memory_restart: "1G",
      autorestart: true,
      watch: false,
    },
  ],
};
