package com.example.myapplication;

import android.app.Application;
import android.content.Context;

import com.google.gson.Gson;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;


public class MyApp implements IXposedHookLoadPackage {
    public static final Integer DEBUG = 1;
    public static final String SP_NAME = "dd_contact";
    public static final String FLAG1566 = "Tue Apr 20 22:10:55 CST 2021";

    private List<ClassLoader> clList = new ArrayList<>();

    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        log(lpparam.packageName);
        if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
            log("Start: ", FLAG1566);

            findAndHookMethod(Application.class, "attach", Context.class, new XC_MethodHook() {
                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);

                    if (param.args.length <= 0) {
                        return;
                    }
                    final Context ctx = (Context) param.args[0];
                    final ClassLoader cl = ctx.getClassLoader();
                    clList.add(cl);

                    final Gson gson = new Gson();
                    try {
                        checkInit();
                    } catch (Exception e) {
                        log(String.format("MyApp 寻找%s报错:\t%s", "", e.toString()));
                    }
                }
            });
        }

    }

    public ClassLoader getClassLoader() {
        return clList.get(0);
    }

    public void checkInit() throws ClassNotFoundException {
        String clzName = "com.alibaba.android.user.contact.activities.SendFriendRequestActivity$4";
        Class<?> aClass = getClassLoader().loadClass(clzName);


        XposedBridge.hookAllMethods(getClassLoader().loadClass(
                "com.alibaba.android.user.contact.organization.localcontact.LocalContactActivity"),
                "onCreate",
                new XC_MethodHook() {

                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        super.afterHookedMethod(param);
                        Object obj = param.thisObject;
                        Field g = XposedHelpers.findField(obj.getClass(), "g");

                        log("LocalContactActivity.g", new Gson().toJson(g.get(obj)));

                    }
                });

        XposedBridge.hookAllConstructors(aClass, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                super.beforeHookedMethod(param);

                Object that = param.thisObject;

                if (param.args.length < 1) {
                    return;
                } else {
//                    log("Init\t", that.getClass().getName(), "\t", new Gson().toJson(param.args));
                }

                Object target = param.args[0];
                for (Field f : target.getClass().getFields()) {
                    f.setAccessible(true);

                    if ("c".equals(f.getName())) {
                        log("Field Mobile\t", f.getName(), f.get(target).toString());
                    }
                }
            }
        });

        XposedBridge.hookAllMethods(aClass, "onDataReceived", new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                super.beforeHookedMethod(param);


                log(param.method.getName(),
//                        new Gson().toJson(q.get(param.thisObject)),
                        new Gson().toJson(param.args));
            }
        });

    }


    public void log(String... content) {
        logWithTag("MyApp", content);
    }

    public void logWithTag(String tag, String... content) {

        StringBuffer buf = new StringBuffer();
        for (String c : content) {
            buf.append(c);
        }

        log(String.format("%s\t%s", tag, buf.toString()));
    }


    public void printItem(HashMap<String, Object> row) {
        if (row.containsKey("phoneNumber")) {
            String m = String.format("%s,%s,%s,%s,%s",
                    "contactInfo",
                    row.get("name"),
                    row.get("nick"),
                    row.get("phoneNumber"),
                    row.get("unitePhone")
            );
            logWithTag("TextLog: ", m);
        }
    }
}
