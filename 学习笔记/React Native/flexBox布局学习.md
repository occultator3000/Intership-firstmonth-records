### react native 布局FlexBox

#### **宽和高**

组件的高度和宽度决定了它在屏幕上的尺寸，也就是大小，react native中尺寸没有单位，它代表了设备独立像素

~~~javascript
<View style={ {width:100,height:100,margin:40,backgroundColor:'gray'}}>
        <Text style={ {fontSize:16,margin:20}}>尺寸</Text>
</View>
~~~

运行在**Android**上时View的长和宽被解释成：100dp 100dp,单位是dp，字体被解释成16sp, 单位是sp。

运行在**iOS**上时尺寸单位被解释称了pt，这些单位确保了布局在任何不同dpi的手机屏幕上显示不会发生改变

与Web CSSS上FlexBox的不同之处

- flexDirection: React Native中默认为`flexDirection:'column'`，在Web CSS中默认为`flex-direction:'row'`
- alignItems: React Native中默认为`alignItems:'stretch'`，在Web CSS中默认`align-items:'flex-start'`
- flex: 相比Web CSS的flex接受多参数，如:`flex: 2 2 10%;`，但在 React Native中flex只接受一个参数
- 不支持属性：align-content，flex-basis，order，flex-basis，flex-flow，flex-grow，flex-shrink



#### **Layout Props**

##### 1.**父视图属性(容器属性)**

~~~javascript
1.flexDirection enum('row', 'column','row-reverse','column-reverse')

2.flexWrap enum('wrap', 'nowrap')

3.justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')

4.alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
~~~

​	`flexWrap`属性定义了子元素在父视图内是否允许多行排列，默认为nowrap,元素只排列在一行上，可能导致溢出

​	`justifyContent`属性定义了浏览器如何分配顺着父容器主轴的弹性（flex）元素之间及其周围的空间，默认为flex-start

- flex-start(default) 行首对齐，同时所有后续的弹性元素与前一个对齐。
- flex-end 行尾对齐，其他元素将与后一个对齐。
- center 伸缩元素向每行中点排列
- space-between / space-around 

​         

<img src="/Users/pupu/Library/Application Support/typora-user-images/截屏2025-08-12 14.38.57.png" alt="截屏2025-08-12 14.38.57" style="zoom:50%;" />

`alignItems`属性以与justify-content相同的方式在侧轴方向上将当前行上的弹性元素对齐，默认为stretch。

center:元素在侧轴居中。如果子元素没有宽度（在 `flexDirection: 'column'` 下）或者高度（在 `flexDirection: 'row'` 下），它会用内容的大小进行居中。

如果子元素有明确的宽/高，就会以那个固定的尺寸在交叉轴中居中。

如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。

##### 2.**子视图属性**

~~~javascript
alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')

alignContent enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')

flex number
~~~

**alignSelf：**

- auto(default) 元素继承了它的父容器的 align-items 属性。如果没有父容器则为 "stretch"。
- `alignSelf` 会**覆盖**由父级设置的任何使用 `alignItems` 的选项。

**flex：**

- `flex: 1` 占满**剩余的**所有高度,父容器的空间 = 固定高度的子元素 + 弹性空间分配的子元素 flex 2 和 flex 3分别占父容器剩余空间的0.4和0.6（按比例）

- flex: 相比Web CSS的flex接受多参数，如:`flex: 2 2 10%;`，但在 React Native中flex只接受一个参数

**alignContent**

- 定义了沿**次轴**分布行的方式。只有在使用 `flexWrap` 将项目换行到多个行时才会生效

- 作用：当有多行（多条 flex line）时，控制这些行（整条行的集合）在交叉轴上的对齐方式和间距

##### 3.**除flex 外其他布局属性**

> 视图边框

- borderBottomWidth number 底部边框宽度
- borderLeftWidth number 左边框宽度
- borderRightWidth number 右边框宽度
- borderTopWidth number 顶部边框宽度
- borderWidth number 边框宽度
- border<Bottom|Left|Right|Top>Color 个方向边框的颜色
- borderColor 边框颜色

> 尺寸

- width number
- height number

> 外边距

- margin number 外边距
- marginBottom number 下外边距
- marginHorizontal number 左右外边距
- marginLeft number 左外边距
- marginRight number 右外边距
- marginTop number 上外边距
- marginVertical number 上下外边距

> 内边距

- padding number 内边距
- paddingBottom number 下内边距
- paddingHorizontal number 左右内边距
- paddingLeft number 做内边距
- paddingRight number 右内边距
- paddingTop number 上内边距
- paddingVertical number 上下内边距

> 边缘

- left number 属性规定元素的左边缘。该属性定义了定位元素左外边距边界与其包含块左边界之间的偏移。
- right number 属性规定元素的右边缘。该属性定义了定位元素右外边距边界与其包含块右边界之间的偏移
- top number 属性规定元素的顶部边缘。该属性定义了一个定位元素的上外边距边界与其包含块上边界之间的偏移。
- bottom number 属性规定元素的底部边缘。该属性定义了一个定位元素的下外边距边界与其包含块下边界之间的偏移。

> 定位(position)

position enum('absolute', 'relative')属性设置元素的定位方式，为将要定位的元素定义定位规则。

- absolute：生成绝对定位的元素，元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
- relative：生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。

