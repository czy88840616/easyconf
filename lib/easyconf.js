/**
 * @fileoverview
 * @author Harry <czy88840616@gmail.com>
 *
 */
var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp');

/**
 * 对文件内容进行json解析
 * 如果为json后缀文件，则直接require，如果不是则调用JSON.parse
 * @param p 文件不做是否存在以及是否为目录判断
 * @return {*}
 */
function parseConfig( p ){

    var fileContent = fs.readFileSync( p ).toString( 'utf-8' ),
        json = JSON.parse( fileContent || '{}' );

    return json;
}

function easyconf(jsonPath) {
    this.p = path.resolve(jsonPath);
    this.db = {};

    if(fs.existsSync(this.p)) {
        var fileStat = fs.statSync( this.p );

        // 检查是否为目录
        if( fileStat.isFile() ){
            try {
                this.db = parseConfig( this.p );
            }
            catch( e ){
                throw new Error( e );
            }
        } else {
            throw new Error(this.p + ' is a directory' );
        }
    }
}

easyconf.prototype.set = function(name, value) {
    this.db[name] = value;
};

easyconf.prototype.get = function(name) {
    return this.db[name];
};

easyconf.prototype.remove = function(name) {
    delete this.db[name];
};

easyconf.prototype.save = function(callback) {
    // 检查文件是否存在
    if(!fs.existsSync(this.p)) {
        // 若文件不存在，则创建一个，并设置初始内容为空
        mkdirp.sync( path.dirname(this.p));
    }

    fs.writeFile(this.p, JSON.stringify(this.db, null, 4), function(err){
        callback(err);
    });
};

easyconf.prototype.saveSync = function() {
    // 检查文件是否存在
    if(!fs.existsSync(this.p)) {
        // 若文件不存在，则创建一个，并设置初始内容为空
        mkdirp.sync( path.dirname(this.p));
    }

    fs.writeFileSync(this.p, JSON.stringify(this.db, null, 4));
};

module.exports = easyconf;