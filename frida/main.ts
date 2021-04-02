if (Java.available) {
    Java.perform(function () {
        var gson = Java.use("com.google.gson.Gson")
        var Exception = Java.use("java.lang.Exception")

        var pmf = Java.use("pmh")
        var s = Java.use("com.alibaba.android.user.idl.services.UserMixIService")
        var field = pmf.class.getDeclaredField("a")
        field.setAccessible(true);
        var map = Java.cast(field.get(pmf.class), Java.use("java.util.concurrent.ConcurrentHashMap"))
        var handler = map.get(s.class)
        var act = Java.cast(handler, s)

        var proxy = Java.use("java.lang.reflect.Proxy")
        proxy.invoke.implementation = function(a, b, c) {
            var r = this.invoke(a, b, c)
            if (b.getName().indexOf("getUserProfileByUid") >= 0) {
                console.log("Proxy@IdV2: ", b.getName(), 
                    gson.$new().toJson(c[0]),
                    c[1],
                    c[2],
                    r
                )
            } 
            return r
        }


        var kav21_1 = Java.use("kav$21$1")
        for (var i=0; i<kav21_1.a.overloads.length; i++) {
            kav21_1.a.overloads[i].implementation = function(p1, p2) {
                console.log("$21$1Called: ", p1, gson.$new().toJson(p2))
                throw Exception.$new("$21$1.a Called")
            }

        }

        // kav21_1.a.overload('com.alibaba.android.dingtalk.userbase.model.UserProfileObject').implementation = function(p1, p2, p3) {
        //     // console.log(gson.$new().toJson(arguments[0]))
        //     var r = this.a.overload('com.alibaba.android.dingtalk.userbase.model.UserProfileObject').call(p1)
        //     console.log("kav21_1: ", 
        //         p1, p2, p3,
        //         gson.$new().toJson(r)
        //     )
        //     return r
        // }


        var seed;
        Java.choose("kav$21$1", {
            onMatch: function(t1) {
                console.log("$1find: ", t1)
                seed = t1
            },
            onComplete: function(c1) {
                // var r = act.getUserProfileByUid(Java.use("java.lang.Long").$new(1571601035), Java.use("kav$21").$new().a())
                // console.log("pmf .", r)
                console.log("pmf .")
            }
        })
    });
}