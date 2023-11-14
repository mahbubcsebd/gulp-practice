const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const { watch, series } = require('gulp');

//  src ফোল্ডার থেকে সব html ফাইল গুলো আনবে এবং dist ফোল্ডারে রাখবে
gulp.task('copy', function () {
    gulp.src('./src/*.html').pipe(gulp.dest('./dist/'));
});
//  src/css ফোল্ডার থেকে সব css ফাইল গুলো আনবে এবং dist/css ফোল্ডারে রাখবে
gulp.task('sass', function () {
    gulp.src('./src/css/*.scss').pipe(sass()).pipe(gulp.dest('./dist/css'));
});
// src/js ফোল্ডারের সব js ফাইল গুলো আনবে এবং dist/js ফোল্ডারে রাখবে এবং কম্প্রেস করবে
gulp.task('compress', function () {
    gulp.src('./src/js/*').pipe(uglify()).pipe(gulp.dest('./dist/js'));
});
// src/js ফোল্ডারের সব js ফাইলের কোড গুলো মার্জ করে dist/js ফোল্ডারের ভিতর main.js নামে রাখবে
gulp.task('concat', function () {
    gulp.src('./src/js/*').pipe(concat('main.js')).pipe(gulp.dest('./dist/js'));
});
// src/js ফোল্ডারের সব js ফাইল গুলো মার্জ করে dist/js ফোল্ডারের ভিতর main.js নামে রাখবে এবং কম্প্রেস করবে
gulp.task('concatmin', function () {
    gulp.src('./src/js/*')
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'));
});

//  src এর ভিতরের সব html ফাইলের উপর নজর রাখবে, কোড পরিবর্তন হওয়ার সাথে সাথেই তা dist ফোল্ডারে আপডেট করে দিবে। এখানে gulp.watch() দুইটা আর্গুমেন্ট নেয়। প্রথমটা কোন ফাইল বা ফাইলগুলোকে নজরদারীতে রাখতে চাচ্ছেন আর দ্বিতীয়টা একটা অ্যারে যেখানে আপনি কোন কোন অ্যাকশন অ্যাপ্লাই করতে চাচ্ছেন সেই অ্যাকশনের টাস্কের নাম একটার পর একটা। উল্লেখিত ফাইলে কোনোরূপ চ্যাঞ্জ হলেই এই অ্যারেতে ডিফাইন করা অ্যাকশনগুলো অ্যাপ্লাই হয়ে যাবে অটোম্যাটিকেলি।
gulp.task('watch', function () {
    gulp.watch('./src/*.html', gulp.series('copy'));
    gulp.watch('./src/css/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/*', gulp.series('concatmin'));
});


// সব টাস্ক রান করার জন্য Terminal এ গিয়ে gulp taskNAme দিতে হবে।
// gulp taskName