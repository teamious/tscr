# Install

`npm install -g tscr`

# Usage

`tscr my-cool-project`

# Flags

`--lib` By calling `tscr` with the `--lib` flag, you will generate a template suitable for for developing NPM packages that use Typescript + React.
It will also create a `docs` folder that acts as a website to test your code.

# Description

`tscr` is a CLI tool to quickly template a project that uses:

    - Typescript
    - React
    - Webpack
    - Sass

There are a few assumptions baked into the webpack build.

# Assumption #1: process.env = configuration

The template contains configuration files in `./src/config`. These files are meant to export a
config object that is injected into the process.env variable depending on the environment you are building for.

# Assumption #2: Extracted SASS code

The webpack configuration will extract styles into a single file and be included into
the index.html file instead of injected into the DOM.

# Assumption #3: Exracted vendor code

The webpack configuration will extract all vendor code into a single javascript file separate
from your app code.