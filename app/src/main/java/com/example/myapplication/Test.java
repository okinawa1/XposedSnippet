package com.example.myapplication;

import android.content.Context;
import android.util.Log;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;

public class Test {
    public  static void Hook1(ClassLoader cl) {
        Class<?> loadClass = null;
        try {
            String clzName = "epg";
            String methodName = "a";
            loadClass = cl.loadClass(clzName);
            XposedBridge.hookAllMethods(loadClass, methodName, new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    Log.e("MyApp", param.thisObject.toString(), new Throwable());
                }
            });

        } catch (ClassNotFoundException e) {
            Log.e("MyApp", e.toString(), e);
        }

    }


    public  static void navigator(Context context, ClassLoader cl) {
        Class<?> loadClass = null;
        try {
            loadClass = cl.loadClass("com.alibaba.doraemon.Doraemon");
            XposedBridge.hookAllMethods(loadClass, "getArtifact", new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    Log.e("MyApp", param.thisObject.toString(), new Throwable());
                }
            });
            Object o = XposedHelpers.callStaticMethod(loadClass, "getArtifact", "NAVIGATOR");
            Object from = XposedHelpers.callMethod(o, "from", context);
            XposedHelpers.callMethod(from, "to", "");
        } catch (ClassNotFoundException e) {
            Log.e("MyApp", e.toString(), e);
        }

    }
}
