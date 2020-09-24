package com.example.myapplication;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import com.alibaba.android.dingtalk.userbase.model.LocalContactObject.LocalContactObject;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
//                        log(String.format("phoneNumber2(%d): %s", a++, spAll.get(name)));
                    }

                    try {


//                        final Class<?> bClass = cl.loadClass("kku"); // CommonContactDataSourceImpl.java
//                        final Class<?> bClass = cl.loadClass("kli"); // CommonContactDataSourceImpl.java
                        final Class<?> clzLocalContactAdapter = cl.loadClass("kgv"); // LocalContactAdapter.java
//                        final Class<?> bClass = cl.loadClass("kta"); // SimpleUserProfileObject.java
                        final Class<?> clzContactHelper = cl.loadClass("kjq"); // ContactHelper.java

                        final Class<?> clzLocalContactFragment = cl.loadClass("com.alibaba.android.user.contact.organization.localcontact.LocalContactFragment");
//                        final Class<?> bClass = cl.loadClass("com.alibaba.android.user.entry.LocalContactEntry");
//                        final Class<?> bClass = cl.loadClass("kaq"); // UserProfileImpl.java
                        final Class<?> clzArrayListAdapter = cl.loadClass("kzv"); // ArrayListAdapter.java
                        final Class<?> clzLocalContactViewHolder = cl.loadClass("kgz"); // LocalContactViewHolder.java


                        final HashMap<Class, String> map = new HashMap<Class, String>() {{
                            put(clzArrayListAdapter, "ArrayListAdapter");
                            put(clzLocalContactAdapter, "LocalContactAdapter");
                            put(clzContactHelper, "ContactHelper");
                            put(clzLocalContactFragment, "LocalContactFragment");
                            put(clzLocalContactViewHolder, "LocalContactViewHolder");
                        }};

                        final HashMap<Long, HashMap<String, Object>> map1 = new HashMap<Long, HashMap<String, Object>>();
                        final HashMap<Long, LocalContactObject> mapLocalContact = new HashMap<Long, LocalContactObject>();
                        final HashMap temp = new HashMap();
                        final Integer[] flag = new Integer[]{0};

                        for (final Class clzObj : new Class[]{
                                clzArrayListAdapter,
                                clzLocalContactAdapter,
//                                clzLocalContactViewHolder,
//                                clzLocalContactFragment
                        }) {
                            for (final Method m : clzObj.getMethods()) {

                                if (clzObj == clzArrayListAdapter && !m.getName().equals("a")) {
                                    continue;
                                }
                                try {
                                    XposedBridge.hookAllMethods(clzObj, m.getName(), new XC_MethodHook() {
                                        @Override
                                        protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                            super.afterHookedMethod(param);
                                            Gson gson = new Gson();

                                            if (map1.size() == 0 && clzObj == clzLocalContactAdapter) {
                                                Field g = clzLocalContactAdapter.getField("g");
                                                g.setAccessible(true);

                                                HashMap o = (HashMap) g.get(param.thisObject);
                                                if (o.size() < 100 || temp.size() > 0) {
                                                    return;
                                                }

                                                temp.putAll(o);
                                                log(String.format("LocalContactAdapter has %d", temp.size()));

                                                for (Object k : o.keySet()) {
                                                    Object row = o.get(k);
                                                    try {
                                                        row.getClass().getField("uid");
                                                        row.getClass().getField("nick");
                                                        HashMap<String, Object> fromJson = gson.fromJson(gson.toJson(row),
                                                                new TypeToken<HashMap<String, Object>>() {
                                                                }.getType());
                                                        Double uid = (Double) fromJson.get("uid");
                                                        if (mapLocalContact.containsKey(uid)) {
                                                            LocalContactObject contact = mapLocalContact.get(uid);
                                                            if (!fromJson.containsKey("phoneNumber")) {
                                                                fromJson.put("name", contact.getName());
                                                                fromJson.put("phoneNumber", contact.getPhoneNumber());
                                                                fromJson.put("unitePhone", contact.getUnitePhone());
                                                                printItem(ctx, fromJson);
                                                            }
                                                        }
                                                        map1.put(uid.longValue(), fromJson);
                                                    } catch (Exception e) {
                                                        log("error: " + e.toString());
                                                    }
                                                }

                                                String c = "";
                                                if (map1.size() != 0) {
                                                    c = new Gson().toJson(map1.values().toArray()[0]);
                                                    c += " ...";
                                                    flag[0] = flag[0] | 1;
                                                    if (flag[0] >= 3) {
                                                        printData(map1.values().toArray());
                                                    }
                                                }

                                                log(String.format("markMethodCalled: %s->%s",
                                                        clzObj.getSimpleName(),
                                                        m.getName()
                                                ));
                                            }

                                            if (clzObj == clzArrayListAdapter && param.args.length > 0 && param.args[0] instanceof List
                                            ) {
                                                List arg = (List) param.args[0]; // List<LocalContactObject>
                                                log(String.format("LocalContactObject has %d", arg.size()));
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

                                                log(String.format("markMethodCalled: %s->%s",
                                                        clzObj.getSimpleName(),
                                                        m.getName()
                                                ));
                                                if (mapLocalContact.size() > 0) {
                                                    Object demo = mapLocalContact.values().toArray()[
                                                            mapLocalContact.size() - 1
                                                            ];
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
                                        }
                                    });
                                } catch (Exception e) {
                                }
                            }
                        }


                        final List<Object> ret = new ArrayList();
                        final Class clzContactInterface = cl.loadClass("com.alibaba.android.user.impl.ContactInterfaceImpl");
                        for (final Method mn : clzContactInterface.getDeclaredMethods()) {
                            final Class<?>[] types = mn.getParameterTypes();
                            if (mn.toString().contains("long,enw") && types.length == 2) {

                                XposedHelpers.findAndHookMethod(clzContactInterface, mn.getName(),
                                        types[0],
                                        types[1],
                                        new XC_MethodHook() {
                                            @Override
                                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                                super.afterHookedMethod(param);
                                                log(String.format("findMethod: %s, %s", mn.toString(),
                                                        new Gson().toJson(new Object[]{
                                                                param.args[0],
                                                                1
                                                        })));

                                                log(String.format("analysis: %d, %d", map1.size(), mapLocalContact.size()));

                                                if (ret.size() < 3) {
                                                    ret.add(mn);
                                                    ret.add(param.thisObject);
                                                    ret.add(param.args[1]);


                                                    int n = 0;
                                                    for (Long uid : mapLocalContact.keySet()) {
                                                        if (n >= 5) {
                                                            break;
                                                        }
//                                                        if (uid > 0 && !map1.containsKey(uid)) {
                                                        if (uid > 0) {
                                                            n += 1;
                                                            mn.invoke(param.thisObject, uid, param.args[1]);
                                                            LocalContactObject localContactObject = mapLocalContact.get(uid);
                                                            log(String.format("mobileInfo: %d=%s name=%s", uid,
                                                                    localContactObject.getPhoneNumber(),
                                                                    localContactObject.getName()
                                                            ));
                                                        } else if (map1.containsKey(uid)) {
//                                                            log(String.format("tryCall: %d, %s", uid,
//                                                                    map1.get(uid).toString()));
                                                        }
                                                    }
                                                }


                                            }
                                        });
                            }
                        }
//                        XposedHelpers.findAndHookMethod(clzContactInterface, "a", new XC_MethodHook() {
//                            @Override
//                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                                super.afterHookedMethod(param);
//                                log(String.format(
//                                        "InterfaceImpl: %s, %s", param.getResult(), param.getResult().getClass()
//                                ));
//                                ret.add(param.getResult());
//                            }
//                        });

//                        Method a1 = clzContactInterface.getMethod("a");
//                        final Object invoke = a1.invoke(null);


                        Class clzSendFriend4 = cl.loadClass("com.alibaba.android.user.contact.activities.SendFriendRequestActivity$4");
                        XposedBridge.hookAllMethods(clzSendFriend4, "onDataReceived", new XC_MethodHook() {
                            @Override
                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                super.afterHookedMethod(param);

                                String cont = new Gson().toJson(param.args[0]);
                                log("onDataReceived: ", cont);

                            }
                        });


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
//                log("items: " + new Gson().toJson(row));
//                log("items: " + row.toString());
            }
        }
    }

    public void printItem(HashMap<String, Object> row) {
        if (row.containsKey("phoneNumber")) {
//            log(String.format("%s,%s,%s,%s,%s",
//                    "contactInfo",
//                    row.get("name"),
//                    row.get("nick"),
//                    row.get("phoneNumber"),
//                    row.get("unitePhone")
//            ));
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
