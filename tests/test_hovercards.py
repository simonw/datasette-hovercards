from datasette.app import Datasette
import pytest


@pytest.mark.asyncio
async def test_static_asset():
    datasette = Datasette([], memory=True)
    response = await datasette.client.get(
        "/-/static-plugins/datasette-hovercards/datasette-hovercards.js"
    )
    assert response.status_code == 200


@pytest.mark.asyncio
@pytest.mark.parametrize("path,expected", (("/db/t", True), ("/db", False)))
async def test_included_on_table_page(path, expected):
    datasette = Datasette([], memory=True)
    db = datasette.add_memory_database("db")
    if not await db.table_exists("t"):
        await db.execute_write("create table t (id integer primary key)", block=True)
    response = await datasette.client.get(path)
    if expected:
        assert "datasette-hovercards.js" in response.text
    else:
        assert "datasette-hovercards.js" not in response.text
