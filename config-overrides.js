const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const themeConfig = require("./theme"); // 自定义主题

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            modifyVars: themeConfig,
            javascriptEnabled: true, 
          }
    }),
);

// const themeConfig = require("./theme"); // 自定义主题
// module.exports = {
//     lessConfig: themeConfig // less配置
// }