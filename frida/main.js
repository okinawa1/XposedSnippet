if (Java.available) {
    // Java.perform(function() {
    //     Java.enumerateLoadedClasses({
    //         onMatch: function(clz) {
    //             console.log(clz)
    //         },
    //         onComplete: function() {

    //         }
    //     })
    // })

    Java.perform(function () {


//         Java.enumerateLoadedClasses({
//             onMatch: function(clz) {
//                if (clz.indexOf("org") > -1) {
//                var items = Java.use(clz).class.getDeclaredMethods();
//                 for (var nn=0;nn<items.length;nn++) {
//                    var node = items[nn]
//                    if (node.toString().indexOf("onDataReceive") > -1) {
//                    console.log(clz, node)
//                    }
//                 }
//                }
//             },
//             onComplete: function() {
//
//             }
//         })

        var g = Java.use("com.google.gson.Gson")
        var Exception = Java.use("java.lang.Exception")
        // Java.enumerateLoadedClasses({
        //     onMatch: function(clz) {
        //         // if (clz.getName()) {}
        //         console.log(clz.toString())
        //     },
        //     onComplete: function() {

        //     }
        // })

        var pmg = Java.use("pmg$a")
        pmg.on.implementation = function (c) {
            var typeResponse = Java.use("com.laiwang.protocol.core.Response")
            var n = Java.cast(c, typeResponse)
            // console.log("pmg$a_ ", g.$new().toJson(n.payload().toString()
            // Java.use("java.lang.String").valueOf()
            // ))
            this.on(c)
        }


        var p = Java.use("edu")
        Object.getOwnPropertyNames(Java.use('edu').__proto__).join('\n\t')
        p.decode.implementation = function (a, b) {
            var c = this.decode(a, b)
            console.log("edu,1", a, g.$new().toJson(this))
            return c
        }

        var pmg = Java.use("kaq")
        // console.log("pmf", mf)
        for (var i = 0; i < pmg.a.overloads; i++) {
            pmg.a.overloads[i].implementation = function (a, b) {
                // console.log("pmg.onSuccess", a, a.class)
                console.log("pmg.invoke", a, b)
                var s = this.invoke(a, b)
                return s
            }
        }

        var lcf = Java.use("com.alibaba.android.user.contact.organization.localcontact.LocalContactFragment$6")
        for (var i = 0; i < lcf.onDataReceived.overloads; i++) {
            pmg.onDataReceived.overloads[i].implementation = function (a, b) {
                console.log("lcf.invoke", a, b)
                var s = this.invoke(a, b)
                return s
            }
        }
        // Java.choose("edu", {
        //     onMatch: function(i) {
        //         console.log("m:edu", i)
        //     },
        //     onComplete: function() {
        //         console.log("m_:edu")
        //     }
        // })

        // for(var i=0;i < pmh.a.overloads; i++) {
        //     pmh.a.overloads[i].implementation = function () {
        //         console.log(arguments);
        //     }
        // }
        // var map = psl.class.getDeclaredField('a')
        // map.setAccessible(true);
        // // var m = Java.cast(pmh.b, Java.use('java.util.HashMap').class)
        // console.log("psl", psl, g.$new().toJson(psl.a))
        // var c = Java.use("java.lang.Class")

        // c.getAnnotation.implementation = function(n) {
        //     console.log("n", n)
        //     if (n.toString().indexOf("AppName") > 0) {
        //         throw Exception.$new('ah ha')
        //     } else if (n.toString().indexOf("UrlReplace") > 0) {
        //         console.log("this.b", this.b)
        //     }
        //     return this.getAnnotation(n)
        // }
        // var cii = Java.use("com.alibaba.android.user.impl.ContactInterfaceImpl")
        // console.log("cii", cii.$new().ad())
        // console.log("cii", cii.$new().a().overload().class)
        // console.log(cii.a.overloads)
        // cii.a.overload("long", "com.alibaba.wukong.Callback").implementation = function(a, b) {
        // console.log("a-com.alibaba.wukong.Callback", a, b.class.getName(), b.onDataReceived)
        // b.onDataReceived
        // b.onDataReceived.implementation = function(b1) {
        // console.log("onDataReceived", b1)
        // return this.onDataReceived(b1)
        // }
        // return this.a.overload("long", "com.alibaba.wukong.Callback").apply(this, Java.use('java.lang.Long').valueOf(612409796), b)
        // }

        // var uis = Java.use("com.alibaba.android.user.idl.services.UserIService")
        // var kav = Java.use("p000.RPCEfficiencyManager")

        // console.log("p000.RPCEfficiencyManager", kav)
        // for (var i; i < kav.a.overloads.length ; i ++) {
        //     kav.a.overloads[i].implementation = function (c) {
        //         console.log(c)
        //     }
        // }

        // Java.choose("pmg$b", {
        //     onMatch: function(i) {
        //         // console.log("m:pmg__", Java.cast(i.b, Java.use("java.lang.String")))
        //         console.log("m:pmg__", i.b)
        //     },
        //     onComplete: function() {
        //         console.log("m_:pmg")
        //     }
        // })
        // console.log("cii", g.$new().toJson(cii.$new().a(612409796, null, 1, 1, 1,1))) //mo42422a


        // var uio = Java.use("com.alibaba.android.dingtalk.userbase.model.UserIdentityObject")
        // var uio = Java.use("enw")
        // console.log("enw", uio)
        // uio.onDataReceived.implementation = function() {
        //     console.log("uid\t")
        // }

        // var doraemon = Java.use("com.alibaba.doraemon.Doraemon")
        // doraemon.$new().setDebugMode(true)
        // console.log(doraemon.getContext())
        // var uio = Java.use('com.alibaba.android.dingtalk.userbase.model.UserIdentityObject')
        // var up = Java.use('com.alibaba.android.dingtalk.userbase.model.UserProfileObject')
        // up.fromIDLModel.implementation = function (item) {
        //     console.log("upo: ", g.$new().toJson(item))

        //     return this.fromIDLModel(item)
        //     // var Exception = Java.use("java.lang.Exception")
        //     // throw Exception.$new("Oh new")
        // }

        // var kaq = Java.use('kaq')
        // console.log(kaq.$new().getClass().getMethods())

        // var uis = Java.use("com.alibaba.open.im.service.rpc.UserIService")
        // rpc.b.implementation = function(s) {
        //     // var Exception = Java.use("java.lang.Exception")
        //     // throw Exception.$new("Oh new")
        //     var r = this.b(s)
        //     console.log("kma: ", g.$new().toJson(s),  "|", r)
        //     return r
        // }
        // var ipc = Java.use('com.alibaba.android.dingtalkbase.bizframework.ipc.IpcResult')


        // console.log(ipc.class.getDeclaredMethods())
        // ipc.getValue.implementation = function() {
        //     var r = this.getValue()
        //     // throw Exception.$new("IpcResult err")

        //     console.log('gtValue', g.$new().toJson(r))
        //     return r
        // }

        // ipc.$init.overload('java.lang.Object', 'java.lang.Class').implementation = function(a, b) {
        // console.log(a, b)
        // throw Exception.$new("IpcResult init err")
        // return this.$init.overload('java.lang.Object', 'java.lang.Class').call(a, b)
        // }

        // var a = Java.use('com.alibaba.android.dingtalk.userbase.model.UserEmployeeInfoObject')

        // console.log(a, a.CREATOR)

        // a.$init.overload("android.os.Parcel").implementation = function(a) {
        // console.log(a)
        // throw Exception.$new("ABC")
        // }

        // var c1 = Java.use('UserEmployeeInfoObject.CREATOR')
        // console.log('c1 find:', c1.$new())

        // var dys = Java.use('dys')
        // // console.log('dys find:', dys.$new())

        // dys.c.implementation = function(a, b) {
        //     console.log(a, b)
        // }


        // Java.choose('dys', {
        // // Java.choose('com.alibaba.open.im.service.rpc.UserIService', {
        //     onMatch: function(that){
        //         var p = Java.use("java.lang.Long").valueOf(612409796)
        //         console.log(that.c(p))

        //         // var content = that.a(12333)
        //         // console.log(that.getClass())
        //         // console.log(content)

        //     },
        //     onComplete: function(){}
        // })
        // final List<UserIdentityObject> userIdentityObjectList = UserIdentityObject.getUserIdentityObjectList((List) obj);
    });

}