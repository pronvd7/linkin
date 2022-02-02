const pkg = require("./package.json");

module.exports = {
  env: {
    NEXT_PUBLIC_VERSION: pkg.version,
    NEXT_HOME_URL: "lth-easybook.herokuapp.com",
    CLOUD_NAME: "steadycoder",
    API_KEY : '857866142349132',
    API_SECRET: 'PX8fduDFdk5ihX5OTdi1CnwSg7k'
  },
};
