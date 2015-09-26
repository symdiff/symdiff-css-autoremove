var autoremove = require('../index'),
    path = require('path'),
    fs = require('fs');

function readFixture(filename) {
    var file = path.resolve(path.join(__dirname, 'fixtures', filename));
    return fs.readFileSync(file).toString();
}

describe('The CSS autoremover', function() {
    it('should remove the whole definition', function() {
        var result = autoremove(readFixture('remove_definition.css'), ['remove-me']);
        expect(result).to.equal('');
    });

    it('should remove class from selector', function() {
        var result = autoremove(readFixture('remove_from_selector.css'), ['remove-me']);
        expect(result).to.be.defined;
        expect(result.indexOf('remove-me')).to.be.below(0);
    });
});