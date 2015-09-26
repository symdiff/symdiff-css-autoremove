# symdiff-css-autoremove

[![Build Status](http://img.shields.io/travis/symdiff/symdiff-css-autoremove.svg)](https://travis-ci.org/symdiff/symdiff-css-autoremove) [![Coverage Status](https://coveralls.io/repos/symdiff/symdiff-css-autoremove/badge.svg?branch=master)](https://coveralls.io/r/symdiff/symdiff-css-autoremove?branch=master)

Get rid of classes in your CSS.

## Example

    symdiffRemoveCss(input, ['remove-me']);

Transforms this:

~~~ css
.remove-me {
    border: 1px solid;
    color: red:
}

.keep-me {
    color: blue;
}
~~~

...to this:

~~~ css
.keep-me {
    color: blue;
}
~~~