package com.example.myapplication;

import android.app.Application;
import android.content.Context;
import android.telephony.TelephonyManager;
import com.google.gson.Gson;
import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import org.json.JSONObject;
import org.json.JSONStringer;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;


public class MyApp implements IXposedHookLoadPackage {


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

                    ClassLoader cl = ((Context) param.args[0]).getClassLoader();
                    try {

                        final Class<?> bClass = cl.loadClass("kjq");
//                        final Class<?> bClass = cl.loadClass("com.alibaba.android.user.contact.organization.localcontact.LocalContactFragment");
//                        final Class<?> bClass = cl.loadClass("com.alibaba.android.user.entry.LocalContactEntry");
//                        final Class<?> bClass = cl.loadClass("kaq");
//                        final Class<?> bClass = cl.loadClass("kzv");
                        log(String.format("MyApp 寻找%s成功", bClass));

                        for (Method m : bClass.getMethods()) {
//                            if ("String".equals(m.getReturnType().getSimpleName())) {
//                                log("findMethod:\t" + m.toString());
//                            }

                            if (m.getName().contains("get")) {
                                continue;
                            }
                            log("findMethod:\t" + m.toString());
                        }

                        XposedBridge.hookAllMethods(bClass, "b", new XC_MethodHook() {
                            @Override
                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                                super.afterHookedMethod(param);

                                if (param.args.length == 0) {
                                    return;
                                }

                                List<Object> items = new ArrayList<>();
                                if (param.args[0] instanceof List) {
                                    items = (List<Object>) param.args[0];
                                }

                                for (Object o : items) {
                                    String s = new Gson().toJson(o);
                                    log("output:\t" + s);
                                }
                            }
                        });
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
                                    try {
                                        r = new Gson().toJson(param.args[0]);
                                        argsType = param.args[0].getClass().toString();
                                    } catch (Exception e) {
                                        r = e.toString();
                                    }
                                    log(String.format("CallMethod(%s:%s):\t%s=%s",
                                            bClass.getSimpleName(),
                                            param.method.getName(),
                                            argsType,
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
}
