package com.example.myapplication;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

import com.alibaba.android.dingtalk.userbase.model.LocalContactObject.LocalContactObject;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.security.PrivilegedAction;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;


public class MyApp implements IXposedHookLoadPackage {
    public static final String SP_NAME = "dd_contact";


    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        final String clzName = "com.alibaba.android.rimet.tools.ContactHelper";

        if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
            findAndHookMethod(Application.class, "attach", Context.class, new XC_MethodHook() {
                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);
                    if (param.args.length <= 0) {
                        return;
                    }
                    final Context ctx = (Context) param.args[0];
                    final ClassLoader cl = ctx.getClassLoader();
                    SharedPreferences sp = ctx.getSharedPreferences(SP_NAME, Context.MODE_PRIVATE);

                    Map<String, Object> spAll = (Map<String, Object>) sp.getAll();
                    int a = 0;
                    for (String name : spAll.keySet()) {
                        log(String.format("phoneNumber2(%d): %s", a++, spAll.get(name)));
                    }

                    try {
//                        final Class<?> bClass = cl.loadClass("kku"); // CommonContactDataSourceImpl.java
//                        final Class<?> bClass = cl.loadClass("kli"); // CommonContactDataSourceImpl.java
//                        final Class<?> clzLocalContactAdapter = cl.loadClass("kgv"); // LocalContactAdapter.java
//                        final Class<?> bClass = cl.loadClass("kta"); // SimpleUserProfileObject.java
//                        final Class<?> clzContactHelper = cl.loadClass("kjq"); // ContactHelper.java

                        final Class<?> clzLocalContactFragment = cl.loadClass("com.alibaba.android.user.contact.organization.localcontact.LocalContactFragment");
//                        final Class<?> bClass = cl.loadClass("com.alibaba.android.user.entry.LocalContactEntry");
//                        final Class<?> bClass = cl.loadClass("kaq"); // UserProfileImpl.java
                        final Class<?> clzArrayListAdapter = cl.loadClass("kzv"); // ArrayListAdapter.java
                        final Class<?> clzLocalContactViewHolder = cl.loadClass("kgz"); // LocalContactViewHolder.java

                        final HashMap<Class, String> map = new HashMap<Class, String>() {{
                            put(clzArrayListAdapter, "ArrayListAdapter");
//                            put(clzLocalContactAdapter, "LocalContactAdapter");

//                            put(clzContactHelper, "ContactHelper");
                            put(clzLocalContactFragment, "LocalContactFragment");
                            put(clzLocalContactViewHolder, "LocalContactViewHolder");
                        }};
                        final HashMap<Long, HashMap<String, Object>> map1 = new HashMap<Long, HashMap<String, Object>>();
                        final HashMap<Long, LocalContactObject> mapLocalContact = new HashMap<Long, LocalContactObject>();
                        final HashMap temp = new HashMap();
                        final Integer[] flag = new Integer[]{0};

                        for (final Class clzObj : new Class[]{
                                clzArrayListAdapter,
//                                clzLocalContactAdapter,

//                                clzLocalContactViewHolder,
//                                clzLocalContactFragment
                        }) {
                            for (final Method m : clzObj.getMethods()) {
//                                log(String.format("findMethod(%s):\t", map.get(clzObj)) + m.toString());

                                if (clzObj == clzArrayListAdapter && !m.getName().equals("a")) {
                                    continue;
                                }
                                try {
                                    XposedBridge.hookAllMethods(clzObj, m.getName(), new XC_MethodHook() {
                                        @Override
                                        protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                            super.afterHookedMethod(param);
                                            Gson gson = new Gson();

//                                            if (map1.size() == 0 && clzObj == clzLocalContactAdapter) {
//                                                Field g = clzLocalContactAdapter.getField("g");
//                                                g.setAccessible(true);
//                                                // Map<Long, >
//                                                HashMap o = (HashMap) g.get(param.thisObject);
//                                                if (o == null) {
//                                                    return;
//                                                }
//                                                if (o.size() < 100 || temp.size() > 0) {
//                                                    return;
//                                                }
//                                                temp.putAll(o);
//                                                for (Object k : o.keySet()) {
//                                                    Object row = o.get(k);
//                                                    try {
//                                                        row.getClass().getField("uid");
//                                                        row.getClass().getField("nick");
//                                                        HashMap<String, Object> fromJson = gson.fromJson(gson.toJson(row),
//                                                                new TypeToken<HashMap<String, Object>>() {
//                                                                }.getType());
//                                                        Double uid = (Double) fromJson.get("uid");
//                                                        if (mapLocalContact.containsKey(uid)) {
//                                                            LocalContactObject contact = mapLocalContact.get(uid);
//                                                            if (!fromJson.containsKey("phoneNumber")) {
//                                                                fromJson.put("name", contact.getName());
//                                                                fromJson.put("phoneNumber", contact.getPhoneNumber());
//                                                                fromJson.put("unitePhone", contact.getUnitePhone());
//                                                                printItem(ctx, fromJson);
//                                                            }
//                                                        }
//                                                        map1.put(uid.longValue(), fromJson);
//                                                    } catch (Exception e) {
//                                                        log("error: " + e.toString());
//                                                    }
//                                                }
//
//                                                String c = "";
//                                                if (map1.size() != 0) {
//                                                    c = new Gson().toJson(map1.values().toArray()[0]);
//                                                    c += " ...";
//                                                    flag[0] = flag[0] | 1;
//                                                    if (flag[0] >= 3) {
//                                                        printData(map1.values().toArray());
//                                                    }
//                                                }
//                                            }

                                            if (clzObj == clzArrayListAdapter && param.args.length > 0 && param.args[0] instanceof List
                                            ) {
                                                List arg = (List) param.args[0]; // List<LocalContactObject>
                                                int effect = 0;
                                                for (Object o : arg) {
                                                    try {
                                                        o.getClass().getField("phoneNumber");
                                                        LocalContactObject local = gson.fromJson(gson.toJson(o), LocalContactObject.class);
                                                        if (!mapLocalContact.containsKey(local.getUid())) {
                                                            mapLocalContact.put(local.getUid(), local);
                                                            effect = 1;
                                                        }

                                                        if (map1.containsKey(local.getUid())) {
                                                            HashMap<String, Object> fromJson = map1.get(local.getUid());
                                                            if (!fromJson.containsKey("phoneNumber")) {
                                                                fromJson.put("name", local.getName());
                                                                fromJson.put("phoneNumber", local.getPhoneNumber());
                                                                fromJson.put("unitePhone", local.getUnitePhone());
                                                                map1.put(local.getUid(), fromJson);
                                                                printItem(ctx, fromJson);
                                                            }
                                                        }
                                                    } catch (Exception e) {

                                                    }
                                                }

                                                if (effect == 0) {
                                                    return;
                                                }
                                                if (mapLocalContact.size() > 0) {
                                                    Object demo = mapLocalContact.values().toArray()[0];
                                                    log(String.format("Args(%s:%s): %s(%d)=%s ...",
                                                            map.get(clzObj),
                                                            m.getName(),
                                                            demo.getClass().getSimpleName(),
                                                            arg.size(),
                                                            new Gson().toJson(demo)
                                                    ));


                                                    flag[0] = flag[0] | 2;
                                                    if (flag[0] >= 3) {
                                                        printData(map1.values().toArray());
                                                    }
                                                }
                                            }

                                            List<Object> args = new ArrayList<>();
                                            args.addAll(Arrays.asList(param.args));

                                            List<Object> items = new ArrayList<>();
                                            items.add(param.getResult());


                                            String s = new Gson().toJson(args);
                                            String s1 = new Gson().toJson(items);
                                            log(String.format("desc(%s:%s):\t%s\t%s", map.get(clzObj), param.method.getName(), s, s1));
                                        }
                                    });
                                } catch (Exception e) {

                                }
                            }
                        }


//                        Class<?> eduClass = cl.loadClass("pmg");
//                        XposedBridge.hookAllMethods(eduClass, "invoke", new XC_MethodHook() {
//                            @Override
//                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                                super.afterHookedMethod(param);
//                                if (param.args.length != 3) {
//                                    return;
//                                }
//                                Method m2 = (Method) param.args[1];
//                                Object[] items = (Object[]) param.args[2];
//                                log(String.format("pmg\t%s: %s", m2.getName(), m2));
//                                log(String.format("pmg\t%s: %s", items, items.length));
//                            }
//                        });

                        Class<?> plvClass = cl.loadClass("plv"); // plv
                        XposedBridge.hookAllMethods(plvClass, "a", new XC_MethodHook() {
                            @Override
                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                super.afterHookedMethod(param);
                                Object result = param.getResult();
                                if (result != null && result.getClass().getName().contains("edm")) {
                                    log(String.format("cast2: [%s] %s",
                                            result.getClass(),
                                            new Gson().toJson(result)
                                    ));

                                    Class<?> pmh = cl.loadClass("pmh");
                                    Field declaredField = pmh.getDeclaredField("a");
                                    declaredField.setAccessible(true);
                                    ConcurrentHashMap<Class, Object> map = (ConcurrentHashMap) declaredField.get(pmh);

                                    for (Class clz : map.keySet()) {
                                        if (clz.getName().contains("UserMixIService")) {
                                            log(String.format("mapKey: %s=%s",
                                                    clz.getName(),
                                                    map.get(clz).getClass()
                                            ));

//                                            for (Method m : clz.getDeclaredMethods()) {
//                                                log(String.format("mapClass: %s", m));
//                                            }

                                            XposedBridge.hookAllMethods(
                                                    map.get(clz).getClass(),
                                                    "invoke",
                                                    new XC_MethodHook() {
                                                        @Override
                                                        protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                                            super.afterHookedMethod(param);
                                                            log(String.format("getUserProfileByUid", param.args));
                                                        }
                                                    }
                                            );

                                        }
                                    }

                                }
                            }
                        });

                        for (Method m : cl.loadClass("pmf").getDeclaredMethods()) {
                            log(String.format("pmfClass: %s", m));
                        }

                    } catch (Exception e) {
                        log(String.format("MyApp 寻找%s报错:\t%s", clzName, e.toString()));

                        e.printStackTrace();
                    }

                }
            });

        }

    }


    //    @Override
    public void handleLoadPackage1(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        final String clzName = "com.alibaba.android.rimet.tools.ContactHelper";

        if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
            findAndHookMethod(Application.class, "attach", Context.class, new XC_MethodHook() {
                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);
                    String clzName = "com.alibaba.android.rimet.tools.ContactHelper";

                    if (param.args.length <= 0) {
                        return;
                    }

                    ClassLoader cl = ((Context) param.args[0]).getClassLoader();
                    Class<?> hookclass = null;
                    clzName = "android.widget.BaseAdapter";
                    try {

                        final Class<?> aClass = cl.loadClass("com.alibaba.android.dingtalk.userbase.model.UserProfileObject");
                        final Class<?> bClass = cl.loadClass("kzv");
                        hookclass = cl.loadClass(clzName);
                        log(String.format("MyApp 寻找%s成功", bClass));


//                        XposedBridge.hookAllMethods(bClass, "getView", new XC_MethodHook() {
//                            @Override
//                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                                super.afterHookedMethod(param);
//                                log(param.getResult().toString());
//                            }
//                        });
//                        Constructor<?> declaredConstructor = hookclass.getDeclaredConstructor(Context.class);

//                        Object o = declaredConstructor.newInstance((Context) param.args[0]);
//                        log(String.format("MyApp 执行成功, %s", o));

//
                        for (Method m : bClass.getMethods()) {
//                            if ("String".equals(m.getReturnType().getSimpleName())) {
//                                log("findMethod:\t" + m.toString());
//                            }

                            if (m.getName().contains("get")) {
                                continue;
                            }

                            log("findMethod:\t" + m.toString());

                            XposedBridge.hookAllMethods(bClass, m.getName(), new XC_MethodHook() {
                                @Override
                                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                    super.afterHookedMethod(param);

                                    if (param.args.length == 0) {
                                        return;
                                    }
                                    String r;
                                    String argsType = "";
                                    int num = 0;
                                    try {
                                        r = new Gson().toJson(param.args[0]);
                                        argsType = param.args[0].getClass().toString();
                                        if (argsType.contains("List")) {
                                            num = ((List) param.args[0]).size();
                                        }
                                    } catch (Exception e) {
                                        r = e.toString();
                                    }
                                    log(String.format("CallMethod(%s:%s):\t%s(%d)=%s",
                                            bClass.getSimpleName(),
                                            param.method.getName(),
                                            argsType,
                                            num,
                                            r
                                    ));
                                }
                            });
                        }


//                        Method getContactAPI = hookclass.getMethod("c");
//                        Object invoke = getContactAPI.invoke(o);
//                        log(String.format("MyApp 执行成功, %s", invoke));

//                        for (final String name : new String[]{"notifyDataSetChanged"}) {
////                            findAndHookMethod(bClass, name, java.util.List.class, new XC_MethodHook() {
////
////                                @Override
////                                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
////                                    super.afterHookedMethod(param);
////
////                                    if (param.args.length > 0 && ((List) param.args[0]).size() > 0) {
////                                        for (Object o : (List) param.args[0]) {
////                                            log("method(%s:%s):\t%s", bClass.getSimpleName(), name, o.toString());
////                                        }
////                                    }
////                                }
////                            });
////
//                            log(String.format("hookMethod: %s, %s", hookclass, name));
//                            XposedBridge.hookAllMethods(hookclass, name, new XC_MethodHook() {
//
//                                @Override
//                                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                                    super.afterHookedMethod(param);
//                                    if (param.args.length > 0 && param.args[0].toString().contains("昵称")) {
//                                        String content = String.format("MyApp Method(%s):%s\t%s", name,
//                                                param.args[0].toString(),
//                                                param.getResult());
//                                        log(content);
//
//                                        // 函数调用完成之后打印堆栈调用的信息
//                                        // 方法一:
//                                        log("Dump Stack: ", "---------------start----------------");
//                                        Throwable ex = new Throwable();
//                                        StackTraceElement[] stackElements = ex.getStackTrace();
//                                        if (stackElements != null) {
//                                            for (int i = 0; i < stackElements.length; i++) {
//
//                                                log("Dump Stack" + i + ": ", stackElements[i].getClassName()
//                                                        + "----" + stackElements[i].getFileName()
//                                                        + "----" + stackElements[i].getMethodName()
//                                                        + "----" + stackElements[i].getLineNumber());
//                                            }
//                                        }
//                                        log("Dump Stack: ", "---------------over----------------");
//
//                                    }
//
//                                    // 函数调用完成之后打印堆栈调用的信息
//                                    // 方法一:
//                                    log("Dump Stack: ", "---------------start----------------");
//                                    Throwable ex = new Throwable();
//                                    StackTraceElement[] stackElements = ex.getStackTrace();
//                                    if (stackElements != null) {
//                                        for (int i = 0; i < stackElements.length; i++) {
//
//                                            log("Dump Stack" + i + ": ", stackElements[i].getClassName()
//                                                    + "----" + stackElements[i].getFileName()
//                                                    + "----" + stackElements[i].getMethodName()
//                                                    + "----" + stackElements[i].getLineNumber());
//                                        }
//                                    }
//                                    log("Dump Stack: ", "---------------over----------------");
//
//                                }
//                            });
////                            findAndHookMethod(String.class, name, String.class, Object.class, new XC_MethodHook() {
////
////                                @Override
////                                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
////                                    super.afterHookedMethod(param);
////                                    if (param.args[0].toString().contains("昵称")){
////                                        String content = String.format("MyApp Method(%s):%s\t%s", name,
////                                                param.args[0].toString(),
////                                                param.getResult());
////                                        log(content);
////                                    }
////
////                                }
////                            });
//
//                        }
                    } catch (Exception e) {
                        log(String.format("MyApp 寻找%s报错:\t%s", clzName, e.toString()));
                        e.printStackTrace();
                    }

                }
            });

        }


        /**
         if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
         //            findAndHookMethod("com.alibaba.android.rimet.tools.ContactHelper", "", "");
         findAndHookMethod(clzName, lpparam.classLoader, "queryFriendMobiles", new XC_MethodHook() {
        @Override protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
        super.beforeHookedMethod(param);

        XposedBridge.log(param.toString());
        }

        @Override protected void afterHookedMethod(MethodHookParam param) throws Throwable {
        super.afterHookedMethod(param);

        XposedBridge.log(param.toString());
        }
        });
         }

         if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
         //            findAndHookMethod("com.alibaba.android.rimet.tools.ContactHelper", "", "");
         findAndHookMethod(clzName, lpparam.classLoader, "mergeFromServer", new XC_MethodHook() {
        @Override protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
        super.beforeHookedMethod(param);

        XposedBridge.log(param.toString());
        }

        @Override protected void afterHookedMethod(XC_MethodHook.MethodHookParam param) throws Throwable {
        super.afterHookedMethod(param);

        XposedBridge.log(param.toString());
        }
        });
         }

         if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
         //            findAndHookMethod("com.alibaba.android.rimet.tools.ContactHelper", "", "");
         findAndHookMethod(clzName, lpparam.classLoader, "syncFriends", new XC_MethodHook() {
        @Override protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
        super.beforeHookedMethod(param);

        XposedBridge.log(param.toString());
        }

        @Override protected void afterHookedMethod(XC_MethodHook.MethodHookParam param) throws Throwable {
        super.afterHookedMethod(param);

        XposedBridge.log(param.toString());
        }
        });
         }
         **/

    }

    public void log(String... content) {

        StringBuffer buf = new StringBuffer();
        for (String c : content) {
            buf.append(c);
        }

        XposedBridge.log(String.format("%s\t%s", "MyApp", buf.toString()));
    }


    public void printData(Object[] items) {
        for (Object x : items) {
            HashMap<String, Object> row = (HashMap<String, Object>) x;
            if (row.containsKey("phoneNumber")) {
                log("items: " + new Gson().toJson(row));
                log("items: " + row.toString());
            }
        }
    }

    public void printItem(HashMap<String, Object> row) {
        if (row.containsKey("phoneNumber")) {
            log(String.format("%s,%s,%s,%s,%s",
                    "contactInfo",
                    row.get("name"),
                    row.get("nick"),
                    row.get("phoneNumber"),
                    row.get("unitePhone")
            ));
        }
    }

    public void printItem(Context ctx, HashMap<String, Object> row) {
        SharedPreferences ddContact = ctx.getSharedPreferences(SP_NAME, Context.MODE_PRIVATE);

        if (row.containsKey("phoneNumber")) {
            if (!ddContact.contains((String) row.get("phoneNumber"))) {
                SharedPreferences.Editor edit = ddContact.edit();
                edit.putString((String) row.get("phoneNumber"), new Gson().toJson(row));
                edit.commit();
                printItem(row);
            }
        }
    }
}
