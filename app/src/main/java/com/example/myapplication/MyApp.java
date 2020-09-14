package com.example.myapplication;

import android.app.Application;
import android.content.Context;
import android.telephony.TelephonyManager;
import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;


public class MyApp implements IXposedHookLoadPackage {
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        XposedBridge.log("Loaded App:" + lpparam.packageName);
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
                    Class<?> hookclass = null;
                    try {
                        hookclass = cl.loadClass(clzName);
                        XposedBridge.log(String.format("寻找%s成功", hookclass));
                    } catch (Exception e) {
                        XposedBridge.log(String.format("寻找%s报错:\t%s", clzName, e.toString()));
                        e.printStackTrace();
                    }

                    findAndHookMethod(hookclass, "syncFriends", new XC_MethodHook() {
                        @Override
                        protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                            super.beforeHookedMethod(param);
                            XposedBridge.log(param.toString());
                        }

                        @Override
                        protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                            super.afterHookedMethod(param);
                            XposedBridge.log(param.toString());
                        }
                    });

                }
            });

        }

        if (lpparam.packageName.equals("com.alibaba.android.rimet")) {
            findAndHookMethod(TelephonyManager.class, "getDeviceId", new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    XposedBridge.log(param.toString());
                }

                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);

                    XposedBridge.log(param.toString());
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
}
