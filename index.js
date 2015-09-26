var css = require('css'),
    extend = require('extend');

function defaultReplaceSelector(selector, classes) {
    var result = selector;
    classes.forEach(function(clazz) {
        if (selector.indexOf('.' + clazz) >= 0) {
            result = '';
            return false;
        }
    });
    return result;
}

function symdiffRemoveCSS(cssString, classesToRemove, options) {
    options = extend({
        replaceSelectorFn: defaultReplaceSelector
    }, options);

    // try to read file content
    var ast;    
    try {
        ast = css.parse(cssString);
    } catch(e) {
        // TODO better to throw?
        return null;
    }

    if (!ast.stylesheet) {
        return null;
    }

    /*
     * Remove all selectors containg a class to remove.
     * If there is no selector left afterwards, delete rule.
     */
    
    var rulesToRemove = [];

    ast
        .stylesheet
        .rules
        .forEach(function(rule) {
            var newSelectors = rule
                                .selectors
                                .map(function(selector) {
                                    return options.replaceSelectorFn(selector, classesToRemove);
                                })
                                .filter(function(selector) {
                                    return selector.length > 0;
                                });

            if (newSelectors.length === 0) {
                rulesToRemove.push(rule);
            } else {
                rule.selectors = newSelectors;
            }
        });

    // remove obsolete rules
    ast.stylesheet.rules = ast.stylesheet.rules.filter(function(rule) {
        return rulesToRemove.indexOf(rule) < 0;
    });

    return css.stringify(ast, options || {});
}

module.exports = symdiffRemoveCSS;