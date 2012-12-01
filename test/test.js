/**
 * @fileoverview
 * @author Harry <czy88840616@gmail.com>
 *
 */
var easyconf = require('../lib/easyconf');

describe('test', function() {
    it('load json', function(done) {
        var conf = new easyconf('./nconf_demo.json');

        console.log(conf.get('vmcommon'));
        conf.set('use', 'cart');
        conf.save(function(){
            new easyconf('./test.json');
            done();
        });

    });
});