module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    
    devServer: {
        proxy: {
            '/api': {
                target: 'http://178.154.199.253/dsks-cmw', //'http://dskscmw-dev.web.local/dsks-cmw', //'http://localhost:8080/(APPLICATION_CONTEXT - если есть)'
                ws: true,
                changeOrigin: true
            }
        }
    },

    /*configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map';

            config.output.devtoolModuleFilenameTemplate = info => info.resourcePath.match(/^\.\/\S*?\.vue$/)
                ? `webpack-generated:///${info.resourcePath}?${info.hash}`
                : `webpack-yourCode:///${info.resourcePath}`;

            config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]';
        }
    },*/
}
