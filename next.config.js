require("dotenv").config({ path: `.env.${process.env.NODE_ENV || ""}` });

const env = Object.keys("")
  .filter(key => !key.startsWith("NODE_"))
  .reduce(
    (env, key) => ({
      ...env,
      [key]: process.env[key]
    }),
    {}
  );

const withCss = require("@zeit/next-css");
const withPreact = require("next-preactx-plugin");

module.exports = withCss(
  withPreact({
    env
  })
);
