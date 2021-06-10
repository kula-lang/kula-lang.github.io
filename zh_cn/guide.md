# 入门
> 这一章节让你看看热闹，基本上没啥干货儿。

## 用起来吧！
作为解释型语言，Kula 支持 REPL交互模式 和 脚本模式 两种使用方案

```shell
$ kula      # 直接在控制台中打开 REPL 
```
或者
```shell
$ kula ./hello.kula     # 单一参数，使用Release脚本模式，打开该路径下的 hello.kula 文件
```
或者
```shell
$ kula ./hello.kula --debug     # 两个参数，使用Debug脚本模式打开
```

> 本教程将以 `Release脚本模式` 为主要方式

## 第一行代码
```kula
println("hello_world");
```

`hello_world` 是编程语言的入门仪式。这一行代码会在控制台上输出这个字符串。
