$ ->

    $(document.body).addClass 'loaded'

    $sideNavItems = $ '.side-nav-item'
    $sideNavItems.click ->
        codesucks.util.openLink $(this).data('url')
        return

    $('.button-collapse').sideNav({
        menuWidth: 240,
        activationWidth: 70
})
    $('.collapsible').collapsible()

    $codeSucksBrand = $ '.code-sucks'
    $codeSucksBrand.css 'min-width', $codeSucksBrand.width()

    $('.card.animated-shadow').click ->
        $(this).materialResponse(300, 2)
        return

    barShowing = true
    setInterval ->
        if barShowing
            $codeSucksBrand.text('code-sucks$: ')
        else
            $codeSucksBrand.text('code-sucks$: |')
        barShowing = !barShowing
        return
    , 800

    $footer = $('footer')
    $footer.offset {top: $(document).height()}
