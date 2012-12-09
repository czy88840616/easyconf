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

    var json;
    // 如果为json文件
    if( path.extname( p ) === '.json' ){
        json = require( p );
    }
    // 否则，读取文件，用JSON解析
    else {
        var fileContent = fs.readFileSync( p ).toString( 'utf-8' );
        json = JSON.parse( fileContent );
    }
    return json;
}

function easyconf(jsonPath) {
    this.p = path.resolve(jsonPath);

    // 检查文件是否存在
    if(fs.existsSync(this.p)) {
        var fileStat = fs.statSync( this.p );

        // 检查是否为目录
        if( !fileStat.isDirectory() ){
            try {
                this.json = parseConfig( this.p );
            }
            catch( e ){
                throw new Error( e );
            }
        }
        else {
            throw new Error( "给定的路径: " + this.p + ' 为已经存在的目录!' );
        }
    } else {
        // 若文件不存在，则创建一个，并设置初始内容为空
        mkdirp.sync( path.dirname(this.p));
        this.json = {};
        this.save(function(err) {
            if(err) {
                throw err;
            }
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