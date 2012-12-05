/**
 * @fileoverview
 * @author Harry <czy88840616@gmail.com>
 *
 */
var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');

function easyconf(jsonPath) {
    this.p = path.resolve(jsonPath);

    if(fs.existsSync(this.p)) {
        var fileStat = fs.statSync( this.p );
        
        if( !fileStat.isDirectory() ){
            
            if( path.extname( this.p ) === '.json' ){
                try {
                this.json = require(this.p);
                } catch(ex) {
                    this.json = {};
                }    
            }
            else {
                var fileContent = fs.readFileSync( this.p ).toString( 'utf-8' );
                try {
                    this.json = JSON.parse( fileContent )
                } catch(ex) {
                    this.json = {};
                }    
            }
        }
    } else {
        this.json = {};
        mkdirp.sync(path.dirname(this.p));
        this.save(function(err) {
            throw err;
        });
    }
}

easyconf.prototype.set = function(name, value) {
    this.json[name] = value;
};

easyconf.prototype.get = function(name) {
    return this.json[name];
};

easyconf.prototype.save = function(callback) {
    fs.writeFile(this.p, JSON.stringify(this.json, null, 4), function(err){
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};

module.exports = easyconf;