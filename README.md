# MKOnlinePlayer_Admin

## 程序简介

本程序为MKOnlinePlayer的后台程序，后端使用node.js开发，前端基于MKOnlinePlayer，后台页面使用bootstrap和jquery开发，可以实现在线修改网站信息、对歌单进行增删改查、修改播放器配置等功能，并且不需要数据库。
> 
> 本项目仅为个人学习参考，请勿用作商业用途，否则本人概不负责！
>

关于MKOnlinePlayer的详细解释请移步 [https://mkblog.cn/1060/](https://mkblog.cn/1060/) 。

## 页面截图

老规矩，先来几个截图（长图警告）。

**PC：**

![https://user-images.githubusercontent.com/35069089/48302402-67aaaa00-e537-11e8-993a-62da1cf47c8f.png](https://user-images.githubusercontent.com/35069089/48302402-67aaaa00-e537-11e8-993a-62da1cf47c8f.png)

**ipad：**

![https://user-images.githubusercontent.com/35069089/48302419-94f75800-e537-11e8-97b6-5cfcf45f5464.png](https://user-images.githubusercontent.com/35069089/48302419-94f75800-e537-11e8-97b6-5cfcf45f5464.png)

**phone：**

![https://user-images.githubusercontent.com/35069089/48302424-a476a100-e537-11e8-89c2-f8dfb65da97a.png](https://user-images.githubusercontent.com/35069089/48302424-a476a100-e537-11e8-89c2-f8dfb65da97a.png)

## 仓库地址

github：[https://github.com/mxue12138/MKOnlinePlayer_Admin](https://github.com/mxue12138/MKOnlinePlayer_Admin)

gogs：[https://gogs.itmxue.cn/mingxue/MKOnlinePlayer_Admin](https://gogs.itmxue.cn/mingxue/MKOnlinePlayer_Admin)

## 安装说明

**本教程以宝塔面板为例子进行讲解。**

1. 本项目依赖于node.js、pm2和MongoDB，需要先下载安装并配置环境变量，宝塔面板用户可以直接在软件管理下载“pm2”和MongoDB即可，安装完成以后进入下一步。
2. 下载项目代码，下载地址（[https://gogs.itmxue.cn/mingxue/MKOnlinePlayer_Admin/archive/master.zip](https://gogs.itmxue.cn/mingxue/MKOnlinePlayer_Admin/archive/master.zip) ）或（[https://github.com/mxue12138/MKOnlinePlayer_Admin/archive/master.zip](https://github.com/mxue12138/MKOnlinePlayer_Admin/archive/master.zip) ）。
3. 在服务器上新建一个网站，php版本默认或者选择纯静态都可以，然后选择反向代理，地址填``http://127.0.0.1:1128``。
4. 在服务器上任意一个文件夹内上传刚才下载的压缩包（宝塔用户建议上传到``/www/wwwroot/``下），然后解压。解压后会有一个``MKOnlinePlayer_Admin_master``文件夹，里面就是所有的代码了。
5. 然后将项目目录下的`` install``目录复制到MongoDB的bin目录里面，执行``.\mongorestore install``，数据库就导入了。
6. 然后使用SSH软件登录服务器（比如putty等），然后进入到你的项目目录下，比如宝塔用户就是``/www/wwwroot/``，那么执行命令`` cd /www/wwwroot/MKOnlinePlayer_Admin_master/``，就进入了程序目录，然后执行``chmod 755 -R ./*``。
7. 进入到程序目录后执行`` npm i && pm2 start pm2.json``，执行完毕访问之前新建的那个网站就可以了。
8. 后台地址是``你的域名/admin/``，默认账号密码都是admin，安装完成以后记得登录后台修改密码。

## 注意事项

1. 安装完成以后登录后台，修改api地址，不修改没办法使用，node.js无法运行php文件，只能用远程的接口。
2. 自定义歌单功能正在筹划当中，尽情期待。。。
3. 网站前台所有的文件都在项目目录下的public和view里面，如需修改的话按需修改即可。
4. 除修改密码配置文件和静态文件外，请勿随便修改其他文件，否则可能造成程序异常。
5. 如果安装过程或者运行中有任何问题欢迎添加qq告诉我，没必要的问题不会回答的。

## 演示地址

[https://music_admin.dns1.24mz.cn/](https://music_admin.dns1.24mz.cn/) ，账号密码都为admin，演示地址仅供参考，首页功能无法使用，无法修改配置信息（提示证书无效忽略即可）。

## 联系作者

有bug或者建议可以联系我QQ [2578096874](https://wpa.qq.com/msgrd?v=3&uin=2578096874&site=qq&menu=yes) 。

本人只是一个帝都的众多程序员中的一个，因为11.9号晚上有人问我要有没有这个程序的后台，我就连夜开发出来了这个，因为只花了一天一夜，所以并不算完美，使用时请记得每天备份。

## 挖坑待填

1. 添加自定义歌单功能（筹划中）。
2. 添加自动更新按钮（用户可选）。
3. 添加多用户功能，多个用户可以保存自己的歌单。
4. 缓存歌曲记录（node.js是i/o密集型应用，读取缓存文件经测试可达php的10倍左右，勿喷，仅供参考）。
5. 脱离php远程api（这个坑有点难）。