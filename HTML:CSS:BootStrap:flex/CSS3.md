# CSS3 新增特性
也是IE9+才支持\

<input type = "search" placeholder = "这也太搞了吧"></input>
## 新增选择器
1. 属性选择器\
   可以不借助类或者id选择

   ```css
    选择是input标签且具有value属性

    input[value]{
      color: pink;
    }

    选择type是text的input
    input[type = "text"]{

    }

    选择class以什么开头的元素
    选择class以icon开头/结尾的div元素

    div[class^="icon"]{

    }
    div[class$="icon"]{

    }
    ```
2. 结构伪类选择器

  |选择符| 简介|
  |---  | ---|
  |`E:first-child`|匹配父元素中的第一个元素E|
  |`E:last-child`|匹配父元素中的最后一个元素E|
  |`E:nth-child(even/odd/公式f(n))`|匹配父元素中的第n个元素E|
  |`E:first-of-type`|指定类型E的第一个|
  |`E:last-of-type`|指定类型E的最后一个|
  |`E:nth-of-type(n/even/odd/公式f(n))`|指定类型E的第n个|




3. 伪元素选择器

  利用CSS创建新标签元素，不用HTML标签

  |选择符| 简介|
  |---  | ---|
  |`::before`|在元素内部的前面插入|
  |`::after`|在元素内部的后面插入|

  注意：
  1. 语法: `element::before{}`
  2. 新创建的元素在文档树中是找不到的
  3. 创建的元素一定要有content属性
  4. 行内元素
  
  ```css
  div::before{
    content: "hello";
  }
  ```


  ## 2. CSS3 盒子模型
  
原来：加border， padding都会使得盒子变大，需要将原本的width减去这些东西。
现在CSS3就不会是的盒子变大。

Css3可以通过`box-sizing`指定盒模型
* `box-sizing: content-box`： 盒子大小为`width + padding + border`
* `box-sizing: border-box`：盒子大小为`width`


## 3. CSS3其他特性
### 1. 图片变模糊

```css
  img{
    filter: blur(5px)
    /*数值越大越模糊*/
  }
```
### 2. 计算盒子大小
要求子盒子宽度永远比父盒子小30像素。
```css
.son{
  width: calc(100% - 30px);
}
```
### 3. **CSS3 过渡（重要）**
谁在变化给谁加
```css
div{
  transition: 要过渡期的属性 花费时间(秒) 运动曲线 何时开始;
  transition: width 1s height 1s;
/*transition: all 1s(所有属性都变)
}
div:hover{
  width: 400px;
  height: 200px;
}
```

