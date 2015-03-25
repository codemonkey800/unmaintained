window.codesucks =
    data: {}

    util:
        openLink: (link, delay = 200) ->
            setTimeout ->
                document.location.href = link
            , delay
            return

    PostManager: class
        constructor: (@postsPerPage, @jsonFile) ->
            @currentPage = []
            @currentPageNumber = 1
            @maxPages = -1
            @hashtag = ''

        constructPage: ->
            @currentPage = codesucks.data.postCache.filter (post, index) =>
                lowerBound = (@currentPageNumber - 1) * @postsPerPage
                upperBound = @currentPageNumber * @postsPerPage
                if @hashtag isnt ''
                    lowerBound <= index < upperBound and post.tags.indexOf(@hashtag) isnt -1
                else
                    lowerBound <= index < upperBound
            return

        loadPosts: (callback) ->
            callback = callback || ->
            $.get(@jsonFile, (data) =>

                codesucks.data.postCache = data
                @maxPages = Math.ceil data.length / @postsPerPage
                @constructPage()

                callback()
                return
           )
            return


        canGoForward: (amount = 1) ->
            @currentPageNumber + amount <= @maxPages

        canGoBack: (amount = 1) ->
            1 <= @currentPageNumber - amount

        goForward: (amount = 1) ->
            if @canGoForward(amount)
                @currentPageNumber += amount
                @constructPage()

        goBack: (amount = 1) ->
            if @canGoBack(amount)
                @currentPageNumber -= amount
                @constructPage()

        getPosts: ->
            codesucks.data.postCache

($) ->

    $.fn.materialResponse = (duration = 200, change = 1) ->
        $this = $(this)
        shadowDepth = -1
        for i in [ 0..5 ]
            if $this.hasClass "z-depth-#{i}"
                shadowDepth = i
                break

        if 0 <= shadowDepth < 5 and shadowDepth + change <= 5
            $self.switchClass "z-depth-#{shadowDepth}", "z-depth-#{shadowDepth + change}"
            console.log "#{shadowDepth + change}"
            setTimeout ->
                $this.switchClass "z-depth-#{shadowDepth + change}", "z-depth-#{shadowDepth}"
                return
            , duration
        return

    $.keys = (object) ->
        keys = []
        for key, val of object
            keys.push key
        keys

    $.parseInts = (arr) ->
        if not (arr instanceof Array)
            arr

        arr.map (val) ->
            parseInt(val)

) jQuery
