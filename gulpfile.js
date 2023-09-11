//import plugin from 'gulp-uglify-es';


const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite =  require('gulp-svg-sprite');
//Изображения
const image = require('gulp-image');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
//babel
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
//Добавление плагина для того, чтоб браузер показывал ошибки  в исходниках
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
//npm install --save-dev gulp-uglify-es gulp-notify gulp-babel @babel/preset-env babel-loader. Сделать код нечитаемым  и меньшим по весу (абфусцировать) + плагин для выведения ошибок
//Шрифты
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
//include
const fileinclude = require('gulp-file-include');
const gulp = require ('gulp');
const ghPages = require('gulp-gh-pages');

const paths ={
  scripts: {
    src: './',
    dest: './dist',
  }
}

async function distHtml() {
  gulpif.src(['*.html'])
  .pipe(gulp.dest(paths.scripts.dest));
}
exports.default = async function() {
  distHtml();
}
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
  .pipe(ghPages());
})

let isProd = false; //default = dev

const clean = () => {
  return del(['dist'])
};

const fonts = () => {
  return src('src/resources/fonts/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('src/resources/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.stream())
}

const resources = () => {
  return src('src/resources/**')
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const styles = () => {
    return src(['src/scss/**/*.scss'])
      .pipe(gulpif(!isProd, sourcemaps.init()))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat('main.css'))

      .pipe(autoprefixes({
        cascade: false
      }))
      .pipe(gulpif(isProd, cleanCSS({
        level: 2
      })))
      .pipe(gulpif(!isProd, sourcemaps.write('.')))
      .pipe(dest('dist/style'))
      .pipe(browserSync.stream())
};
const copyingPluginsCss = () => {
  return src('src/libraries/**/*.css')
  .pipe(gulpif(!isProd, sourcemaps.init()))

  .pipe(dest('dist/css/plugins'))
  .pipe(browserSync.stream())
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img'))
};

const scripts = () => {
  return src ([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])

    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))

    .pipe(concat('app.js'))
    .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream())
};
const CatalogScripts = () => {
  return src ([
    'src/js/components/catalog/*.js'
  ])

  .pipe(gulpif(!isProd, sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('js/catalog'))
  .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
  .pipe(gulpif(!isProd, sourcemaps.write('.')))
  .pipe(dest('./dist'))
  .pipe(browserSync.stream())
};

const productScript = () => {
  return src (['src/js/components/product/*.js'])
  .pipe(gulpif(!isProd, sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))

  .pipe(concat('js/product'))
  .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
  .pipe(gulpif(!isProd, sourcemaps.write('.')))
  .pipe(dest('./dist'))
  .pipe(browserSync.stream())

};


const watchFiles = () =>{
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
};

const images = () => {
  return src(['src/img/**/*.*', '!src/img/**/*.svg'])
    .pipe(newer('dist/img'))
    .pipe(avif())

    .pipe(src('src/img/**/*.*'))
    .pipe(newer('dist/img'))
    .pipe(webp())

    .pipe(src('src/img/**/*.*'))
    .pipe(newer('dist/img'))
    .pipe(gulpif(isProd, image()))

    .pipe(dest('dist/img'))
    .pipe(browserSync.stream())
};

const htmlInclude = () => {
  return src(['src/index.html', 'src/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file',
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const toProd = (done) => {
  isProd = true;
  done();
};


watch('src/scss/**/*.scss', styles)
watch('src/libraries/**/.css', copyingPluginsCss)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/js/components/catalog/*.js', CatalogScripts)
watch('src/js/components/product/*.js', productScript)
watch('src/partials/*.html', htmlInclude)
watch('src/index.html', htmlInclude)
watch('src/*.html', htmlInclude)
watch('src/resources/**', resources)
watch('src/img', images)
watch('src/resources/fonts', fonts)
watch('src/**/*.html', htmlMinify)


exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.svgSprites = svgSprites
exports.resources = resources
exports.image = images
exports.fonts = fonts
exports.clean = clean
exports.fileInclude = htmlInclude
exports.watchFiles = watchFiles
exports.toProd = toProd
exports.copyingPluginsCss = copyingPluginsCss
exports.CatalogScripts = CatalogScripts
exports.productScript = productScript


exports.default = series(clean, htmlInclude,  resources, scripts, CatalogScripts, productScript, copyingPluginsCss, styles, images, svgSprites, fonts, watchFiles);
exports.build = series(toProd, clean, htmlInclude,  resources, scripts, styles, images, svgSprites, fonts,  htmlMinify);
