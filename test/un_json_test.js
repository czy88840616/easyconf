/**
 * @fileoverview
 * @author neekey <ni184775761@gmail.com>
 *
 */
var easyconf = require('../lib/easyconf');
var Path = require( 'path' );
var assert = require( 'assert' );

describe('test', function() {

    it('get', function( done ) {
        var conf = new easyconf( Path.resolve( __dirname, './un_json' ));
        var expectConf = {
            "name": "easyconf",
            "language": "node.js"
        };
        var key;

        for( key in expectConf ){
            assert.equal( expectConf[ key ], conf.get( key ) );
        }

        done();
    });
});