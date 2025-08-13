[官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)

### 总体理解

| 项目         | JavaScript（JS）       | TypeScript（TS）                      |
| ------------ | ---------------------- | ------------------------------------- |
| 类型系统     | 动态类型（运行时检查） | 静态类型（编译时检查）                |
| 错误发现     | 运行时报错             | 写代码时报错（类型推断 + 编辑器提示） |
| 代码提示     | 几乎没有               | 智能补全、跳转、重构能力强            |
| 项目可维护性 | 较差，易出错           | 更可靠，更适合大型项目                |

对比差异

| 章节内容                                  | JavaScript 支持 | TypeScript 支持 | 说明                                   |
| ----------------------------------------- | --------------- | --------------- | -------------------------------------- |
| 5. 联合类型（`string          | number`） | ❌ 不支持        | ✅ 支持          |                                        |
| 5. 类型别名（`type X = ...`）             | ❌ 不支持        | ✅ 支持          | JS 没有类型系统，TS 可封装复杂类型     |
| 6. 类型断言（`as T`）                     | ❌ 不支持        | ✅ 支持          | JS 无法断言类型，TS 可手动指定类型     |
| 7. 泛型（`<T>`）                          | ❌ 不支持        | ✅ 支持          | TS 支持泛型，JS 无法做到类型通用复用   |
| 8. 类的访问修饰符                         | ❌（ES 提案中）  | ✅ 支持          | TS 完整支持 `private/protected` 等特性 |
| 9. 工具类型（`Partial<T>`）               | ❌ 不支持        | ✅ 支持          | JS 完全没有，TS 内置工具可简化开发     |

### 1.变量声明与注释

当用`let`声明一个变量，它使用的是*词法作用域*或*块作用域*。 不同于使用 `var`声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或`for`循环之外是不能访问的。

js：

~~~javascript
let name = 'Alice';
let age = 25;
~~~

Ts:

~~~typescript
let name: string = 'Alice';
let age: number = 25;
~~~

- 类型显式：`name: string`

- 类型推断：即使不写，TS 也能自动推断

~~~typescript
let isOnline = true; // 推断为 boolean
~~~

### 2.函数：参数与返回值类型

js：

~~~javascript
function greet(name) {
  return 'Hello, ' + name;
}
~~~

ts:

~~~typescript
function greet(name: string): string {
  return 'Hello, ' + name;
}
~~~

参数和返回值必须明确类型，支持可选参数、默认参数

~~~typescript
function sayHi(name?: string) {
  return `Hi, ${name ?? 'Guest'}`;
}
~~~

**函数表达式**：

~~~typescript
//通过类型推断来声明
let sum = function(x:number,y:number):number{
    return x + y;
}

//完整的写法应该是这样
let sum1:(x:number,y:number) => number = function(x:number,y:number):number{
    return x + y;
}

//也可以通过接口来约束申明
interface ISum{
    (x:number,y:number):number
}
let sum2:ISum = function(x:number,y:number):number{
    return x + y;
}
~~~

**JS/TS，在全局或一个作用域中，编译时，变量和函数的定义会先执行，函数定义优先于变量定义。函数提升仅限于通过“函数声明”定义的方法，函数表达式定义的方法，不存在变量提升；变量提升仅限var定义的变量。let和const定义的变量，不存在变量提升。**

```
//==========JS==========

//全局中，虽然函数声明在后面，但先执行了
console.log(sum1(1,2));
function sum1(x,y){return x+y;}

//函数作用域中，函数声明也提前到了作用域的顶部
function f1(){
    console.log(sum2(1,2));
    function sum2(x,y){return x+y;}
}

//TS中有一样的表现
```

### 3.对象与接口（interface）

Js:

~~~javascript
const user = {
  name: 'Tom',
  age: 30,
};
~~~

Ts:(推荐定义接口)

~~~typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'Tom',
  age: 30,
};
~~~

- 接口 interface 用于规范对象结构

- 可选属性：`age?: number`

- 只读属性：`readonly id: string`

### 4.数组与元组

JS 写法：

```javascript
let nums = [1, 2, 3];
```

TS 写法：

```typescript
let nums: number[] = [1, 2, 3];
let names: Array<string> = ['a', 'b'];

// 元组：固定类型和长度
let tuple: [string, number] = ['Tom', 20];
```

精确控制每个元素的类型，元组常用于返回多值

### 5.联合类型与类型别名

t s:

~~~typescript
let id: string | number; // 可以是字符串或数字

type Status = 'success' | 'error' | 'loading';

let state: Status = 'success';
~~~

- **联合类型**（多个类型）：灵活应对参数多样性

- **类型别名**：简化复杂类型定义

要了解变量的类型， 使用 `typeof`：

| 类型      | 推断语句                           |
| :-------- | :--------------------------------- |
| string    | `typeof s === "string"`            |
| number    | `typeof n === "number"`            |
| boolean   | `typeof b === "boolean"`           |
| undefined | `typeof undefined === "undefined"` |
| function  | `typeof f === "function"`          |
| array     | `Array.isArray(a)`                 |

### 6.类型断言（Type Assertion）

t s:

~~~typescript
let value: any = 'hello';
let len = (value as string).length;
~~~

或：

~~~typescript
let len = (<string>value).length;
~~~

跳过推断，常用于类型不明确、但你清楚情况时

ts可以复制的过程中应该的类型，其在没有指定类型的时候为我们推论类型

~~~typescript
let str = "str"
//现在str便是string类型
str = 123//便会报错

//这样便是一个联合类型
let numberOrstring : number | string
//既可以
numberOrstring=123
//又可以
numberOrstring ="123"
//当其不确定是哪一个是只能访问共有的方法


//类型断言
function getLength(input : string | number):number{
 	//这样就是将他看成string才可以直接访问length，不可以断言为联合类型中不存在的类型
    const str = input as string
    if(str.length)
    {
    	return str.length
	}else{
     	const number = input as number;
        return number.toString().length
	}
}


//type guard
//ts在条件分支中会智能判断自己的类型
function getLength(input : string | number):number{
    if(typeof input === 'string')
    {
    	//这里便可以使用他的方法了，因为他已经确定了他是string类型
    	return str.length
	}else{
     	const number = input as number;
        return number.toString().length
	}
}

~~~

### 7.泛型（Generic）

Ts:(类似于c++的模板)

~~~typescript
function echo<T>(arg: T): T {
  return arg;
}

echo<number>(123);
echo<string>('hello');
~~~

泛型让函数、接口支持多种类型，保持类型一致性，提高复用性

**约束泛型**

```typescript
function echo WithArr<T>(agr :T):T{
    console.log(arg.length)
    return arg
}
//此时这样调用length属性便会报错因为他不确定T中是否有这样一个属性
//如果直接修改为T[]也只能使得数组这样一种类型可以使用这个函数
//其他的拥有length属性的对象依然不行
//所以我们就需要创建一种让包含这个属性的元素都可以使用这个函数的方法
interface IWithLength{
    length : number
}
//创建一个接口包含length
//通过extends实现符合这样约束的内容，让传入值满足一定的条件
function echoWithArr<T extends IWithLength>(agr :T):T{
    console.log(arg.length)
    return arg
}
console.log(echoWithArr("123123"))
console.log(echoWithArr([1,2,3]))
console.log(echoWithArr({length :10,width :10}))
//这样都是可以的
console.log(echoWithArr(123))
//这样便会报错
```

泛型在类中的使用

```kotlin
class Queue{
   	private data = [];
   	push(item){
       return this.data.push(item) 
   	}
   	pop(){
        return this.data.shift()
   	}
}
const queue = new Queue()
//在这里我们可以压入弹出任意类型的数据
queue.push(1)
queue.push("str")
//弹出时他便不会判断我们的类型导致错误发生
//通过泛型实现输入输出类型是一致的
class Queue<T>{
   	private data = [];
   	push(item:T){
       return this.data.push(item) 
   	}
   	pop():T{
        return this.data.shift()
   	}
}
```

接口中也可以配合泛型使用

```typescript
interface KeyPair<T,U>{
	key :T;
	value :U
}
let kp1:KeyPair<number , sting > = {key : 1 ,value :"string"}
let kp2:KeyPair<sting , number > = {value :"string" ,key : 1}
let arr : number[] = [1, 2, 3]
//调用array这个内置的接口，	泛型定义的数组，两者同义
let arr2 : Array<number> = [1, 2, 3]
```

### 8.类与访问修饰符

Ts:

~~~typescript
class Person {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}
~~~

- `public`：默认，外部可访问

- `private`：仅限类内访问

- `protected`：类及其子类可访问

- 支持抽象类、接口实现等面向对象特性

### 9.枚举

通常用于定义常量

~~~typescript
enum Direction{
   	Up,
   	//Up=10
   	//则后面便会自动递增
   	Down,
   	Left,
   	Right
}
//通过枚举定义上下左右
console.log(Direction.Up)
//0
console.log(Direction[0])
//"Up"
//由上可知枚举也有反向映射
//字符串枚举
enum Direction{
//将一个设为字符串其中每一项都要为字符串
   	Up = 'UP',
   	Down = 'DOWN',
   	Left = 'LEFT',
   	Right = 'RIGHT'
}
//通过这种方式可以简单的同api获取到的数据据进行比较
const value = "UP"
if(value ===Direction.Up)
{
    console.log("go up")
}
~~~

### 10.Utility Types

| 工具类型      | 含义                    |
| ------------- | ----------------------- |
| `Partial<T>`  | 将 T 的所有属性设为可选 |
| `Required<T>` | 将 T 的所有属性设为必填 |
| `Pick<T, K>`  | 取 T 的某些属性         |
| `Omit<T, K>`  | 排除 T 的某些属性       |
| `Readonly<T>` | 所有属性变为只读        |

Ts:

~~~typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, 'id' | 'name'>;
type OptionalUser = Partial<User>;
~~~

