package com.example.myapplication;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.alibaba.android.dingtalk.userbase.model.LocalContactObject;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

import static android.util.Log.DEBUG;
import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;


public class MyApp implements IXposedHookLoadPackage {
    public static final String SP_NAME = "dd_contact";
    public static final String FLAG1566 = "Mon Apr 19 23:49:42 CST 2021";

    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        final String clzName = "com.alibaba.android.rimet.tools.ContactHelper";

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

                    final Gson gson = new Gson();
                    try {
//                        final Class<?> bClass = cl.loadClass("kku"); // CommonContactDataSourceImpl.java
//                        final Class<?> bClass = cl.loadClass("kli"); // CommonContactDataSourceImpl.java
                        final Class<?> clzLocalContactAdapter = cl.loadClass("kgv"); // LocalContactAdapter.java
//                        final Class<?> bClass = cl.loadClass("kta"); // SimpleUserProfileObject.java
//                        final Class<?> clzContactHelper = cl.loadClass("kjq"); // ContactHelper.java
                        final Class<?> clzLocalContactFragment = cl.loadClass("com.alibaba.android.user.contact.organization.localcontact.LocalContactFragment");
//                        final Class<?> bClass = cl.loadClass("com.alibaba.android.user.entry.LocalContactEntry");
//                        final Class<?> bClass = cl.loadClass("kaq"); // UserProfileImpl.java
                        final Class<?> clzArrayListAdapter = cl.loadClass("kzv"); // ArrayListAdapter.java
                        final Class<?> clzLocalContactViewHolder = cl.loadClass("kgz"); // LocalContactViewHolder.java

                        final HashMap<Class, String> map = new HashMap<Class, String>() {{
                            put(clzArrayListAdapter, "ArrayListAdapter");
                            put(clzLocalContactAdapter, "LocalContactAdapter");

//                            put(clzContactHelper, "ContactHelper");
                            put(clzLocalContactFragment, "LocalContactFragment");
                            put(clzLocalContactViewHolder, "LocalContactViewHolder");
                        }};

                        final ConcurrentHashMap<Long, HashMap<String, Object>> map1 = new ConcurrentHashMap<Long, HashMap<String, Object>>();
                        final HashMap<Long, LocalContactObject> mapLocalContact = new HashMap();
                        final HashMap<String, LocalContactObject> phoneContact = new HashMap<>();
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
                                                if (o == null || o.size() < 100 || temp.size() > 0) {
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

                                                if (map1.size() != 0) {
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
                                                        LocalContactObject local = gson.fromJson(gson.toJson(o), LocalContactObject.class);
//                                                        log(gson.toJson(local));
                                                        phoneContact.put(local.getPhoneNumber(), local);

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
                                                    List<Long> longs = new ArrayList<>();
                                                    longs.addAll(mapLocalContact.keySet());
                                                    for (Long uid : longs) {
//                                                        if (n > 300) {
//                                                            break;
//                                                        }
                                                        if (uid > 0 && !map1.containsKey(uid)) {
//                                                        if (uid > 0 ) {
                                                            n += 1;
                                                            mn.invoke(param.thisObject, uid, param.args[1]);
//                                                            LocalContactObject localContactObject = mapLocalContact.get(uid);
//                                                            log(String.format("mobileInfo: %d=%s name=%s", uid,
//                                                                    localContactObject.getPhoneNumber(),
//                                                                    localContactObject.getName()
//                                                            ));
                                                        } else if (map1.containsKey(uid)) {
                                                            HashMap<String, Object> map01 = map1.get(uid);
                                                            LocalContactObject l01 = mapLocalContact.get(uid);
                                                            log(
                                                                    String.format("onDataReceived@local(%d/%d): ",
                                                                            longs.indexOf(uid),
                                                                            longs.size()
                                                                    ),
                                                                    String.format(
                                                                            "uid=%d,nick=%s,phone=%s,weiBoId=%s",
                                                                            uid,
                                                                            map01.get("nick"),
                                                                            l01.getPhoneNumber(),
                                                                            l01.getName()
                                                                    )
                                                            );
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
                                Gson g = new Gson();
                                String cont = g.toJson(param.args[0]);
                                UidObject uidObject = g.fromJson(cont, UidObject.class);

                                LocalContactObject localContactObject = mapLocalContact.get(uidObject.uid);
                                if (localContactObject == null) {
                                    log("onDataReceived: 1|", cont);
                                } else {
                                    log("onDataReceived: 2|", String.format(
                                            "uid=%s,nick=%s,phone=%s,weiBoId=%s",
                                            uidObject.uid, uidObject.nick,
                                            localContactObject.getPhoneNumber(),
                                            localContactObject.getName()
                                    ));
                                }
                            }
                        });

                        XposedBridge.hookAllMethods(cl.loadClass("kgz$5"), "onDataReceived", new XC_MethodHook() {
                            @Override
                            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                                super.beforeHookedMethod(param);
                                if (param.args !=null && param.args.length > 0) {
                                    log("kgz$5_onDataReceived: 3|", gson.toJson(param.args));
                                    param.setThrowable(new Exception(""));
                                }
                            }
                        });

                        XposedHelpers.findAndHookMethod(clzLocalContactViewHolder, "a",
                                clzLocalContactViewHolder,
                                cl.loadClass("com.alibaba.android.dingtalk.userbase.model.LocalContactObject"),
                                new XC_MethodHook() {

                                    @Override
                                    protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                                        super.beforeHookedMethod(param);
                                        Object arg = param.args[1];
                                        String pinyin = (String) XposedHelpers.getObjectField(arg, "pinyin");
                                        if (pinyin.equals("abc")) {
                                            Log.e("LocalContactViewHolder1", gson.toJson(arg), new Exception("callBefore1"));
                                            return;
                                        }

//                                        for (String m: new String[]{
//                                                "18627823637", "15937171115"
//                                        }) {
//                                            callMethod(clzLocalContactViewHolder, param, m);
//                                        }

                                        if (DEBUG == 3) {
                                            for (LocalContactObject act : phoneContact.values()) {
                                                if (act == null || act.getPhoneNumber() == null || "".equals(act.getPhoneNumber())) {
                                                    continue;
                                                }
                                                String m = act.getPhoneNumber();

                                                XposedHelpers.setObjectField(arg, "pinyin", "abc");
                                                XposedHelpers.setObjectField(arg, "phoneNumber", m);
                                                XposedHelpers.setObjectField(arg, "unitePhone", m);

                                                XposedHelpers.callStaticMethod(clzLocalContactViewHolder, param.method.getName(),
                                                        param.args[0],
                                                        arg
                                                );

                                                Log.e("LocalContactViewHolder0",
                                                        gson.toJson(arg),
                                                        new Exception(String.format("callBefore: %d", phoneContact.size())));
                                            }
                                        }
                                        map1.put(-1L, new HashMap<String, Object>());
//                                        for (LocalContactObject act : phoneContact.values()) {
//                                            if (act == null || act.getPhoneNumber() == null || "".equals(act.getPhoneNumber())) {
//                                                continue;
//                                            }
//                                            String m = act.getPhoneNumber();
//
//                                            XposedHelpers.setObjectField(arg, "pinyin", "abc");
//                                            XposedHelpers.setObjectField(arg, "phoneNumber", m);
//                                            XposedHelpers.setObjectField(arg, "unitePhone", m);
//
//                                            XposedHelpers.callStaticMethod(clzLocalContactViewHolder, param.method.getName(),
//                                                    param.args[0],
//                                                    arg
//                                            );
//
//                                            Log.e("LocalContactViewHolder0",
//                                                    gson.toJson(arg),
//                                                    new Exception(String.format("callBefore: %d", phoneContact.size())));
//                                        }
                                        param.setThrowable(new Exception("callBefore0"));
                                    }
                                });

//                        XposedHelpers.findAndHookMethod(clzLocalContactViewHolder, "a",
//                                XposedHelpers.findClass("long", cl),
//                                new XC_MethodHook() {
//                                    @Override
//                                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                                        super.afterHookedMethod(param);
//                                        log("clzLocalContactViewHolder: ",
//                                                param.method.toString());
//                                        Log.e("LocalContactViewHolder", gson.toJson(param.args),
//                                                new Exception("abc"));
//                                    }
//                        });
//
//                        XposedBridge.hookAllMethods(clzLocalContactViewHolder, "a",
//                                new XC_MethodHook() {
//                            @Override
//                            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                                super.afterHookedMethod(param);
//                                log("clzLocalContactViewHolder: ", param.method.toString());
//                            }
//                        });
                    } catch (Exception e) {
                        log(String.format("MyApp 寻找%s报错:\t%s", clzName, e.toString()));
                        e.printStackTrace();
                    }
                }
            });
        }

    }

    public void callMethod(Class<?> clz, XC_MethodHook.MethodHookParam param, String mobile) {

        if (null == mobile || "".equals(mobile)) {
            return;
        }
        Object arg = param.args[1];

        XposedHelpers.setObjectField(arg, "pinyin", "abc");
        XposedHelpers.setObjectField(arg, "phoneNumber", mobile);
        XposedHelpers.setObjectField(arg, "unitePhone", mobile);

        XposedHelpers.callStaticMethod(clz, param.method.getName(), param.args[0], arg);
    }


    public void log(String... content) {
        logWithTag("MyApp", content);
    }

    public void logWithTag(String tag, String... content) {

        StringBuffer buf = new StringBuffer();
        for (String c : content) {
            buf.append(c);
        }

        XposedBridge.log(String.format("%s\t%s", tag, buf.toString()));
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
