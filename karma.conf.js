

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'tests.webpack.js',
      { pattern: 'test/images/*.jpg', watched: false, included: false, served: true, nocache: false },
      { pattern: 'test/images/*.png', watched: false, included: false, served: true, nocache: false }
    ],

    proxies: {
      '/img/': '/base/test/images/'
    },

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],
    mochaReporter: {
      output: 'autowatch',
      showDiff: true
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default,
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    client: {
      captureConsole: true,
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        //reporter: ['progress', 'verbose'],

        // require specific files after Mocha is initialized
        require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],

        // custom ui, defined in required file above
        ui: 'bdd-lazy-var/global',
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [/*'Firefox',*/ 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    //singleRun: true,
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
