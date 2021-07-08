# 与 C# 交互
> Kula 语言 底层由 C# 写成，自然和 C# 语言拥有极好的契合度。    
> 本篇将详细讲解如何在 C# 中使用 Kula

## 在 C# 中 加载 Kula
> 在 C# 中使用 Kula 需要基于 `kula.dll` 中提供的开放类 `KulaEngine`

我们可以通过构造对象的方式来直接加载 Kula 引擎。
```csharp
KulaEngine engine = new KulaEngine();
```

Kula 引擎是一个状态机，其中包含了已经编译完成的代码块。

当我们想要运行代码时，我们需要首先编译目标代码：
```csharp
// 我们需要的参数有：目标代码，代码昵称，是否为Debug编译
engine.Compile("println(\"hello_world\");", "first-program", true);
```

这行代码会将目标代码编译，并储存在 `KulaEngine` 对象的 一个 `Dictionary<string, Func>` 中，索引即为代码昵称 `"first-program"`。

此后，如果我们想要运行代码，需要：
```csharp
// 参数有：代码昵称，是否为Debug运行
engine.Run("first-program", true);
```
即可。

如果我们想清除掉 KulaEngine 里已经存储的变量，需要使用 `Clear()` 函数。

## 扩展函数
> 扩展函数 是 C# 和 Kula 交互的最直接方式，他允许 Kula 调用 C# 底层代码

扩展函数基于底层的委托 `BuiltinFunc`。

当需要扩展函数时，我们需要实现这个委托，并将其写入 **`KulaEngine` 类的静态集合`ExtendFunc`中** ：
```csharp
KulaEngine.ExtendFunc["hello_world"] = (args, stack, engine) => { Console.WriteLine("hello_world"); };
```