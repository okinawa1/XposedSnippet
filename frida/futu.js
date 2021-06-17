if (Java.available) {
    //调用方法
    function printStack() {
        Java.perform(function() {
            var Exception = Java.use("java.lang.Exception");
            var ins = Exception.$new("Exception");
            var straces = ins.getStackTrace();
            if (straces != undefined && straces != null) {
                var strace = straces.toString();
                var replaceStr = strace.replace(/,/g, "\r\n");
                console.log("=============================Stack strat=======================");
                console.log(replaceStr);
                console.log("=============================Stack end=======================\r\n");
                Exception.$dispose();
            }
        });
    }


    //打印数据
    function printSmartOption(ag2) {
        Java.perform(function() {
            var b70 = Java.use("kcsdkint.b70");
            var y60 = b70.a()
            var x60 = y60.q(ag2.e());

            var localB = Java.use("cn.futu.quote.smartmonitor.b")
            var var1 = "";
            var1 = localB.d(ag2, true);

            var var2 = "";
            var2 = localB.e(ag2.d());
            // var y60 = b70.a.overloads[0].apply();
            // var q = y60.q.overloads[0];
            // var parshal = q.call(ag2.e());
            // console.log(x60.m(), "|", ag2.e(), "|", var1, ag2.d(), "|", var2, ag2.f());
            var1 = var1.replace("\n", ",")
            console.log(x60.m(), "\t", ag2.e(), "\t", var2, "\t", ag2.d(), "\t", var1, "\t", ag2.f());
        });
    }

    Java.perform(function() {
        var g = Java.use("kcsdkint.kg7")

        var dest_cls = ["RecyclerView"];
        // Java.enumerateLoadedClassesSync().forEach(function(curClsName, index, array) {
        //     try {
        //         if (curClsName && curClsName.index("Recycler") > -1) {
        //             console.log("clz: ", curClsName)
        //         }
        //     } catch (eee) {}

        // dest_cls.forEach(function(destCls) {
        //     // 按规则匹配是否需要 trace
        //     console.log(curClsName.getClass().getName(), destCls)
        //     if (curClsName.getClass().getName().contains(destCls) >= 0) {
        //         // trace 核心方法

        //         traceArtMethodsCore(curClsName);
        //         return false; // end forEach
        //     }
        // });
        // });

        // Hook 核心逻辑
        function traceArtMethodsCore(clsname, metName, argumentLength) {
            var cls = Java.use(clsname);
            // 枚举方法
            var methods = cls.class.getDeclaredMethods();
            methods.forEach(function(method) {
                // 枚举重载
                var methodName = method.getName()
                    // if (methodName != "postSingleEvent") {
                if (methodName != metName) {
                    return
                }
                var methodOverloads = cls[methodName].overloads;
                methodOverloads.forEach(function(overload) {
                    if (argumentLength === null) {
                        argumentLength = 0
                    } else if (argumentLength === -1) {

                    } else if (overload.argumentTypes.length !== argumentLength) {
                        return
                    }

                    console.log("find method:\t", method.getName(), overload.argumentTypes[0]);
                    // Hook
                    overload.implementation = function() {
                        // ... send entry msg
                        // 利用 js 参数特性 arguments ，调用原函数以适配所有 Hook 方法的传参
                        const retval = this[methodName].apply(this, arguments);
                        // ... send exit msg
                        try {
                            // console.log("call ", methodName, "retval\t", arguments[0].toString())
                            // console.log("call ", methodName, "retval\t", g.$new().u(arguments[0]))
                            var n = [methodName];
                            if (arguments.length === 1) {
                                var ag2 = arguments[0];
                                // n.push(arguments[0], retval.m());
                                // n.push(ag2, ag2.e(), ag2.d());
                                printSmartOption(ag2);
                                // printStack()
                            } else if (arguments.length === 2) {
                                n.push(arguments[0].class);
                                n.push(arguments[0].e());
                            } else if (arguments.length === 0) {
                                printStack()
                            }
                            // console.log("call ", n)
                        } catch (e) {
                            // console.log("call method:\t", e);
                        }
                        return retval;
                    }
                })
            })
        }

        // traceArtMethodsCore("android.support.v7.widget.RecyclerView")
        // traceArtMethodsCore("cn.futu.nnframework.widget.RecyclerWrapperAdapter")
        // traceArtMethodsCore("cn.futu.quote.discovery.widget.OpportunityHomeSmartStareWidget")

        // traceArtMethodsCore("cn.futu.component.event.EventBus", "safeRegister", 1)
        // traceArtMethodsCore("cn.futu.component.event.EventUtils", "safeRegister", 1)

        // traceArtMethodsCore("cn.futu.quote.discovery.widget.OpportunityHomeSmartStareWidget$b")
        // traceArtMethodsCore("kcsdkint.ag2", "a")
        // traceArtMethodsCore("kcsdkint.vg2", "d", 1)
        // traceArtMethodsCore("kcsdkint.vg2$a", "m", 1)
        // traceArtMethodsCore("kcsdkint.b70", "c", 0)
        // traceArtMethodsCore("kcsdkint.y60", "q", 1) interface ,no use

        // traceArtMethodsCore("kcsdkint.pi1", "q", 1) // // traceArtMethodsCore("kcsdkint.y60", "q", 1)
        // traceArtMethodsCore("kcsdkint.ti1", "f", 1)
        // traceArtMethodsCore("kcsdkint.x60", "m", 0)
        // traceArtMethodsCore("kcsdkint.ag2", "e", 0)
        // traceArtMethodsCore("kcsdkint.am2$a", "o", 1)

        // traceArtMethodsCore("cn.futu.quote.smartmonitor.view.a", "J")
        // traceArtMethodsCore("cn.futu.quote.smartmonitor.view.a$h", "a", 1)
        // traceArtMethodsCore("cn.futu.quote.smartmonitor.view.a", "S", 2)
        // traceArtMethodsCore("cn.futu.quote.smartmonitor.view.a", "h", 1)
        traceArtMethodsCore("cn.futu.quote.smartmonitor.view.MonitorFairyTabView", "q", 1)
            // traceArtMethodsCore("cn.futu.component.log.FtLog", "d", 2)

        // traceArtMethodsCore("android.widget.TextView", "setText", 1)
    })
}