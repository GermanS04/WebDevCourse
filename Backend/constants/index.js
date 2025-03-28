const api = require("./api.constants");
const files = require("./files.constants");
const env = require("./env.constants");

module.exports = {
  ...api,
  ...files,
  ...env,
};
