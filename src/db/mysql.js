/**
 * MySQL操作数据库。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var express = require("express");
var port = 8000;
var mysql = require("mysql");
var mysqlConnParam = {
    "host" : "192.168.56.102",
    "port" : 19856,
    "user" : "nieyong",
    "password" : "nieyong",
    "database" : "test",
    "charset" : "UTF8MB4_GENERAL_CI"
};
var app = express();
app.get("/user", function(req, res) {
    queryUser(req, res, queryUser);
});
app.listen(port);
console.log("http server started, listen on port " + port);

function queryUser(req, res) {
    var conn = mysql.createConnection(mysqlConnParam);
    conn.connect(function(err) { // 连接
        if (err) {
            console.error("connect mysql fail", err);
            res.send([]);
        } else {
            console.log("connect mysql success");
            var sql = "select * from user";
            conn.query(sql, function(err, rows, fields) { // 执行SQL进行查询
                if (err) {
                    console.error("execute sql:" + sql + " fail", err);
                } else {
                    var data = new Array();
                    for ( var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        data[i] = {"id":row["id"], "name":row["name"], "birthday":row["birthday"], "memo":row["memo"]};
                    }
                    conn.end(); // 关闭连接
                    res.send(data); // 响应
                }
            }); // end of query
        }
    });
}
