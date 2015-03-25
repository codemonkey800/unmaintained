$(window).load ->

    $('.tags a').click ->
        document.location.href = "/index.html#{$(this).text()}"
        return

    editors = $('pre > code')

    for editor in editors
        $editor = $ editor
        mode = codesucks.modeMap[ $editor.attr('class').replace('lang-', '') ]
        if mode
            code = $editor.text()
            CodeMirror (elt) ->
                $editor.parent().after elt
                $editor.parent().remove()
                $(elt).css 'height', 'auto'
                return
            , {
                value: code,
                mode: mode,
                theme: 'monokai',
                lineNumbers: true,
                readOnly: true,
                viewportMargin: Infinity
            }

    return

codesucks.modeMap = {
    c: 'clike',
    cpp: 'clike',
    java: 'clike',
    cs: 'coffeescript',
    css: 'css',
    kt: 'kotlin',
    groovy: 'groovy',
    jade: 'jade',
    js: 'javascript',
    md: 'markdown',
    py: 'python',
    xml: 'xml',
    html: 'xml'
}
