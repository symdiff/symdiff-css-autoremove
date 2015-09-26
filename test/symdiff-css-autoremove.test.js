var autoremove = require('../index'),
    path = require('path'),
    fs = require('fs');

function readFixture(filename) {
    var file = path.resolve(path.join(__dirname, 'fixtures', filename));
    return fs.readFileSync(file).toString();
}

describe('The CSS autoremover', function() {
    it('should do nothing if class is not in CSS', function() {
        var result = autoremove(readFixture('do_nothing.css'), ['remove-me']);
        expect(result).to.be.defined;
        expect(result.indexOf('keep')).to.be.above(0);
    });

    it('should remove the whole definition', function() {
        var result = autoremove(readFixture('remove_definition.css'), ['remove-me']);
        expect(result).to.equal('');
    });

    it('should remove class from selector', function() {
        var result = autoremove(readFixture('remove_from_selectors.css'), ['remove-me']);
        expect(result).to.be.defined;
        expect(result.indexOf('remove-me')).to.be.below(0);
        expect(result.indexOf('keep-me')).to.be.above(0);
    });

    it('should accept a custom replacement function', function() {
        function custom(selector) {
            return selector;
        }

        var result = autoremove(readFixture('remove_from_selectors.css'),
                                ['remove-me'],
                                { replaceSelectorFn: custom });
        expect(result).to.be.defined;
        expect(result.indexOf('remove-me')).to.be.above(0);
        expect(result.indexOf('keep-me')).to.be.above(0);
    });
});