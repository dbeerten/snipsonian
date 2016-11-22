/* global System */

System.config({
    baseURL: './',
    defaultJSExtensions: true,
    transpiler: 'plugin-babel',

    meta: {
        '*.js': {
            babelOptions: {
                // disable ES2015 feature transpilation for local development (chrome supports it already)
                es2015: false
            }
        },
        'node_modules/babel-polyfill/dist/polyfill.js': {
            format: 'global'
        }
    },

    map: {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        vue: 'node_modules/vue/dist/vue.js',
        'vue-router': 'node_modules/vue-router/dist/vue-router.js',
        'highlight.js': 'node_modules/highlight.js/lib/index.js',
        'js-beautify': 'node_modules/js-beautify/js/index.js',
        'query-string': 'node_modules/query-string/index.js',
        // deps of query-string
        'strict-uri-encode': 'node_modules/strict-uri-encode/index.js',
        'object-assign': 'node_modules/object-assign/index.js',
        // local package
        'doc-package': 'src/_doc'
    }
});