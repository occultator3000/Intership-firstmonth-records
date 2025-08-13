#### kotlin语法基础

[kotlin教程](https://www.runoob.com/kotlin/kotlin-basic-syntax.html)

基础语法：

函数返回值：

~~~kotlin
public fun sum(a: Int, b: Int): Int = a + b   // public 方法则必须明确写出返回类型

// 如果是返回 Unit类型，则可以省略(对于public方法也是这样)：
public fun printSum(a: Int, b: Int) { 
    print(a + b)
}
~~~

可变长参数函数：用 **vararg** 关键字进行标识

~~~kotlin
fun vars(vararg v:Int){
    for(vt in v){
        print(vt)
    }
}

// 测试
fun main(args: Array<String>) {
    vars(1,2,3,4,5)  // 输出12345
}
~~~

NULL检查机制:对于声明可为空的参数，在使用时要进行空判断处理，有两种处理方式，字段后加!!像Java一样抛出空异常，另一种字段后加?可不做处理返回值为 **null** 或配合 **?:** 做空判断处理

~~~kotlin
//类型后面加?表示可为空
var age: String? = "23" 
//抛出空指针异常
val ages = age!!.toInt()
//不做处理返回 null
val ages1 = age?.toInt()
//age为空返回-1
val ages2 = age?.toInt() ?: -1

~~~

类型检测及自动类型转换:可以使用 **is** 运算符检测一个对象是否是指定类型的实例(类似于 Java 中的 instanceof 关键字)。

~~~kotlin
fun getStringLength(obj: Any): Int? {
  if (obj is String) {
    // 做过类型判断以后，obj会被系统自动转换为String类型
    return obj.length 
  }
}
~~~

区间：

~~~kotlin
for (i in 1..4) print(i) // 输出“1234”

for (i in 4..1) print(i) // 什么都不输出

if (i in 1..10) { // 等同于 1 <= i && i <= 10
    println(i)
}

// 使用 step 指定步长
for (i in 1..4 step 2) print(i) // 输出“13”

for (i in 4 downTo 1 step 2) print(i) // 输出“42”


// 使用 until 函数排除结束元素
for (i in 1 until 10) {   // i in [1, 10) 排除了 10
     println(i)
}
~~~

Val：不可变变量，声明时如果不初始化，需要定义类型

var：可变变量

Lambda 

~~~kotlin
val sumLambda: (Int, Int) -> Int = {x,y -> x+y}
println(sumLambda(1,2))  // 输出 3
~~~

字符串模板:

~~~kotlin
$ 表示一个变量名或者变量值
$varName 表示变量值
${varName.fun()} 表示变量的方法返回值:
~~~

String 可以通过 trimMargin() 方法来删除多余的空白。

~~~kotlin
fun main(args: Array<String>) {
    val text = """
    |多行字符串
    |菜鸟教程
    |多行字符串
    |Runoob
    """.trimMargin()
    println(text)    // 前置空格删除了
}
~~~

原生字符串和转义字符串内部都支持模板。 如果你需要在原生字符串中表示字面值 $ 字符（它不支持反斜杠转义），你可以用下列语法：

~~~kotlin
fun main(args: Array<String>) {
    val price = """
    ${'$'}9.99
    """
    println(price)  // 求值结果为 $9.99
}
~~~

抽象类

~~~kotlin
open class Animal {
    open fun speak() {
        println("Some sound")
    }
}

abstract class Dog : Animal() {
    override abstract fun speak()
}

class Bulldog : Dog() {
    override fun speak() {
        println("Woof!")
    }
}
~~~

内部类

~~~kotlin
class Outer {
    private val bar: Int = 1
    var v = "成员属性"
    /**嵌套内部类**/
    inner class Inner {
        fun foo() = bar  // 访问外部类成员
        fun innerTest() {
            var o = this@Outer //获取外部类的成员变量
            println("内部类可以引用外部类的成员，例如：" + o.v)
        }
    }
}

fun main(args: Array<String>) {
    val demo = Outer().Inner().foo()
    println(demo) //   1
    val demo2 = Outer().Inner().innerTest()   
    println(demo2)   // 内部类可以引用外部类的成员，例如：成员属性
}
~~~

匿名内部类：

~~~kotlin
class Test {
    var v = "成员属性"

    fun setInterFace(test: TestInterFace) {
        test.test()
    }
}

/**
 * 定义接口
 */
interface TestInterFace {
    fun test()
}

fun main(args: Array<String>) {
    var test = Test()

    /**
     * 采用对象表达式来创建接口对象，即匿名内部类的实例。
     */
    test.setInterFace(object : TestInterFace {
        override fun test() {
            println("对象表达式创建匿名内部类的实例")
        }
    })
}
~~~

使用：比如点击事件回掉

~~~kotlin
button.setOnClickListener(object : View.OnClickListener {
    override fun onClick(v: View?) {
        println("点击事件")
    }
})
~~~

类的修饰符包括 classModifier 和_accessModifier_:

- classModifier: 类属性修饰符，标示类本身特性。

  ```
  abstract    // 抽象类  
  final       // 类不可继承，默认属性
  enum        // 枚举类
  open        // 类可继承，类默认是final的
  annotation  // 注解类
  ```

- accessModifier: 访问权限修饰符

  ```
  private    // 仅在同一个文件中可见
  protected  // 同一个文件中或子类可见
  public     // 所有调用的地方都可见
  internal   // 同一个模块中可见
  ```

🔧 Android 中常见注解示例 annotation 

| 注解                             | 作用                          |
| -------------------------------- | ----------------------------- |
| `@Override`                      | 表示方法是重写父类/接口的方法 |
| `@Inject`                        | 用于依赖注入                  |
| `@SerializedName("json_key")`    | Gson 序列化字段映射           |
| `@NonNull` / `@Nullable`         | 提示某字段是否允许为 null     |
| `@GET("/api")` / `@POST("/api")` | Retrofit 网络请求注解         |
| `@BindView(R.id.xxx)`            | ButterKnife 绑定控件          |

 示例一：自定义注解 + 反射读取

✅ 1. 定义一个注解类

```kotlin
@Target(AnnotationTarget.CLASS) // 这个注解只能用于类上
@Retention(AnnotationRetention.RUNTIME) // 注解保留到运行时，可以反射获取
annotation class Info(val author: String, val version: Int)
```

✅ 2. 使用注解

```kotlin
@Info(author = "张三", version = 1)
class MyService
```

✅ 3. 通过反射读取注解信息

```kotlin
fun main() {
    val clazz = MyService::class
    val annotation = clazz.annotations.find { it is Info } as? Info
    if (annotation != null) {
        println("作者：${annotation.author}, 版本：${annotation.version}")
    }
}
```

**输出：**

```
作者：张三, 版本：1
```

📱 示例二：Android 中的常见注解（Retrofit）

✅ 定义接口 + 使用注解

```kotlin
interface ApiService {
    @GET("user/info")
    fun getUserInfo(): Call<User>

    @POST("user/update")
    fun updateUser(@Body user: User): Call<Response>
}
```

这些 `@GET`、`@POST`、`@Body` 其实都是注解类，用来告诉 **Retrofit 框架** 该方法和参数的意义。

Retrofit 内部会通过反射扫描这些注解并生成网络请求。

🧰 示例三：Gson 注解（数据解析）

✅ 使用注解类映射 JSON 字段

```kotlin
data class User(
    @SerializedName("user_name") val name: String,
    @SerializedName("user_age") val age: Int
)
```

JSON：

```json
{
  "user_name": "李雷",
  "user_age": 30
}
```

`@SerializedName("xxx")` 是 Gson 框架定义的注解类，用来告诉它“JSON 的字段名”和 Kotlin 字段的映射关系。

🔄 示例四：ButterKnife 注解（绑定控件）

```java
@BindView(R.id.tv_title)
TextView title;

@OnClick(R.id.btn_submit)
public void onSubmitClick() {
    // 处理点击事件
}
```

ButterKnife 库通过注解自动帮你绑定控件，不用 `findViewById()`，提高效率。

✅ 总结一下

| 注解用途   | 示例                     | 注解类                        |
| ---------- | ------------------------ | ----------------------------- |
| 定义元数据 | `@Info(...)`             | 自定义                        |
| 网络请求   | `@GET`, `@POST`, `@Body` | Retrofit                      |
| JSON映射   | `@SerializedName`        | Gson                          |
| UI绑定     | `@BindView`, `@OnClick`  | ButterKnife                   |
| 空值控制   | `@NonNull`, `@Nullable`  | JetBrains/Support annotations |

------

主类没有主构造函数，次构造函数使用super关键字初始化基类

~~~kotlin
/**用户基类**/
open class Person(name:String){
    /**次级构造函数**/
    constructor(name:String,age:Int):this(name){
        //初始化
        println("-------基类次级构造函数---------")
    }
}

/**子类继承 Person 类**/
class Student:Person{

    /**次级构造函数**/
    constructor(name:String,age:Int,no:String,score:Int):super(name,age){
        println("-------继承类次级构造函数---------")
        println("学生名： ${name}")
        println("年龄： ${age}")
        println("学生号： ${no}")
        println("成绩： ${score}")
    }
}

fun main(args: Array<String>) {
    var s =  Student("Runoob", 18, "S12345", 89)
}
~~~

如果有多个相同的方法（继承或者实现自其他类，如A、B类），则必须要重写该方法，使用 super 泛型去选择性地调用父类的实现。

```kotlin
open class A {
    open fun f () { print("A") }
    fun a() { print("a") }
}

interface B {
    fun f() { print("B") } //接口的成员变量默认是 open 的
    fun b() { print("b") }
}

class C() : A() , B{
    override fun f() {
        super<A>.f()//调用 A.f()
        super<B>.f()//调用 B.f()
    }
}

fun main(args: Array<String>) {
    val c =  C()
    c.f();

}
```

接口中的属性:接口中的属性只能是抽象的，不允许初始化值，接口不会保存属性值，实现接口时，必须重写属性：

~~~kotlin
interface MyInterface{
    var name:String //name 属性, 抽象的
}
 
class MyImpl:MyInterface{
    override var name: String = "runoob" //重写属性
}
~~~

扩展

~~~kotlin
fun receiverType.functionName(params){
    body
}

// 扩展函数 swap,调换不同位置的值
fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1]     //  this 对应该列表
    this[index1] = this[index2]
    this[index2] = tmp
}

fun main(args: Array<String>) {

    val l = mutableListOf(1, 2, 3)
    // 位置 0 和 2 的值做了互换
    l.swap(0, 2) // 'swap()' 函数内的 'this' 将指向 'l' 的值

    println(l.toString())
}

~~~

扩展函数是静态解析的，并不是接收者类型的虚拟成员，在调用扩展函数时，具体被调用的的是哪一个函数，由调用函数的的对象表达式来决定的，而不是动态的类型决定的:

```kotlin
open class C

class D: C()

fun C.foo() = "c"   // 扩展函数 foo

fun D.foo() = "d"   // 扩展函数 foo

fun printFoo(c: C) {
    println(c.foo())  // 类型是 C 类
}

fun main(arg:Array<String>){
    printFoo(D())
}
```

实例执行输出结果为：

```kotlin
c
```

若扩展函数和成员函数一致，则使用该函数时，会优先使用成员函数。

在扩展函数内， 可以通过 this 来判断接收者是否为 NULL,这样，即使接收者为 NULL,也可以调用扩展函数。

除了函数，Kotlin 也支持属性对属性进行扩展:

```kotlin
val <T> List<T>.lastIndex: Int
    get() = size - 1
 
```

扩展属性允许定义在类或者kotlin文件中，不允许定义在函数中。初始化属性因为属性没有后端字段（backing field），所以不允许被初始化，只能由显式提供的 getter/setter 定义。

```kotlin
val Foo.bar = 1 // 错误：扩展属性不能有初始化器
```

扩展属性只能被声明为 val.



密封类

密封类就是一种专门用来配合 when 语句使用的类，举个例子，假如在 Android 中我们有一个 view，我们现在想通过 when 语句设置针对 view 进行两种操作：显示和隐藏，那么就可以这样做：

```kotlin
sealed class UiOp {
    object Show: UiOp()
    object Hide: UiOp()
} 
fun execute(view: View, op: UiOp) = when (op) {
    UiOp.Show -> view.visibility = View.VISIBLE
    UiOp.Hide -> view.visibility = View.GONE
}
```

匿名对象可以用作只在本地和私有作用域中声明的类型。如果你使用匿名对象作为公有函数的 返回类型或者用作公有属性的类型，那么该函数或属性的实际类型 会是匿名对象声明的超类型，如果你没有声明任何超类型，就会是 Any。在匿名对象 中添加的成员将无法访问。

```kotlin
class C {
    // 私有函数，所以其返回类型是匿名对象类型
    private fun foo() = object {
        val x: String = "x"
    }

    // 公有函数，所以其返回类型是 Any
    fun publicFoo() = object {
        val x: String = "x"
    }

    fun bar() {
        val x1 = foo().x        // 没问题
        val x2 = publicFoo().x  // 错误：未能解析的引用“x”
    }
}
```

对象声明在另一个类的内部时，这个对象并不能通过外部类的实例访问到该对象，而只能通过类名来访问，同样该对象也不能直接访问到外部类的方法和变量。

```kotlin
class Site {
    var name = "菜鸟教程"
    object DeskTop{
        var url = "www.runoob.com"
        fun showName(){
            print{"desk legs $name"} // 错误，不能访问到外部类的方法和变量
        }
    }
}
fun main(args: Array<String>) {
    var site = Site()
    site.DeskTop.url // 错误，不能通过外部类的实例访问到该对象
    Site.DeskTop.url // 正确
}
```

伴生对象

类内部的对象声明可以用 companion 关键字标记，这样它就与外部类关联在一起，我们就可以直接通过外部类访问到对象的内部元素。

```kotlin
class MyClass {
    companion object Factory {
        fun create(): MyClass = MyClass()
    }
}

val instance = MyClass.create()   // 访问到对象的内部元素
```

我们可以省略掉该对象的对象名，然后使用 Companion 替代需要声明的对象名：

```kotlin
class MyClass {
    companion object {
    }
}

val x = MyClass.Companion
```

**注意：**一个类里面只能声明一个内部关联对象，即关键字 companion 只能使用一次。

委托：

