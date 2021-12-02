from setuptools import setup
import os

VERSION = "0.1a0"


def get_long_description():
    with open(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "README.md"),
        encoding="utf8",
    ) as fp:
        return fp.read()


setup(
    name="datasette-hovercards",
    description="Add preview hovercards to links in Datasette",
    long_description=get_long_description(),
    long_description_content_type="text/markdown",
    author="Simon Willison",
    url="https://github.com/simonw/datasette-hovercards",
    project_urls={
        "Issues": "https://github.com/simonw/datasette-hovercards/issues",
        "CI": "https://github.com/simonw/datasette-hovercards/actions",
        "Changelog": "https://github.com/simonw/datasette-hovercards/releases",
    },
    license="Apache License, Version 2.0",
    classifiers=[
        "Framework :: Datasette",
        "License :: OSI Approved :: Apache Software License",
    ],
    version=VERSION,
    packages=["datasette_hovercards"],
    entry_points={"datasette": ["hovercards = datasette_hovercards"]},
    install_requires=["datasette"],
    extras_require={"test": ["pytest", "pytest-asyncio"]},
    package_data={"datasette_hovercards": ["static/*"]},
    python_requires=">=3.6",
)
