/*
 * @Company: sudy
 * @Author: ty
 * @Date: 2019-11-11 13:43:34
 * @LastEditors: ty
 * @LastEditTime: 2020-05-12 18:05:34
 */


module.exports = function(api){
    // api.cache(true);
    const env = api.env();
    let presets = [
        "@babel/preset-react"
    ];
    const plugins = [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ],
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style":true}, "antd"],
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style":true}, "antd-mobile"]
    ];
    if (env === 'build_lib'){
        presets.push(
            "@babel/preset-env"
        );
    }else if(env === "production"){
        presets.push([
            "@babel/preset-env",
            {
                loose: true
            }
        ]);
        plugins.push(["transform-remove-console"])
    }
    

    return {
        presets,
        plugins
    };
}