#功能描述
监控Node.js应用中代码的改动，自动重启应用。

#使用说明
##安装
在控制台执行命令：
```bash
npm install -g supervisor
```
输出类似如下信息：

>/devdata/nodejs/node-v4.3.1-linux-x64/bin/node-supervisor -> /devdata/nodejs/node-v4.3.1-linux-x64/lib/node_modules/supervisor/lib/cli-wrapper.js<br/>
>/devdata/nodejs/node-v4.3.1-linux-x64/bin/supervisor -> /devdata/nodejs/node-v4.3.1-linux-x64/lib/node_modules/supervisor/lib/cli-wrapper.js<br/>
>supervisor@0.9.1 /devdata/nodejs/node-v4.3.1-linux-x64/lib/node_modules/supervisor

##使用
1、启动应用。
```bash
supervisor ./express/helloexpress.js
```
控制台输出如下信息：
>Running node-supervisor with<br/>
>&nbsp;&nbsp;program './express/helloexpress.js'<br/>
>&nbsp;&nbsp;--watch '.'<br/>
>&nbsp;&nbsp;--extensions 'node,js'<br/>
>&nbsp;&nbsp;--exec 'node'<br/>
><br/>
>Starting child process with 'node ./express/helloexpress.js'<br/>
>Watching directory '/devdata/projects/open_source/mine/NodeDemo/src' for changes.<br/>
>Press rs for restarting the process.<br/>
>http server with express listen on 8000

2、修改代码。
修改代码并保存，可以看到`supervisor`监控到了代码的改动，立刻停止了应用的进程并重新启动。控制台输出如下信息：
>crashing child<br/>
>Starting child process with 'node ./express/helloexpress.js'<br/>
>http server with express listen on 8000

