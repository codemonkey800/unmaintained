gulp       = require 'gulp'
config     = require 'gulp-site-config'
concat     = require 'gulp-concat'
jade       = require 'gulp-jade'
coffee     = require 'gulp-coffee'
coffeeLint = require 'gulp-coffeelint'
uglify     = require 'gulp-uglify'
sourcemaps = require 'gulp-sourcemaps'
sass       = require 'gulp-sass'

del     = require 'del'
express = require 'express'
path    = require 'path'

app = express()
app.use (req, res, next) ->
    ext = path.extname req.url
    if ext is ''
        req.url += '.html'
    next()
    return
app.use(express.static "#{__dirname}/site")

projectConfig = require './config'

gulp.task 'lint', ->
    gulp.src './src/**/*.coffee'
        .pipe coffeeLint(projectConfig.lint)
        .pipe coffeeLint.reporter()
    return


gulp.task 'coffee', ['lint'], ->
    # Compiles, concatenates, and uglifis core CS files
    # These are files included in every page
    gulp.src './src/coffee/*.coffee'
        .pipe sourcemaps.init()
        .pipe concat('site.min.js')
        .pipe coffee()
        .pipe uglify({mangle: true})
        .pipe sourcemaps.write()
        .pipe gulp.dest('./site/js')

    # Compiles and uglifes page specific CS files
    gulp.src './src/coffee/!(*.coffee)/*.coffee', {base: './src/coffee'}
        .pipe sourcemaps.init()
        .pipe coffee()
        .pipe uglify({mangle: true})
        .pipe sourcemaps.write()
        .pipe gulp.dest('./site/js')

    return

gulp.task 'scss', ->
    gulp.src './src/scss/*.scss'
        .pipe sourcemaps.init()
        .pipe sass()
        .pipe concat('site.min.css')
        .pipe sourcemaps.write()
        .pipe gulp.dest('./site/css')

    gulp.src './src/scss/!(*.scss)/*.scss', {base: './src/scss'}
        .pipe sourcemaps.init()
        .pipe sass()
        .pipe sourcemaps.write()
        .pipe gulp.dest('./site/css')

    return

siteConfig = {}
gulp.task 'site-config', ->
    gulp.src './src/**/_data.json'
        .pipe config(siteConfig)

postData = {}
gulp.task 'post-data', ->
    gulp.src './src/posts/post-data.json'
        .pipe config(postData)

gulp.task 'jade', ['site-config', 'post-data'], ->
    siteConfig.posts = {}
    siteConfig.posts.data = postData['post-data']
    siteConfig.require = require
    gulp.src ['./src/!(_*).jade', './src/**/!(_**)/*.jade'], {base: './src'}
        .pipe jade({locals: siteConfig})
        .pipe gulp.dest('./site')
    return

projectFiles = [
    './src/!(_*).!(coffee|jade|md)',
    './src/!(_**|_*.*|coffee|scss)/**/!(_*).!(coffee|jade|md)'
]

gulp.task 'project', ->
    gulp.src projectFiles, {base: './src'}
        .pipe gulp.dest('./site')
    return

gulp.task 'default', ['coffee', 'scss', 'jade', 'project']

gulp.task 'clean', ->
    del './site'
    return

gulp.task 'server', ['default'], ->
    coffeeWatcher = gulp.watch './src/coffee/**/*.coffee', ['coffee']
    coffeeWatcher.on 'change', (e) ->
        console.log "#{e.path} changed, re-compiling Coffeescript"
        return

    scssWatcher = gulp.watch './src/scss/**/*.scss', ['scss']
    scssWatcher.on 'change', (e) ->
        console.log "#{e.path} changed, running SCSS tasks"
        return

    configWatcher = gulp.watch './src/**/_data.json', ['jade']
    configWatcher.on 'change', (e) ->
        console.log "#{e.path} changed, re-compiling Jade"
        return

    jadeWatcher = gulp.watch ['./src/**/*.jade', './src/**/*.md'], ['jade']
    jadeWatcher.on 'change', (e) ->
        console.log "#{e.path} changed, re-compiling Jade"
        return

    projectWatcer = gulp.watch projectFiles, ['project']
    projectWatcer.on 'change', (e) ->
        console.log "#{e.path} changed, re-copying project files"
        return

    server = app.listen projectConfig.port || 8080, ->
        port = server.address().port
        console.log "Server started at http://localhost:#{port}"
