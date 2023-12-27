# 匿名函数
> 匿名函数，在 Kula 里被称为 `Func` 类型。    
> 在函数式编程中，一般被统称为 `lambda表达式`

## 什么是 匿名函数
匿名函数 也是 数据的一种。
* 通常的数据不同，匿名函数定义了一套 **对数据的操作** (可以理解为 *封装一块代码*)，即 **函数特性**。
* 和通常数据一致，匿名函数允许和数据一样 赋给变量，或作为参数传递。

## 匿名函数的格式
Kula 语言的函数格式比较繁琐
```
func ( [ <形参名称> : <形参类型> ] [,] ) : <返回值类型> { [<语句>] }
```
1. Kula 的匿名函数不能夹杂函数名，只能将函数赋值给变量。
2. Kula 对函数的形参是有类型约束的。
3. Kula 必须指定返回值名称，如无返回值，可用 `None`。

举个例子：
```kula
func(x:Num): None {
    Shell.print("x is ");
    Shell.println(x);
}
```
这个匿名函数会将输入的变量输出成 `x is 某某` 的形式。

## 函数的声明？
严格来说，Kula 没有 *声明函数* 这种操作。取而代之的是 **将匿名函数赋值给一个变量**。

我们使用刚才的函数作为例子：
```kula
foo := func(x: Num): None {
    Shell.print("x is ");
    Shell.println(x);
}
```

## 函数的调用
匿名函数调用和 内置函数调用的格式是一样的。
```kula
# 输出 x is 100
foo(100);       
```

## 变量作用域
Kula 语言中，变量的作用域仅由函数所影响。

Kula 语言的函数最多可以访问函数外的变量，而函数外部无法访问函数内部的变量。    
当命名冲突时，优先访问更里层的变量。

```kula
n := 0;
counter := func(): None {
    n = plus(n, 1);
    Shell.println(n);
};

counter();      # 1
counter();      # 2
counter();      # 3
counter();      # 4
counter();      # 5
```
这个例子生动的讲解了作用域的效果。    
即 函数内部可以访问到 `n`，而不会每次初始化一个新的 `n` 或产生访问错误。

这里建议回看 [寻址赋值/声明赋值](/zh_cn/1/03-structure?id=声明赋值) 部分

## Pipe 管道语法
Kula 语言在 *Pre-0.3.1* 以后的版本中添加了一个有趣的语法糖 `|` 管道操作符。

他允许 Kula 将嵌套函数转化为链式结构，来避免过深的嵌套格式。

```kula
"hello_world"|Shell.println();
# 等价于 Shell.println("hello_world");

map|Map.put("number", 100);
# 等价于 Map.put(map, "number", 100);

1|2|plus();
# 等价于 plus(1, 2);
```

## 来点儿狠的？
!> 以下内容建议有基础的同学酌情学习。 

> Kula 支持许多函数式编程的高级特性，经测试的有：
> + 递归
> + 闭包
> + 柯里化

### 递归
Kula 支持函数的递归。

递归，即是函数 **自己调用自己** 的一种编程方式。  
递归程序更符合人类的直觉，虽然实际上 Kula 并不能高效的处理递归程序(甚至尾递归)。  

但是请注意，递归需要正确的函数名称！  
*如果你编写递归程序后，递归函数名称对应的内容被改变了，那么程序将出现不可预料的状况。*

本例是一个递归计算斐波那契数列的程序。
```kula
fib := func(x: Num): Num {
    if ( or(equal(x, 0), equal(x, 1)) ) {
        return 1;
    }
    return plus(fib(minus(x, 1)), fib(minus(x, 2)));
};

println(fib(9));       # 55
```

### 闭包
闭包是一个较为复杂的情况。

由于变量作用域的原因，内部可以访问到外部。所以我们可以利用函数封装一小块 *环境*，来同时实现变量的复用和封闭。

我们举例说明。
```kula
make_counter := func(): Func {
    n := 0;
    return func(): None {
        n = plus(n, 1);
        Shell.println(n);
    };
};

c := make_counter();

c();        # 1
c();        # 2
c();        # 3
```

当我们调用 `make_counter` 时，我们实际上创造了一个包裹了 `n` 的函数环境，并且将操作 `n` 的唯一接口作为函数返回了出来。  
之后，我们便可以通过返回出来的新函数操作 `n`。

> 事实上，虽然闭包代码较为复杂，但理解闭包是精通所有函数式语言的必经之路。同时，Kula标准库里也会有大量的对象化数据容器基于闭包实现。

### 柯里化
柯里化是一种函数级的封装思想。    
表现为将函数转化形式，将 `<函数名>([参数][,])` 的形式转化成 `<函数名>[(<参数>)]` 的形式。

举例说明：
```kula
curryPlus := func(x: Num): Func {
    return func(y: Num): Num {
        return plus(x, y);
    };
};

println( curryPlus(100)(2) );       # 102
```

实现的思想就是 **将剩余参数传入当前函数的返回函数内**。不难理解，但是未必能善用。

> 工程代码中，未必需要特地如此做，但需要理解柯里化语法存在的意义和理由。