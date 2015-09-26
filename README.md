# symdiff-css-autoremove

[![Build Status](http://img.shields.io/travis/symdiff/symdiff-css-autoremove.svg)](https://travis-ci.org/symdiff/symdiff-css-autoremove) [![Coverage Status](https://coveralls.io/repos/symdiff/symdiff-css-autoremove/badge.svg?branch=master)](https://coveralls.io/r/symdiff/symdiff-css-autoremove?branch=master)

Gets rid of classes in your CSS.

## Algorithm

It removes all selectors that contain the class and removes the rule altogether if it doesn’t have any selectors left.

This does not seem very smart, but it’s by design. For instance, what would you expect after processing `div > .remove > .keep`? Should it rather be `div > * > .keep` or should the rule be discarded? `symdiff-css-autoremove` does not try to guess.

## Usage

The module exports a function that takes the following arguments:

* The css string
* An array of the classes to remove
* (optional) An object containing some options

### Options

* replaceSelectorFn: A function that takes the selector (string) and the classes to remove as argument and should return a string. Here you can implement custom logic if the default behavior doesn’t work for you. If you want the selector to be discarded, return the empty string.

Also all options that [`css.stringify`](https://www.npmjs.com/package/css#css-stringify-object-options) takes.


## Example

    removeCss(input, ['remove-me']);

Transforms this:

~~~ css
.remove-me {
    border: 1px solid;
    color: red:
}

.keep-me,
div > .remove-me {
    color: blue;
}
~~~

...to this:

~~~ css
.keep-me {
    color: blue;
}
~~~