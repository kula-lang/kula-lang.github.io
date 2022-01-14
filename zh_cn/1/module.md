# 模块化
在 Pre-0.4 版本后，Kula 加入了模块语法。允许一个单文件使用其他文件所定义的内容。

## 语法
```kula
$import "<引用路径>"
```

注意：
> 1. `import`语句只能出现在文件的最顶端。
> 2. 引用多个外部文件时，每个`import`语句独占一行。且中间不能被注释、空行等内容隔断。
> 3. 路径需要使用正斜杠 `/` 指定，不考虑转义运算符。相对路径需要以斜杠开头。  

```kula
$import "/lib/list.kula"
$import "/lib/stack.kula"
```

## 作用
一般用于导入已经写好的库文件，如 *数据结构* 或 *接口声明* 等。