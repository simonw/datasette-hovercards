from datasette import hookimpl


@hookimpl
def extra_js_urls(datasette, table):
    if table:
        return [
            datasette.urls.static_plugins(
                "datasette-hovercards", "datasette-hovercards.js"
            )
        ]
