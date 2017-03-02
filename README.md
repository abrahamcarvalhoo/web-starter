# [![Web Starter Kit](https://raw.githubusercontent.com/abrahamcarvalhoo/web-starter-kit/master/source/assets/images/og-image.png "Web Starter Kit")][github-url]

[![Build Status][build-badge]][build-url]
[![Dependency Status][dependency-badge]][dependency-url]
[![DevDependency Status][dev-dep-badge]][dev-dep-url]
[![Code Climate][codeclimate-badge]][codeclimate-url]
[![Test Coverage][testcoverage-badge]][testcoverage-url]
[![Issue tracking][issues-badge]][issues-url]
[![Licensing][license-badge]][license-url]

[github-url]: https://github.com/abrahamcarvalhoo/web-starter-kit

[build-badge]: https://img.shields.io/circleci/project/github/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[build-url]: https://circleci.com/gh/abrahamcarvalhoo/web-starter-kit

[dependency-badge]: https://img.shields.io/david/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[dependency-url]: https://david-dm.org/abrahamcarvalhoo/web-starter-kit

[dev-dep-badge]: https://img.shields.io/david/dev/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[dev-dep-url]: https://david-dm.org/abrahamcarvalhoo/web-starter-kit?type=dev

[license-badge]: https://img.shields.io/github/license/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[license-url]: https://github.com/abrahamcarvalhoo/web-starter-kit/blob/master/LICENSE

[codeclimate-badge]: https://img.shields.io/codeclimate/github/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/abrahamcarvalhoo/web-starter-kit

[testcoverage-badge]: https://img.shields.io/codeclimate/coverage/github/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[testcoverage-url]: https://codeclimate.com/github/abrahamcarvalhoo/web-starter-kit/coverage

[issues-badge]: https://img.shields.io/github/issues/abrahamcarvalhoo/web-starter-kit.svg?style=flat-square
[issues-url]: https://github.com/abrahamcarvalhoo/web-starter-kit/issues

## Overview

**Web Starter Kit** is a front-end template that helps you build fast based on Gulp, Node, NPM, Bower, BrowserSync, Sass, and Pug.

## Setup

>:exclamation: Before you can install dependencies, you will need to install [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/).

```bash
# Install global dependencies
$ npm install -g gulp-cli bower

# Clone the repo (and fetch only the latest commits)
$ git clone https://github.com/abrahamcarvalhoo/web-starter-kit.git
$ cd web-starter-kit

# Install local dependencies
$ npm install
$ bower install
```

## Usage

> Run the default `server` task.

```bash
$ gulp
```

> Build the assets and outputs to the `build/` directory.

```bash
$ gulp build
```

> Build styles with pre-processors

```bash
$ gulp styles
```

> Build scripts

```bash
$ gulp scripts
```

> Build views with pre-processors

```bash
$ gulp views
```

> Copy image files

```bash
$ gulp images
```

> Copy font files

```bash
$ gulp fonts
```

> Copy public files

```bash
$ gulp public
```

> Remove build directory

```bash
$ gulp clean
```

## Contributing

If something is unclear, confusing, or needs to be refactored, please let me know. Pull requests are always welcome!

## License

MIT License

Copyright (c) 2017 Abraham Carvalho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
