module.exports = {
  apps: [
    {
      script: "src/index.js",
      node_args: "--env-file=.env.prod",
      name: "sachiel",
      // instances: 2,
      // exec_mode: "cluster",
      // max_memory_restart: "1G",
      autorestart: true,
      watch: false,
    },
  ],
};
