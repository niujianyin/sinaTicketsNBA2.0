##https://www.zybuluo.com/njy/note/334659
# NBA智能平台

标签（空格分隔）： 新浪彩通

---

[TOC]

##项目： NBA智能平台

NBA智能平台 —— 持续赢利的神器

##代码地址
1. 前端代码在工程目录的 sinaTicketsNBA2.0() 下。

##前端自动化工具
1.使用 FIS3（v3.3.15版本，需要运行 node v4.2.5版本） 作为前端代码管理工具，主要功能包括合并文件、JS 压缩、CSS 压缩、LESS 处理、图片雪碧图自动合并等功能。FIS 配置文件在 fstar_mithril/fis-conf.js(fis-conf_3.js)。FIS3 使用文档，参考：http://fis.baidu.com/fis3/docs/beginning/intro.html。 
2. fis3安装和插件：
```
npm install -g fis3@3.3.15
npm install -g fis-parser-less
npm install -g fis3-postpackager-loader
根据提示安装缺少的插件
```
4.fis3常用命令：
```
cd ~/workspace/github/sinaTicketsNBA2.0
  
<!-- 启动本地服务 -->
sudo fis3 server start -p 15080 
<!-- 清除本地服务器内容 -->
sudo fis3 server clean 
<!-- 编译本地文件 -->
sudo fis3 release -w
<!-- 停止本地服务 -->
sudo fis3 server stop
```

##前端项目详情

```
project(sinaTicketsNBA2.0)
  ├─ htmls   (统一配置)  
  │  ├─ commonHead.html (头部文件) 
  │  ├─ footer.html (底部文件) 
  │  ├─ header.html (头部文件) 
  ├─ images   (图片)  
  │  ├─ more
  ├─ less   (less) 
  │  ├─ common.less
  │  │  └─ constant.less  (less变量)
  │  │  └─ reset.less  (初始化样式)
  │  │  └─ top.less  (顶部样式)
  │  │  └─ top_account.less  (顶部登录样式)
  │  │  └─ header + footer + container(公共样式)
  │  ├─ more
  ├─ scripts    (工程模块)
  │  ├─ lib     (基础模块)
  │  │  └─ doT.min.js  (doT模板)
  │  │  └─ echarts.min.js  (百度图表)
  │  │  └─ jquery-1.11.1.js  (jquery)
  │  │  └─ lib_sea.js  (代码集成)
  │  │  └─ lib_top.js  (代码集成)
  │  │  └─ outlogin_layer.js  (登录模块lib_top.js)
  │  │  └─ sea.js  (模块加载器lib_sea.js)
  │  │  └─ sea_config.js  (模块加载器初始配置lib_sea.js)
  │  │  └─ top.js  (顶通lib_top.js)
  │  │  └─ user_panel_new_version.js  (登录模块lib_top.js)
  │  │  └─ more
  │  ├─ common.js  (公共模块)
  │  ├─ outcome.js  (胜负预测)
  ├─ fis-conf.js    (fis3编译配置)
  ├─ index.html    (首页面)
  ├─ letpoints.html    (让分预测页面)
  ├─ orderservice.html    (订购服务页面)
  ├─ outcome.html    (胜负预测页面)
  ├─ size.html    (大小分预测页面)
  ├─ step.html    (忽略:一些快捷命令)
  ├─ unique.html    (智能特色页面)
  ...
```
###html文件
1.index.html 首页面
#####在html中嵌入统一头部资源
```
<link rel="import" href="htmls/commonHead.html?__inline">
```
#####引入公共样式
```
<link rel="stylesheet" href="less/common.less" type="text/css">
```
#####默认已选菜单idx
```
<script type="text/javascript">
    window.__navIdx = 0;
</script>
```
#####页面顶通和菜单导航
```
<link rel="import" href="htmls/header.html?__inline">
```
#####内容主体
```
<div id="container" style="height: 300px;"> </div>
```
#####底部信息+登录组件初始化+引入lib_top.js,lib_sea.js
```
<link rel="import" href="htmls/footer.html?__inline">
```
#####doT template(可选)
```
  <script src="scripts/lib/doT.min.js"></script>
  <script type="text/template" id="indexTmpl">
    <% if (it.length<=0) { %>
      <div class="aohItem">无</div>
    <% } else {
      for (var i = 0, l = it.length; i < l; i++) { 
        var hotel = it[i];
    %>
      <div class="aohItem">
        <% if (hotel.selected) { %>
          <div class="aohIcon aohIconSelect" data-hotelid=<%= hotel.id %>></div>
        <% } else { %>
          <div class="aohIconGray" data-hotelid=<%= hotel.id %>></div>
        <% } %>
        <%= hotel.name %>
        <span><%= hotel.salesPerson %></span>
      </div>
    <% }}%>
  </script>
  <!-- 
   * doT 调用
   * var tmpl = $('#indexTmpl').html();
   * var render = doT.template(tmpl);
   * var html = render(data);
   * $('#container').html(html);
   *
   -->
```
#####引入百度图表(可选)
```
<script type="text/javascript" src="scripts/lib/echarts.min.js"></script>
```

#####页面js调用初始化
```
  <script type="text/javascript">
  seajs.config({
    alias:{
      common:"./scripts/common.js"
    }
  });
  seajs.use(["common"]);
  </script>
```



###images
相关图片和雪碧图(图片会被发布为绝对路径)
```
.common-icon-search-city{
  width: 19px;
  height: 20px;
  background: url(../images/searchIconCity@2x.png?__sprite) no-repeat;
}
```
###Less
样式文件才用less  发布为css
```
@import url('./constant.less');
```
通过@import 集成为  common.less 和 app.less













