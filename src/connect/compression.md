#安装
1、全局安装
```bash
npm install -g compression
```

2、本地安装
```bash
npm install compression
```

#使用
```node
var compress = require("compression");
```

#API
##compression([options])
对响应body进行压缩处理，如果响应header中包括`Cache-Control`等[no-transform directive](https://tools.ietf.org/html/rfc7234#section-5.2.2.4)则不进行压缩处理。
###options参数说明
**chunkSize**

默认值：zlib.Z_DEFAULT_CHUNK 或 16384。

**filter**

决定是否对响应进行压缩的函数。调用方式：filter(req, res)，如果该函数返回true则进行压缩，返回false则不进行压缩。

默认的过滤函数是使用[compressible](https://www.npmjs.com/package/compressible)模块来判断`res.getHeader('Content-Type')`是否可压缩。

**level**

对响应进行压缩的等级定义，数字越大表示压缩率越高，执行压缩所需的时间也越长。等级定义如下：

* -1 默认压缩等级 (等同于`zlib.Z_DEFAULT_COMPRESSION`)。
* 0 不压缩 (等同于`zlib.Z_NO_COMPRESSION`)。
* 1 快速压缩 (等同于`zlib.Z_BEST_SPEED`).
* 2
* 3
* 4
* 5
* 6 (等同于`zlib.Z_DEFAULT_COMPRESSION`)。
* 7
* 8
* 9 最高级别压缩 (等同于`zlib.Z_BEST_COMPRESSION`).

注：上述的`zlib`需要额外定义，如：`zlib = require(\'zlib\')`。

**memLevel**

执行压缩时分配的内存数。

默认值：`zlib.Z_DEFAULT_MEMLEVEL`或 `8`。

参考文档[Node.js documentation](http://nodejs.org/api/zlib.html#zlib_memory_usage_tuning).

**strategy**

用于调整压缩算法。这个值仅仅影响压缩比率, 如果设置不正确也不会影响压缩执行的正确性。

* `zlib.Z_DEFAULT_STRATEGY` 用于普通数据。
* `zlib.Z_FILTERED` Use for data produced by a filter (or predictor). Filtered data consists mostly of small values with a somewhat random distribution. In this case, the compression algorithm is tuned to compress them better. The effect is to force more Huffman coding and less string matching; it is somewhat intermediate between zlib.Z_DEFAULT_STRATEGY and zlib.Z_HUFFMAN_ONLY.
* `zlib.Z_FIXED` Use to prevent the use of dynamic Huffman codes, allowing for a simpler decoder for special applications.
* `zlib.Z_HUFFMAN_ONLY` 仅使用霍夫曼算法 (no string match)。
* `zlib.Z_RLE` 设计的目的是和`zlib.Z_HUFFMAN_ONLY`一样快，但是可以给PNG图像提供最好的压缩效果。

#示例
[源码](compression.js)
```node
/**
 * 压缩处理。
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var compress = require("compression");
var serverStatic = require("serve-static");

var app = connect();
// 开启压缩
app.use(compress({filter:customCompress, level:9}));

// 开启静态文件服务
app.use(serverStatic("/home/nieyong/"));

// 启动服务
http.createServer(app).listen(port);
console.log("http server with compression started, listen port " + port);

function customCompress(request, response) {
    if (request.headers["no-compress"]) {
        return false;
    }
    
    return compress.filter(request, response);
}
```

未启用压缩模块时，响应header如下：
````http
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 27 Jun 2013 09:56:05 GMT
ETag: W/"55f-13f850faf08"
Content-Type: text/plain; charset=UTF-8
Content-Length: 1375
Date: Fri, 18 Mar 2016 07:53:26 GMT
Connection: keep-alive
```

启用压缩模块时，响应header如下：
```http
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 27 Jun 2013 09:56:05 GMT
ETag: W/"55f-13f850faf08"
Content-Type: text/plain; charset=UTF-8
Vary: Accept-Encoding
Content-Encoding: gzip
Date: Fri, 18 Mar 2016 09:38:54 GMT
Connection: keep-alive
Transfer-Encoding: chunked
```

比未启用压缩模块时，多了三个header：
```http
Vary: Accept-Encoding
Content-Encoding: gzip
Transfer-Encoding: chunked
```
