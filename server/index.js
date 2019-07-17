require("babel-core/register")(
  {
    presets: ['es2015','stage-0','stage-1','stage-2','stage-3'],
    plugins: [
      "transform-runtime",
    ]
  }
);

require("babel-polyfill");
// index.js是项目的入口文件
const test = require("./test.js");

test.default();