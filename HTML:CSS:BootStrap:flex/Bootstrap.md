# Bootstrap

## 快速开发
写页面的时候，不用从头写到尾，使用市场上有的工具快速完成页面布局

## Bootstrap前端开发框架
Bootstrap来自twitter，是基于html, CSS和js的框架。

[Reference Website](http://getbootstrap.com)
### 1. 优点：
  * 标准化的html+css编码规范
  * 提供了一套简介，直观，强悍的组件
  * 有自己的生态圈，不断的更新迭代

### 2. 步骤：
  1. 创建文件夹结构
  * css
   * images
   * index.html
   * bootstrap

  2. 创建html骨架
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!DOCTYPE html>
    <html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <!--[if lt IE 9]>
      <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>
    <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
  </body>
</html>
```

   3. 引入样式文件
```html
<!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```


 4. 使用方法\
将类名设置为对应bootstrap类名，就可以使用样式。注意，可以通过自己写的样式来覆盖原来的样式。

## 2. 布局容器
Bootstrap需要为页面内容和上恶化包裹一个`.container`容器，Bootstrap预先定义好了这个类。
1. Container 类
    * 响应式布局的容器： 固定宽度
    * 大屏（≥1200px） 宽度为1170px
    * 中屏（≥992px）宽度为970px
    * 小屏（≥768px）宽度为750px

2. Container-fluid类
   * 流式布局容器，百分百宽度
   * 占据全部viewport
   * 适合单独做移动端开发
  
## 3.删格系统(grid system)
1. 栅格化简介
   * 页面内容随着列宽的变化而自动适应
   * 将container平均分成12列
2. 栅格化选项
   * 每列有自己的选项（在何种情况下占何种宽度）
  
    |  | 超小屏幕 | 小屏幕 | 大屏幕| 超大屏幕|
    |---- | --- | ----------- | ---- | ----|
    |类前缀 | `.col-xs` | `.col-sm` | `.col-md` | `.col-lg`|
    | container 大小 | 100% | 750px |  970px| 1170px|
  
    ```html
    <body>
      <div class = "container">
        <div class = "row">
          <div class ="col-lg-3 col-md-4 col-sm-2">1</div>
        </div>
      </div>
    ```
3. 列嵌套
   * 在列中嵌套列
    ```html
    <body>
      <div class = "container">
        <div class = "row">
          <div class ="col-lg-3">
            <!-- 再加一个row ，抵消原来父元素的padding，且统一高度-->
            <div class = "row"> 
              <div class = "col-md-6"></div>
              <div class = "col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
    ```

4. 列偏移
   * 两列之间有很大的距离，中间一列空出来的效果
   * `.col-md-offset`

  
    ```html
    <body>
      <div class = "container">
        <div class = "row">
          <div class ="col-lg-4">1</div>
          <div class ="col-lg-4 col-md-offset-4">2</div>
          <!-- 各占四分，还剩四分 -->
        </div>
      </div>
    ```
5. 列排序
   * 需要交换列的顺序的情况
   * `col-md-push`,`col-md-pull`
  
    ```html
    <body>
      <div class = "container">
        <div class = "row">
          <div class ="col-lg-4 col-md-push-8">左侧</div>
          <div class ="col-lg-8 col-md-pull-4">右侧</div>
          <!-- 交换左右侧列 -->
          </div>
      </div>
    ```
6. 响应式工具
   * 在不同屏幕大小下，选择性的隐藏元素
  
    |  | 超小屏幕 | 小屏幕 | 大屏幕| 超大屏幕|
    |---- | --- | ----------- | ---- | ----|
    |`.hidden-xs`| 隐藏|  可见|  可见|  可见|
    |`.hidden-sm`| 可见|  隐藏|  可见|  可见|
    |`.hidden-md`|  可见|  可见|  隐藏|  可见|
    |`.hidden-lg`| 可见|  可见|  可见|  隐藏|
    | container 大小 | 100% | 750px |  970px| 1170px|