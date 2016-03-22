#语法格式
路由用于控制服务端在接收到客户端的请求时交给哪些处理器处理，路由的使用格式如下：
```node
app.METHOD(PATH, HANDLER)
```

#参数说明
* `METHOD` HTTP协议支持的所有method。如：GET，POST。同一个PATH可以拥有多个不同的method。另外，express定义了一个特殊的method（`all`），表示所有的method。
* `PATH` URL中的PATH部分。
* `HANDLER` 当请求匹配到PATH和METHOD（即符合路由规则）时，执行的处理器（函数）。一个路由可以有一个或多个处理器。

##METHOD
示例1：同一个PATH可以拥有多个不同的METHOD。
```node
app.get("/hi", function(req, res) {
    res.send("hi, get");
});
app.post("/hi", function(req, res) {
    res.send("hi, post");
});
```

示例2：所有METHOD使用同一个处理器。
```node
app.all("/hello", function(req, res) {
    res.send("hello, all");
});
```

##PATH
路径可以是字符串，字符串模式或者正则表达式。
示例1：精确匹配
```node
app.get("/public/1", function(req, res) {
    res.send("hit path /public/1");
});
```

示例2：字符串模式匹配
```node
app.get("/public(123)?", function(req, res) {
    res.send("hit path " + req.path);
});
app.get("/go*1", function(req, res) {
    res.send("hit path " + req.path);
});
```
注：支持正则表达式中的匹配符(`?`, `*`, `+` 和`()`等)。

##HANDLER
示例1：一个PATH有多个处理器
```node
app.get("/multi", [multi1, multi2]);

function multi1(req, res, next) {
    console.log("handler 'multi1' process compleete");
    next();
}

function multi2(req, res, next) {
    console.log("handler 'multi2' process compleete");
    res.send("multi handler process complete");
}
```

#附录
* [源码](router.js)
