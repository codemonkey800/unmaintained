gulp       = require 'gulp'
gulpif     = require 'gulp-if'
sourcemaps = require 'gulp-sourcemaps'
concat     = require 'gulp-concat'
jade       = require 'gulp-jade'
uglify     = require 'gulp-uglify'
minifyCSS  = require 'gulp-minify-css'

express = require 'express'
fs      = require 'fs.extra'
path    = require 'path'

projectConfig = require './config'
debug = projectConfig.debug  || false
src = projectConfig.srcDir   || 'src'
dest = projectConfig.destDir || 'site'

app = express()
app.use ( req, res, next ) ->
    ext = path.extname req.url
    if ext is '' and req.url isnt '/'
        req.url += '.html'
    next()
    return
app.use express.static( "#{__dirname}/#{dest}" )

gulp.task 'styles', ->
    gulp.src "./#{src}/css/*.css"
        .pipe sourcemaps.init()
            .pipe concat( 'site.min.css' )
        .pipe sourcemaps.write()
        .pipe gulpif( !debug, minifyCSS() )
        .pipe gulp.dest( dest )
    return

gulp.task 'scripts', ->
    gulp.src "./#{src}/js/*.js"
        .pipe sourcemaps.init()
            .pipe concat( 'site.min.js' )
            .pipe gulpif( !debug, uglify( { mangle: true } ) )
        .pipe sourcemaps.write()
        .pipe gulp.dest( dest )
    return

gulp.task 'jade', ->
    gulp.src "./#{src}/*.jade"
        .pipe jade { pretty: debug, locals: { require: require } }
        .pipe gulp.dest( dest )
    return

projectFiles = "./#{src}/!(_*|js|css)/**/*"
gulp.task 'project', ->
    gulp.src projectFiles
        .pipe gulp.dest( dest )
    return

gulp.task 'default', [ 'scripts', 'styles', 'jade', 'project' ]

gulp.task 'clean', ->
    fs.rmrfSync dest
    return

gulp.task 'server', [ 'default' ], ->
    scriptWatcher = gulp.watch "./#{src}/js/*.js", [ 'scripts' ]
    scriptWatcher.on 'change', ( e ) ->
        console.log "#{e.path} changed, running 'scripts' task"
        return

    styleWatcher = gulp.watch "./#{src}/css/*.css", [ 'styles' ]
    styleWatcher.on 'change', ( e ) ->
        console.log "#{e.path} changed, running 'styles' task"
        return

    jadeWatcher = gulp.watch "./#{src}/**/*.jade", [ 'jade' ]
    jadeWatcher.on 'change', ( e ) ->
        console.log "#{e.path} changed, running 'jade' task"
        return

    projectWatcher = gulp.watch projectFiles, [ 'project' ]
    projectWatcher.on 'change', ( e ) ->
        console.log "#{e.path} changed, running 'project' task"
        return

    server = app.listen projectConfig.server.port || 8080, ->
        port = server.address().port
        console.log "Server listening at http://localhost:#{port}"
        console.log 'Type "stop" to stop the server'

        process.stdin.resume()
        process.stdin.on 'data', ( data ) ->
            if data.toString().indexOf 'stop' isnt -1
                process.exit()
            return

        return
    return

gulp.task 'commit', ->

    exec = require 'exec-sync'
    args = require( 'yargs' ).argv

    run = ( cmd, ignoreErrors = true ) ->
        try
            exec cmd
        catch e
            if not ignoreErrors then throw e
    cd = ( dir ) ->
        process.chdir dir
        return
    git = ( cmd ) ->
        try
            run "git #{cmd}", false
        catch e
            if debug then console.log e


    if args.h
        console.log 'Usage: gulp commit [-h] --ssh|--https -m|--msg <Commit Message>'
        return

    url = ''
    if args.ssh
        url = projectConfig.repo.sshUrl
    else if args.https
        url = projectConfig.repo.httpsUrl
    else
        console.log 'No valid protocol specified. Using HTTPS by default'
        url = projectConfig.repo.httpsUrl

    if ( not args.m or typeof args.m isnt 'string' ) and ( not args.msg or typeof args.msg isnt 'string' )
       console.log 'No commit message specified'
       return

    status = git 'status'
    if status.indexOf( 'nothing to commit, working directory clean' ) isnt -1
        console.log 'Nothing to commit from source'
    else
        console.log 'Committing source'
        git 'add .'
        git "commit -m \"#{args.m || args.msg}\""
        git 'push'

    console.log 'Cleaning compiled site'
    if fs.existsSync dest
        fs.rmrfSync dest

    console.log 'Initializing site repo'
    git "clone -b #{projectConfig.repo.branch.site} #{url} #{dest}"

    console.log 'Compiling site'
    if debug
        projectConfig.debug = false
        fs.writeFileSync './config.json', JSON.stringify( projectConfig, null, '    ' ) + '\n'

    run 'gulp'

    if debug
        projectConfig.debug = true
        fs.writeFileSync './config.json', JSON.stringify( projectConfig, null, '    ' ) + '\n'

    status = git 'status'
    if status.indexOf( 'nothing to commit, working directory clean' ) is -1
        console.log 'Comitting site'
        cd 'site'
        git 'add .'
        git "commit -m \"#{args.m || args.msg}\""
        git 'push -f'
    else
        console.log 'Nothing to commit from site'

    console.log 'Commit done!'

    return
