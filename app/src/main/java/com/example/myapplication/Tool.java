package com.example.myapplication;

import android.util.Log;
import com.alibaba.android.dingtalk.userbase.model.LocalContactObject;
import com.google.gson.Gson;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedHelpers;

import java.util.HashMap;

public class Tool {

    public static void loopTask(Object arg, Class clzLocalContactViewHolder, XC_MethodHook.MethodHookParam param,
                                HashMap<String, LocalContactObject> phoneContact) {
        Gson gson = new Gson();

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
}
