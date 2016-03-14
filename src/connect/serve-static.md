#安装
1、全局安装
```bash
npm install -g serve-static
```

2、本地安装
```bash
npm install serve-static
```

#使用
```node
var serverStatic = require("serve-static");
```

#API
##serveStatic(root, options)
根据指定的目录(root)，提供静态文件服务。
###options参数说明
**dotfiles**

指定当请求的URL中有"dotfiles"(.或..)时的处理规则，但dotfiles的路径不能超出root所指目录的范围。有3种处理规则：

* `allow` 不做特殊处理。
* `deny` 拒绝请求URL中有dotfiles，返回403或next()。
* `ignore` （默认值）如果dotfiles指定的文件不存在返回404或next()。*与allow有什么区别呢？暂时还没有弄清楚*。

**etag**

允许或禁止etag的生成。

默认值：true。

**extensions**

设置文件扩展名退却（fallbacks）。如果设置了值，在根据给定的文件名找不到该文件时，会根据给定的扩展名逐个追加到文件名后面再次查找。如：["html", "htm"]，给根据给定的文件扩展名的顺序执行。

默认值：false。

**fallthrough**

个人暂时把它叫做“错误穿透“吧，当客户端发过来一个错误的请求或者请求获取一个不存在的文件。设置为true时，调用next()将请求传给下一层处理；设置为false时，调用next(err)将请求传给下一层处理。典型的使用场景如下：

* 如果将多个目录映射到同一个地址上，由于serve-static会顺序处理，在第1个目录找不到指定的文件，会到第2个目录寻找，依此顺序在所有的目录中查找文件。这样的场景应该设置为true。
* 如果只有一个目录映射，那么文件是否存在是非常明确的。这样的场景应该设置成false。

默认值：true。

**index**

指定目录默认的首页文件。如果只有一个可选的首页文件，用字符串（如："index.html"）指定；如果有多个可选的首页文件，使用字符串数组（如：["index.html", "index.htm", "default.html"]）。如果设置为false，将禁止首页文件。

默认值："index.html"。

**lastModified**

是否在HTTP的响应中设置`Last-Modified`头，使用文件系统的最近修改时间。

默认值：true。

**maxAge**

可缓存的时间，单位毫秒。

默认值:0。

**redirect**

当pathname是一个目录时，是否在URL尾部追加"/"。

默认值：true。

**setHeaders**

自定义HTTP响应的头部。以`fn(res, path, stat)`的形式调用。

#示例
##使用默认参数
[源代码](serve-static-default.js)
```node
/**
 * 服务入口。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var serverStatic = require("serve-static");

// 建立Connect应用
var app = connect();
app.use(serverStatic("/home/nieyong", {
    "dotfiles" : "ignore",
    "etag" : true,
    "extensions" : false,
    "fallthrough" : true,
    "index" : "index.html",
    "lastModified" : true,
    "maxAge" : 0,
    "redirect" : true,
    
}));

// 启动服务
http.createServer(app).listen(port);
console.log("http server started, listen port " + port);
```

##在响应中添加自定义Header
[源代码](serve-static-customheader.js)
```node
/**
 * 服务入口。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var serverStatic = require("serve-static");

// 建立Connect应用
var app = connect();
app.use(serverStatic("/home/nieyong", {
    "setHeaders" : addHeader
}));

// 启动服务
http.createServer(app).listen(port);
console.log("http server started, listen port " + port);

function addHeader(res, path) {
    if (serverStatic.mime.lookup(path) === 'text/html') {
        res.setHeader('Hello', 'serve-static');
    }
}
```
