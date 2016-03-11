/**
 * 业务逻辑处理器。
 * @author NieYong<aofengblog@163.com>
 */

var fs = require("fs");
var fi = require("formidable");
var util = require("util");

var config = {
    "/" : index,
    "/upload" : upload
};

function index(request, response) {
    var fileData = fs.readFileSync("/devdata/projects/study/NodejsStudy/src/server/upload.html");
    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write(fileData.toString());
    response.end();
}

function upload(request, response) {
    var form = new fi.IncomingForm();
    form.encoding = "utf8";
    form.uploadDir = "/devdata/projects/study/NodejsStudy/src/server/upload";
    form.keepExtensions = true;
    form.maxFieldSize = 5 * 1024 * 1024;
    form.parse(request, function(err, fields, files) {
        if (err) {
            console.log(err);
            return;
        }
        showSummary(response, fields, files);
        
        function showSimple(response, fields, files) {
            response.writeHead(200, {
                "Content-Type" : "text/plain"
            });
            
            // 以JSON格式输出信息
            response.end(util.inspect({fields: fields, files: files}));
        } // end of simplePrint
        
        function showSummary(response, fields, files) {
            response.writeHead(200, {
                "Content-Type" : "text/plain"
            });
            
            // 历遍字段
            response.write("********** 字段列表 **********\n");
            for ( var fieldKey in fields) {
                response.write("字段" + fieldKey + " : " + fields[fieldKey]);
                response.write("\n");
            }
            response.write("\n");
            
            // 历遍文件
            response.write("********** 文件列表 **********\n");
            for ( var fileKey in files) {
                var file = files[fileKey];
                response.write("文件" + fileKey + " : " + util.inspect(file));
                response.write("\n\n");
            }
            response.end();
        } // end of iteratePrint
        
        function showImage(response, fields, files) {
            response.writeHead(200, {
                "Content-Type" : "image/png"
            });
            
            for ( var fileKey in files) {
                var file = files[fileKey];
                var fileData = fs.readFileSync(file.path);
                response.write(fileData);
            }
            response.end();
        } // end of showImage
    });
    
    return;
}

exports.config = config;
exports.index = index;
exports.upload = upload;
