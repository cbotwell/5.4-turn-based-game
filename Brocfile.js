var concat = require('broccoli-sourcemap-concat');
var mergeTrees = require('broccoli-merge-trees');
var sass = require('broccoli-sass');
var handlebars = require('broccoli-handlebars-precompiler');

var bowerStuff = concat('bower_components', {outputFile: 'vendor.js', inputFiles: [
    'jquery/dist/jquery.min.js',
    'handlebars/handlebars.runtime.min.js',
    'underscore/underscore-min.js',
    'backbone/backbone-min.js'
  ]});

var templatesAndScripts = handlebars('assets', {
  srcDir: 'templates',
  namespace: 'AppTemplates'
});

var appJs = concat(templatesAndScripts, {outputFile: 'app.js', inputFiles: [
    'js/setup.js',
    'templates/**/*.js',
    'js/character.js',
    'js/cagematch.js'
  ]});

var includePaths = [
    'assets/scss',
    'bower_components/reset-css',
    'bower_components/bourbon/app/assets/stylesheets',
    'bower_components/fontawesome/scss',
    'bower_components/neat/app/assets/stylesheets'
];

var compiledSass = sass(includePaths, 'cagematch.scss', 'app.css');

module.exports = mergeTrees(['public', appJs, compiledSass, bowerStuff]);
