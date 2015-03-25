$(window).load ->

    $postList = $ '.post-list'
    $backButton = $ '.back-btn'
    $forwardButton = $ '.forward-btn'
    manager = new codesucks.PostManager(5  , '/posts/post-data.json')

    if document.location.hash
        manager.hashtag = document.location.hash

    manager.loadPosts ->
        codesucks.loadArchive()

        codesucks.setPosts manager.currentPage

        $backButton.css 'display', 'none'
        if !manager.canGoForward()
            $forwardButton.css 'display', 'none'
        $('.nav-btns').css 'opacity', 1

        return

    $backButton.click ->
        manager.goBack()
        if !manager.canGoBack()
            $backButton.css 'display', 'none'
        if manager.canGoForward()
            $forwardButton.css 'display', ''
        codesucks.setPosts manager.currentPage
        return

    $forwardButton.click ->
        manager.goForward()
        if !manager.canGoForward()
            $forwardButton.css 'display', 'none'
        if manager.canGoBack()
            $backButton.css 'display', ''
        codesucks.setPosts manager.currentPage

    return

codesucks.setPosts = (posts) ->
    $('html, body').animate {
        scrollTop: '0'
}
    $('.post-list > .card').remove()
    $postList = $ '.post-list'
    for post in posts
        $post = codesucks.makePost post
        $postList.prepend $post

    Waves.displayEffect()
    return

codesucks.makePost = (post) ->
    $card = $ '<div class="card z-depth-2 white">'
    $cardImage = $ '<div class="card-image waves-effect waves-block">'
    $cardContent = $ '<div class="card-content white">'
    $cardReveal = $ '<div class="card-reveal">'

    $banner = $ "<img class='responsive-img' src='#{post.banner}'>"
    $cardImage.append $banner
    $card.append $cardImage

    $cardImage.click ->
        document.location.href = post.url
        return

    $cardTitle = $ "<span class='flow-text card-title activator grey-text text-darken-4'>#{post.title}</span>"
    $cardTitle.append $ '<i class="mdi-navigation-more-vert waves-effect right">'
    $cardContent.append $cardTitle

    date = moment(post.date).format('MMMM Do, YYYY')
    $cardDate = $ "<p>#{date}</p>"
    $cardContent.append $cardDate

    $cardTags = $ '<small class="tags">'
    for tag in post.tags
        $tag = $ "<a href='/index#{tag}'>#{tag}</a>"
        $tag.click ->
            document.location.href = $tag.attr('href')
            document.location.reload()
            return
        $cardTags.append $tag
    $cardContent.append $cardTags

    $card.append $cardContent

    $cardRevealTitle = $ "<span class='card-title grey-text text-darken-4'>#{post.title}</span>"
    $cardRevealTitle.append $ '<i class="mdi-navigation-close waves-effect right">'
    $cardReveal.append $cardRevealTitle
    $cardReveal.append $ "<p class='flow-text'>#{post.summary}</p>"

    $openButton = $ "<a class='waves-effect waves-light btn-large'>Open</a>"
    $shareButton = $ "<a class='waves-effect waves-light btn-large'>Share</a>"

    $cardReveal.append $openButton
    $cardReveal.append $shareButton

    $openButton.click ->
        codesucks.util.openLink post.url
        return

    $shareButton.click ->
        codesucks.util.openLink "#{post.url}#share"
        return

    $card.append $cardReveal

    $card

codesucks.loadArchive = ->

    $.get '/posts/post-archive.json', (data) ->
        $archive = $ '.archive'
        years = $.keys(data).map((val) -> parseInt val).sort (a, b) -> b - a

        for year in years
            $yearHeader = $ "<h5 class='waves-effect open'><i class='mdi-navigation-arrow-drop-down'></i>#{year}</h5>"
            $yearBody = $ '<div class="collapse">'

            $yearHeader.click ->
                if $(this).hasClass 'open'
                    $(this).removeClass 'open'
                else
                    $(this).addClass 'open'
                return

            months = $.keys(data[year]).map((val) -> parseInt val).sort (a, b) -> b - a
            for month in months
                monthName = moment({month: month}).format('MMMM')
                $monthHeader = $ "<h5 class='waves-effect open'><i class='mdi-navigation-arrow-drop-down'></i>#{monthName}</h5>"
                $monthBody = $ '<div class="collapse">'
                $postList = $ '<ul>'

                $monthHeader.click ->
                    if $(this).hasClass 'open'
                        $(this).removeClass 'open'
                    else
                        $(this).addClass 'open'
                    return

                posts = data[year][month]

                for post in posts
                    $postLink = $ "<li class='waves-effect'><a data-url='#{post.url}'>#{post.title}</a></li>"
                    $postLink.click ->
                        link = $(this).find('a').data 'url'
                        codesucks.util.openLink link
                        return
                    $postList.append $postLink

                $monthBody.append $postList

                $yearBody.append $monthHeader
                $yearBody.append $monthBody

            $archive.append $yearHeader
            $archive.append $yearBody

        $('.collapse').collapsible('default-open', {
            contentOpen: 1
        })
        $('.archive  h5').click()

        # We make it seem like the archive is loading when it really isn't
        # I don't know how to have the archive be closed initially
        # #HackerLyfe
        setTimeout ->
            $('#archive-preloader').remove()
            $archive.addClass 'loaded'
            Waves.displayEffect()
            return
        , 400
        return

    return
