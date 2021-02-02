const gulp = require('gulp');
const sass = require('gulp-sass'); //Sassコンパイル
const plumber = require('gulp-plumber'); //エラー時の強制終了を防止
const notify = require('gulp-notify'); //エラー発生時にデスクトップ通知する
const sassGlob = require('gulp-sass-glob'); //@importの記述を簡潔にする
const browserSync = require('browser-sync'); //ブラウザ反映
const postcss = require('gulp-postcss'); //autoprefixerとセット
const autoprefixer = require('autoprefixer'); //ベンダープレフィックス付与
const cssdeclsort = require('css-declaration-sorter'); //css並べ替え
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const replace = require("gulp-replace");
const mmq = require('gulp-merge-media-queries');
const htmlbeautify = require("gulp-html-beautify");
const fs = require('fs'); //fsファイルの読み込み

// scssのコンパイル - compile
gulp.task('sass', function () {
  return gulp
    .src([
      './src/_scss/**/*.scss',
      '!./src/_scss/**/--*.scss',
    ])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))//エラーチェック
    .pipe(sassGlob())//importの読み込みを簡潔にする
    .pipe(sass({
      outputStyle: 'expanded' //expanded, nested, campact, compressedから選択
    }))
    .pipe(postcss([
      cssdeclsort({ order: 'smacss' }), //プロパティをソートし直す(アルファベット順)
      autoprefixer({
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する
        "overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false
      }),
    ]))
    // .pipe(mmq()) // メディアクエリまとめる
    .pipe(gulp.dest('./src/css'));//コンパイル後の出力先
});

// 保存時のリロード - reload on save
gulp.task('browser-sync', function (done) {
  browserSync.init({
    // local server
    server: {
      baseDir: "./src/",
      index: "index.html"
    }
  });
  done();
});

gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});

// 監視 - watch
gulp.task('watch', function (done) {
  gulp.watch('./src/_scss/**/*.scss', gulp.task('sass')); //sassが更新されたらgulp sassを実行
  gulp.watch('./src/_scss/**/*.scss', gulp.task('bs-reload')); //sassが更新されたらbs-reloadを実行
  gulp.watch('./src/**/*.html', gulp.task('bs-reload')); //htmlが更新されたらbs-reloadを実行
  gulp.watch('./src/js/*.js', gulp.task('bs-reload')); //jsが更新されたらbs-relaodを実行
});

// default
gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));

// 画像の圧縮 - Image Compression
// 圧縮率の定義 - config
var imageminOption = [
  pngquant({ quality: [0.7,  0.85], }),
  mozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo()
];

// $ gulp imageminで./src/images/base/フォルダ内の画像を圧縮し ./src/images/フォルダへ
// .gifが入っているとエラーが出る
gulp.task('imagemin', function () {
  return gulp
    .src([
      './src/images/_base/**/*.{jpg,png,gif,svg}',
      '!src/images/_**/*',
      '!src/images/**/_*'
    ])
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest('./src/images/'));
});

// code format
gulp.task('htmlbeautify', function () {
  var options = {
    indent_size: 2
  };
  return gulp
    .src('./src/**/*.html')
    .pipe(plumber())
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./src/'))
});
