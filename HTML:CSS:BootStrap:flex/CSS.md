# CSS
## 1. CSS 盒子模型
边框(border)，内边距(padding)，外边距(margin)，内容（content）
## 1.1 border
### 1.1.1 border使用
border：粗细，样式，颜色
```css
border: border-width || border-style || border-color
border: 1px solid red;/*无先后顺序*/
border-top: 1px solid red;
```
边框样式的选项：
  |keyword|description|
  |---|---|
  |none|无
  |hidden|隐藏
  |dotted|点状
  |solid|实线
  |double|双实线
  |groove|3d凹槽
  ridge|菱形
  inset|3d凹边
  outset|3d凸边
  ### 1.1.2 表格单元格边框的合并
  合并相邻的边框使得不会叠加。
  ```css
  table, td, th{
    border: 1px solid pink;
    border-collapse: collapse;
  }
  ```
  ### 1.1.3 边框会影响盒子的实际大小
  需要`width - 2 * border`

  ## 1.2 padding
  ### 1.2.1
  内容和边框的距离
  ```css
  padding: 5px;/*上下左右5px*/
  padding: 5px 10px /*上下5px， 左右10px*/;
  padding: 5px 10px 20px/*上5px，左右10px，下20px*/;
  padding: 5px 10px 20px 30px/*上，右，下，左（顺时针）*/
  padding-top: 5px;

  ```
  ### 1.2.2 padding影响盒子大小
  如果盒子已经有了width和height，则会继续撑大。
  采取和border一样的策略。
  很多并排的盒子中，各个盒子中文字长度不同，可用padding来撑开盒子,改成inline block！


  ## 1.3 margin
  外边距
  ### 1.3.1
  ```css
  /*和padding一致*/
  margin-left: 5px;
  ```
  ### 1.3.2 利用margin使得居中对齐
  块级元素水平居中：
  1. 有宽度
  2. 左右margin: auto
  ```css
  width: 960px;
  margin: 0 auto;
  ```
  行内元素/行内块元素居中：父元素`text-align: center`

  ### 1.3.3 嵌套块元素margin塌陷
  两个嵌套关系的元素，父元素有上外边距，子元素也有上外边距，此时父元素会塌陷较大的外边距值。
  解决方案：
  1. 为父元素定义外边框 `border: 1px solid transparent`
  2. 为父元素定义内边距 `padding: 1px`
  3. 为父元素添加`overflow: hidden`

  ### 1.3.4 清除默认的外边距
  ```css
  *{
    margin: 0;
    padding: 0;
  }
  ```
___

## 2. Shadow
`shadow/text-shadow`
|value| description|
|--|--|
|`h-shadow`|水平阴影的位置|
|`v-shadow`|垂直阴影的位置|
|`blur`|模糊距离|
|`spread`|阴影尺寸|

___

## 3. float浮动
### 3.1
CSS传统布局方式：
1. 普通流（标准流）
   1. 块级元素独占一行
   2. 行内元素从左到右排列，遇到父元素自动换行
2. 浮动
3. 定位


浮动的需求：让多个`div`排在一行。
float属性用于创建浮动框，将其移动到一边，直到左边缘或有边缘触及包含快或另一个浮动框的边缘。
```css
float: none;
float: left;
float: right;
```
### 3.2浮动的特性
1. 浮动元素会脱离标准流，移动到指定位置（脱标）。**浮动的盒子不再保留原先的位置**（可能会产生叠加的效果）。
2. 如果多个盒子都设置了浮动，则会按照属性值一行内显示并且顶端对齐排列（没有缝隙）。
3. 任何元素都可以添加浮动，浮动元素具有行内块元素的特性。
   1. 可以设置宽度高度
   2. 如果不设置宽度，默认是内容宽度(inline-block)，而不是浏览器宽度（block）
  
浮动的两个注意点：
1. 先利用父元素（标准流）控制上下位置，再利用浮动来控制左右排列
2. 一个元素浮动了，理论上其余的兄弟元素也需要浮动
   1. 第一个盒子不浮动，第二个盒子浮动，第二个盒子不会压住第一个盒子，因为第一个盒子是标准流，把第一行已经占满了
   2. 第一个盒子浮动，第二个盒子不浮动，第一个盒子会压住第二个盒子
   
   ***只会影响后面的标准流***

### 3.3 清除浮动
有些情况下，父盒子的高度不能定死（由于有不确定的子盒子，需要用这些子盒子撑开）。
如果父盒子不加高度，而子盒子设为浮动的话，父盒子高度为0.

清除浮动的方法：
1. 隔墙法/额外标签法
   找到最后一个浮动的盒子，在他们之后写一个标签`<div></div>`，给它一个`clear: both`的属性
2. overflow方法
   给父元素加上`overflow: hidden`属性清除浮动

3. :after 伪元素法
   父元素加上clearfix属性，其写法：
   ```css
   .clearfix:after, .clearfix:after{
     content: "";
     clear: both;
     display:block;
     height: 0;
     visibility: hidden;
   }
   .clearfix:after{
     clear:both;
   }
   .clearfix{
     *zoom:1;
   }
   ```

___

## 4.定位
以下情况不能用标准流或浮动完成
1. 使某个元素可以自由的在一个盒子中自由移动位置，并压住其他盒子
2. 滚动窗口的时候，窗口固定在屏幕某个位置

### 1. 定位组成：
定位： 将盒子定在某个位置，摆放盒子

***定位= 定位模式+边偏移***
* 定位模式： 在文档中的定位方式
* 边偏移： 该元素的最终位置
  
  定位模式：
   
  边偏移：
  |key|description|
  |----|----|
  |top| 离上面|
  |bottom| 离下面|
  |left| 离左边|
  |right| 离右边|

1. 静态定位`static`
   
   默认定位，无定位（按标准流定位），没有边偏移
   ```css
   position: static
   ```

2. 相对单位`relative`
  相对于自己原来的位置，原来占有的位置**仍然保留**, 不脱标
  ```css
  position: relative;
  top: 100px;/*距离顶部移动100*/
  left: 100px;
  ```

3. 绝对定位`absolute`
   相对于祖先元素进行定位。相对于自己原来的位置，原来占有的位置**不保留**, 脱标
   ```css
   position: absolute;
   ```
标准选择：
* 若没有父亲，以浏览器为准对齐（document）.
* 有父亲，以最近以及带有定位（绝对or相对）的祖先元素为准。


4. "子绝父相"
  
   儿子的绝对定位：
   1. 不能浮动，因为如果有多个盒子，一定会对齐，难以布局
   2. 不能相对定位，因为相对定位会保留原位置

    父亲的相对定位:
    1. 不能浮动（无定位），因为儿子会向浏览器对齐
    2. 不能加绝对定位，因为绝对定位不占据位置，下面的盒子（标准流）会上来

5. 固定定位`fixed`
    ```css
    position: fixed
    ```
    以浏览器可视窗口为准
6. 粘性定位`sticky`
  相对定位和固定定位的结合
  ```css
  position: sticky
  ```
  以浏览器可视窗口为参照点移动元素（固定定位特点）
  粘性定位占有原来的位置（相对定位特点）必须添加left/top/right/bottom中的一个


7. 定位布局的叠放次序`z-index`
   数字多越大，越靠上
   ```css
   z-index: 1
   ```
   如果值相同，则按照书写的顺序


## 元素的显示与隐藏
### 1. display
  `display: none`
  ：隐藏该元素 ***（位置不保留）***

  `display: block`
  ：显示该元素

### 2. visibility
  |key|description|
  |---|---|
  |inherit|继承
  |hidden|隐藏 ***（位置保留）***
  |visible|可见|
  `visibility: hidden`

### 3. overflow
把多出来的部分隐藏
  |key|description|
  |---|---|
  |scroll|显示滚动条
  |hidden|隐藏 ***（位置保留）***
  |visible|可见|
  |auto|看情况是否显示滚动条