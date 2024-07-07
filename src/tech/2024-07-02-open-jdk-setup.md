---
title: open jdk 配置方法
categories: java
---

## 前言

去年的时候，我在找一个免费开源的思维导图工具，好不容易找到一个"FreeMind"吧，结果他还需要安装java环境才能用。由于我是个业余程序员的缘故，我不想单独装jre，我想装jdk。我又顺便想起了官方的jdk好像有版权问题，所以出了个openjdk，上网一搜好像两者功能上没啥区别。得，就装他了。

## 正文

### 下载

首先是下载，我搜索了下，发现有两个网站可以下载 openjdk，一个是微软，另一个是红帽。然而在红帽这边下载是需要注册账号的，而微软那边则可以直接下载，所以我就下了[微软构建的版本](https://learn.microsoft.com/zh-cn/java/openjdk/download)。

下载完成后把他解压到一个特定的位置，这个位置有个特殊要求，就是他的路径只能包含英文

``` yml
正确路径: "E:\Program Files\jdk" # [!code ++]
错误路径: "E:\开发工具\jdk" # [!code --]
```

解压好之后请记住他的路径，以便于接下来的配置

### 配置

#### 环境变量

我又去搜索了下JDK的配置方法，发现主要来说就是坏境变量配置。这对于程序员来说应该算是基本功了，具体步骤如下

1. 打开开始菜单，在应用列表里面找到“设置”应用
2. 导航到 “系统--系统信息” 选项卡下
3. 点击 “高级系统设置” 链接
4. 点击 “环境变量” 按钮

然后在 “系统变量” 一栏中配置以下变量。简单来说就是无则新建、有则编辑

``` yml
JAVA_HOME: E:\Program Files\jdk  # jdk根目录
CLASSPATH: .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar  # 注意别漏了开头的“.;”
path: %JAVA_HOME%\bin
```

具体过程如下

1. 点击“新建”按钮
2. 变量名处填写： `JAVA_HOME`
3. 变量值处填写jdk根目录： `E:\Program Files\jdk`
4. 点击“确定”按钮

再以同样的方式新建 `CLASSPATH` 变量，这里要特别注意变量值开头的 `.;` 不可省略

接着在变量列表里找到 `path` 变量，选中后点击“编辑”按钮。然后再点击“新建”按钮，将变量值 `%JAVA_HOME%\bin` 粘贴进去，再点击“确定”按钮

到此坏境变量就配置好了，我们可以验证一下是否配置成功，步骤如下

1. 右击开始按钮，再点击“终端”或者“PowerShell”来打开命令行
2. 输入 `java --version` 并按下回车

如果看到以下输出则代表配置成功

```
openjdk 21.0.3 2024-04-16 LTS
OpenJDK Runtime Environment Microsoft-9388422 (build 21.0.3+9-LTS)
OpenJDK 64-Bit Server VM Microsoft-9388422 (build 21.0.3+9-LTS, mixed mode, sharing)
```

#### 注册表

虽然已经配置成功，可以进行敲代码以及运行和调试了，但是如果你这时打开本文开头提到的 FreeMind，则还是会提示需要 jre。很明显，我们好像还缺了点什么，索性就又去搜索了，还真找到了一篇[文章](https://blog.csdn.net/lituusliu/article/details/104560698)，说还要再加两个注册表才能运行。ok，那么就来添加吧

具体步骤如下：

1. 打开记事本
2. 粘贴并根据需要修改以下内容，这里需要注意他的路径分隔符是两个斜杠 `\\`  
```
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Runtime Environment]
[HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Runtime Environment\1.8]
"JavaHome"="E:\\Program Files\\jdk"
"RuntimeLib"="E:\\Program Files\\jdk\\bin\\server\\jvm.dll"
```
3. 按下 `ctrl + s` 执行保存操作
4. 将“文件类型”设置为所有文件
5. 随便起个文件名，并把后缀改为 `.reg` ，例：`jdk.reg`
6. 确定保存，再找到刚保存的文件，然后双击打开他，再点击 “是” 按钮即可导入成功

这时再打开 FreeMind 就可以正常使用了

## 番外

顺便说一下，这个freemind是我去年用的软件，由于这个软件似乎已经停止维护了，所以现在我已经不用了，已经换成 FreePlane 了