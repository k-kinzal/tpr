# tpr
[![Build Status](https://travis-ci.org/k-kinzal/tpr.svg?branch=develop)](https://travis-ci.org/k-kinzal/tpr)
[![Dependency Status](https://david-dm.org/k-kinzal/tpr.png?theme=shields.io)](https://david-dm.org/k-kinzal/tpr)
[![devDependency Status](https://david-dm.org/k-kinzal/tpr/dev-status.png?theme=shields.io)](https://david-dm.org/k-kinzal/tpr#info=devDependencies)

Support tools that deal with Scala.js in the project of the npm.

## Get started

```
npm install --save-dev tpr
```

```
tpr src -o scalajs.js --fullOpt
```

## CLI

```
$ tpr --version
0.0.0

$ tpr --help

  Usage: cli [options] <file ...>

  Options:

    -h, --help                        output usage information
    -V, --version                     output the version number
    -o, --output <directory>          Output file of linker (required)
    -jo, --jsoutput <file>            Concatenate all JavaScript libary dependencies to this file
    -f, --fastOpt                     Optimize code (this is the default)
    -n, --noOpt                       Don't optimize code
    -u, --fullOpt                     Fully optimize code (uses Google Closure Compiler)
    -p, --prettyPrint                 Pretty print full opted code (meaningful with -u)
    -s, --sourceMap                   Produce a source map for the produced code
    --compliantAsInstanceOfs          Use compliant asInstanceOfs
    -m, --outputMode <value>          Output mode (ECMAScript51Isolated, ECMAScript6, ECMAScript6StrongMode, ECMAScript51Global)
    -b, --bypassLinkingErrors         Only warn if there are linking errors
    -c, --checkIR                     Check IR before optimizing
    -r, --relativizeSourceMap <path>  Relativize source map with respect to given path (meaningful with -s)
    --noStdlib                        Don't automatcially include Scala.js standard library

```

## License

MIT

## Copyright

Copyright (c) 2015 k-kinzal