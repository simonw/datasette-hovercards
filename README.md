# datasette-hovercards

[![PyPI](https://img.shields.io/pypi/v/datasette-hovercards.svg)](https://pypi.org/project/datasette-hovercards/)
[![Changelog](https://img.shields.io/github/v/release/simonw/datasette-hovercards?include_prereleases&label=changelog)](https://github.com/simonw/datasette-hovercards/releases)
[![Tests](https://github.com/simonw/datasette-hovercards/workflows/Test/badge.svg)](https://github.com/simonw/datasette-hovercards/actions?query=workflow%3ATest)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/simonw/datasette-hovercards/blob/main/LICENSE)

Add preview hovercards to links in Datasette

## Installation

Install this plugin in the same environment as Datasette.

    $ datasette install datasette-hovercards

## Usage

Usage instructions go here.

## Development

To set up this plugin locally, first checkout the code. Then create a new virtual environment:

    cd datasette-hovercards
    python3 -mvenv venv
    source venv/bin/activate

Or if you are using `pipenv`:

    pipenv shell

Now install the dependencies and test dependencies:

    pip install -e '.[test]'

To run the tests:

    pytest
