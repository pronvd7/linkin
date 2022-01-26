const pkg = require("./package.json");

module.exports = {
  env: {
    NEXT_PUBLIC_VERSION: pkg.version,
    NEXT_HOME_URL: "lth-easybook.herokuapp.com",
  },
};
