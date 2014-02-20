# easyconf
一个简化的json配置文件读写器

## 安装

```bash
npm install easyconf
```

或者

```bash
git clone git://github.com/czy88840616/easyconf.git
npm link
```

## 使用

```js
var easyconf = require('easyconf'),
    conf = new easyconf('./nconf_demo.json');

conf.set('use', 'cart');
conf.get('vmcommon');
conf.save(function(err) {
//TODO
});

or 

conf.saveSync();
```

## License
easyconf 遵守 "MIT"：https://github.com/czy88840616/easyconf/blob/master/LICENSE.md 协议