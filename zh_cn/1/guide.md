# 入门
> 尝试将本章节的用例运行出来吧！

## 用起来吧！
作为解释型语言，Kula 支持 REPL交互模式 和 脚本模式 两种使用方案

```shell
$ kula      # 直接在控制台中打开 Kula 的 REPL 
```
或者
```shell
$ kula ./hello.kula     # 使用Release脚本模式，打开该路径下的 hello.kula 文件
```
或者
```shell
$ kula --debug ./hello.kula      # 使用Debug脚本模式打开 hello.kula
```

> 本教程将以 `Release脚本模式` 为主要方式讲解

## 第一行代码
```kula
println("hello_world");
```

`hello_world` 是编程语言的入门仪式。这一行代码会在控制台上输出这个字符串。

## Shell
> Shell 是程序员的常用工具，Kula 语言要想独立运行，也需要 Shell 的帮助

Shell 程序 会依次扫描输入的每一个字符串，每个字符串都会被当作一个参数处理。

Kula 的 Shell 工具接收两种参数：
+ 文件参数，让 Shell 程序根据路径找到待编译运行的文件路径，并开始之
+ 配置参数，改变 Shell 程序的参数
    + `--debug` 或 `--d` 设置编译器为 Debug 模式
    + `--release` 或 `--r` 设置编译器为 Release 模式

例如：
先用 release 模式加载已经写好的 `stack.kula` 库，再用 debug 模式测试用例代码 `test.kula`
```shell
$ kula -r stack.kula -d test.kula
```

## REPL
> REPL 是 Kula 语言的控制台交互模式

当我们配置好环境变量以后，在控制台输入
```shell
$ kula
```
即可直接进入 REPL 模式。

REPL 模式下，Kula 只能运行单行的代码。运行结束后，当前作用域内的变量会被保留下来。

### 命令
> REPL 模式下有许多内置的命令可以使用，他们可以实现一些调试性的功能

Kula REPL 中，命令都以 `#`号 开头。

| 命令       | 作用                                      |
| ---------- | ----------------------------------------- |
| `#exit`    | 退出 REPL                                 |
| `#gomo`    | 输出当前 Kula 版本信息                    |
| `#debug`   | 设置 REPL 为 DEBUG 模式                   |
| `#release` | 设置 REPL 为 RELEASE 模式                 |
| `#clear`   | 清空环境内已经保存的变量 (和虚拟机栈内存) |
