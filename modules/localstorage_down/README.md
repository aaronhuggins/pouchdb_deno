# localstorage_down

Ported for Deno from [No9/localstorage-down](https://github.com/No9/localstorage-down).
Main driver for implementation was [a lack of IndexxedDB](https://github.com/denoland/deno/issues/1699).

LocalStorage implementation of [leveldown](https://github.com/Level/leveldown) for mobile and desktop browsers. The idea is to be able to use the [level](http://github.com/level) stack on any browser that supports LocalStorage.

The scenarios envisaged are:

1. Occasionally connected clients
2. Ad-hoc networks where clients need to sync directly with each other

This project is intended for use with the [level eco-system](https://github.com/level/).

##  Contributors (from original codebase)

* [Anton Whalley](https://github.com/no9)
* [Adam Shih](https://github.com/adamshih)
* [Nolan Lawson](https://github.com/nolanlawson)
* [Many more!](https://github.com/No9/localstorage-down/graphs/contributors)
