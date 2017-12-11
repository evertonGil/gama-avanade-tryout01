var gulp = require('gulp')
	,browserSync = require('browser-sync')
	,less = require('gulp-less')
	,autoprefixer = require('gulp-autoprefixer');

gulp.task('reload',['build-less'], function(){
	browserSync.reload();
});

gulp.task('build-less', function(){
	return gulp.src('public/less/style.less')
    	.pipe(less().on('error', function(erro) {
              console.log('LESS, erro compilação: ' + erro.filename);
              console.log(erro.message);
            }))
    	.pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
    	.pipe(gulp.dest('public/css'))
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch(['public/**/*.less', 'public/**/*.html','public/**/*.js' ]).on('change', function(){
    	gulp.start('reload')
    });

});


