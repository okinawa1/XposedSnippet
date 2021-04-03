if (Java.available) {
    Java.perform(function() {

        var dest_cls = ["RecyclerView"];
        Java.enumerateLoadedClassesSync().forEach(function(curClsName, index, array) {
            dest_cls.forEach(function(destCls) {
                // 按规则匹配是否需要 trace
                console.log(curClsName.getClass().getName(), destCls)
                if (curClsName.getClass().getName().contains(destCls) >= 0) {
                    // trace 核心方法

                    traceArtMethodsCore(curClsName);
                    return false; // end forEach
                }
            });
        });

        // Hook 核心逻辑
        function traceArtMethodsCore(clsname) {
            var cls = Java.use(clsname);
            // 枚举方法
            var methods = cls.class.getDeclaredMethods();
            methods.forEach(function(method) {
                // 枚举重载
                console.log(method);

                var methodOverloads = cls[methodName].overloads;
                methodOverloads.forEach(function(overload) {
                    // Hook
                    overload.implementation = function() {
                        // ... send entry msg
                        // 利用 js 参数特性 arguments ，调用原函数以适配所有 Hook 方法的传参
                        const retval = this[methodName].apply(this, arguments);
                        // ... send exit msg
                        return retval;
                    }
                })
            })
        }
    })
}