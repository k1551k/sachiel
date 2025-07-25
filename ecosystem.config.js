module.exports = {
  apps: [
    {
      script: "src/index.js",
      node_args: "--env-file=.env.prod",
      name: "sachiel",
    },
  ],
};
