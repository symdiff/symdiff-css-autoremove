var css = require('css');

// this needs some more thought as it might alter
// the behavior of a selector:
// a .remove -> a
function stripClassesFromSelector(classes) {
    return function(selector) {
        var result = selector;
        classes
            .forEach(function(clazz) {
                result = result.replace('.' + clazz, '');
            });
        return result;
    };
}

function symdiffRemoveCSS(cssString, classesToRemove, options) {
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
     * If the selector is equal to .[class], remove the whole node.
     * Otherwise remove the class from the selector.
     */
    
    var rulesToRemove = [];

    ast
        .stylesheet
        .rules
        .forEach(function(rule) {
            var newSelectors = rule
                                .selectors
                                .map(stripClassesFromSelector(classesToRemove))
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