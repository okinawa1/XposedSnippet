package com.alibaba.android.dingtalk.userbase.model;

public class LocalContactObject {
    String phoneNumber;
    String unitePhone;

    long uid;
    String name;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUnitePhone() {
        return unitePhone;
    }

    public void setUnitePhone(String unitePhone) {
        this.unitePhone = unitePhone;
    }

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
