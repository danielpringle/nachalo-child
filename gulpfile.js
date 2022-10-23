// Initialize modules

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Lets define our paths
const paths = {
    rootPath: './',
    scssPath: 'src/sass',
    cssPath: 'css',
    srcPath: 'src',
    buildPath: './',
    imgSrcPath: 'src/images',
    imgBuildPath: 'images',
    jsSrcPath: 'src/js',
    jsBuildPath: 'js',
  };
  
  // Import all our Gulp-related packages that we will use
  
  // Sass/CSS processes
  const sass = require('gulp-sass')(require('sass'));
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const sourcemaps = require('gulp-sourcemaps');
  // Utilities
  const notify = require('gulp-notify');
  const plumber = require('gulp-plumber');
  const browserSync = require('browser-sync').create();

  /**
 * Error handling
 * https://www.npmjs.com/package/gulp-notify
 * @function
 */
function handleErrors(cb) {
    var args = Array.prototype.slice.call(arguments);
  
    notify
      .onError({
        title: 'Task Failed [<%= error.message %>',
        message: 'See console.',
        sound: 'Sosumi', // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
      })
      .apply(this, args);
  
    gutil.beep(); // Beep 'sosumi' again
  
    // Prevent the 'watch' task from stopping
    this.emit('end');
    cb();
  }

  /**
 * Compile Sass and run stylesheet through PostCSS.
 *
 * https://www.npmjs.com/package/gulp-sass
 * https://www.npmjs.com/package/gulp-postcss
 * https://www.npmjs.com/package/autoprefixer
 * https://www.npmjs.com/package/gulp-sourcemaps
 * https://www.npmjs.com/package/gulp-plumber
 */
function runPostCss(cb) {
    return (
      src(`${paths.scssPath}/style.scss`)
        // Deal with errors.
        .pipe(
          plumber({
            errorHandler: handleErrors,
          })
        )
        // Wrap tasks in a sourcemap
        .pipe(sourcemaps.init())
        // Compile Sass
        .pipe(
          sass({
            errLogToConsole: true,
            outputStyle: 'expanded', // Options: nested, expanded, compact, compressed
          })
        )
        // Parse with PostCSS plugins.
        .pipe(
          postcss([
            autoprefixer(), // browserslist key added to package.json
          ])
        )
        // create the sourcemap
        .pipe(sourcemaps.write())
        // Create style.css.
        .pipe(dest(paths.cssPath))
        //SASS + CSS Injecting
        .pipe(browserSync.stream())
    );
  
    cb();
  }

  exports.default = runPostCss;

