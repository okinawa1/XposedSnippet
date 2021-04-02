有些无法root的环境下，我们需要把frida gadget注入到apk中

使用objection自动完成frida gadget注入到apk中.
兼容性较差,不是很推荐.
但是一键式，很方便


pip3 install -U objection
objection patchapk -s yourapp.apk



手动完成frida gadget注入和调用.
1.apktool反编译apk

apktool d test.apk -o test
2.将对应版本的gadget拷贝到/lib没有了下.例如arm32的设备路径如下.

/lib/armeabi/libfrida-gadget.so
下载地址:https://github.com/frida/frida/releases/
3.smali注入加载library,选择application类或者Activity入口.

const-string v0, "frida-gadget" invoke-static {v0}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V
4.如果apk没有网络权限需要在配置清单中加入如下权限申明

<uses-permission android:name="android.permission.INTERNET" />
5.回编译apk

$ apktool b -o newtest.apk test/
6.重新签名安装运行.成功后启动app会有如下日志


Frida: Listening on TCP port 27042

作者：HAPPYers
链接：https://www.jianshu.com/p/d093393aa299
