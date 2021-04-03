//crack by cn.futu.trader 11.6.1618
//com.android.internal.widget.RecyclerView
function loadDexfile(dexfile) {
    Java.perform(function() {
          Java.openClassFile(dexfile).load();
          //console.log("load " + dexfile);
    });
};

function checkLoadDex(className, dexfile) {
    Java.perform(function() {
        if (!classExists(className)) {
            Java.openClassFile(dexfile).load();
            //console.log("load " + dexfile);
        }
    });
};

function classExists(className) {
    var exists = false;
    try {
        var clz = Java.use(className);
        exists = true;
    } catch(err) {
        //console.log(err);
    }
    return exists;
};

function getClassName(obj) {
    if (obj.getClass) {
        return obj.getClass().getName();
    }
    var javaObject = Java.use("java.lang.Object");
    return Java.cast(obj, javaObject).getClass().getName();
}

//str1是否包含str2，str2可用正则表示
function contains(str1, str2) {
    var reg = RegExp(eval("/"+str2+"/"));
    if(str1 && str1.match && str1.match(reg)){
        return true;
    }else{
        return false;
    }
};

//创建ArrayList对象用这个方法就好了
function newArrayList() {
    var ArrayListClz = Java.use('java.util.ArrayList');
    return ArrayListClz.$new();
}

//创建HashSet对象用这个方法就好了
function newHashSet() {
    var HashSetClz = Java.use('java.util.HashSet');
    return HashSetClz.$new();
}

//创建HashMap对象用这个方法就好了
function newHashMap() {
    var HashMapClz = Java.use('java.util.HashMap');
    return HashMapClz.$new();
}

function newMethodBeat(text, executor) {
    var threadClz = Java.use("java.lang.Thread");
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var processClz = Java.use("android.os.Process");
    var currentThread = threadClz.currentThread();
    var beat = new Object();
    beat.invokeId = Math.random().toString(36).slice( - 8);
    beat.executor = executor;
    beat.myPid = processClz.myPid();
    beat.threadId = currentThread.getId();
    beat.threadName = currentThread.getName();
    beat.text = text;
    beat.startTime = new Date().getTime();
    beat.stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new()).substring(20);
    return beat;
};

function printBeat(beat) {
    var str = ("------------pid:" + beat.myPid + ",startFlag:" + beat.invokeId + ",objectHash:"+beat.executor+",thread(id:" + beat.threadId +",name:" + beat.threadName + "),timestamp:" + beat.startTime+"---------------\n");
    str += beat.text + "\n";
    str += beat.stackInfo;
    str += ("------------endFlag:" + beat.invokeId + ",usedtime:" + (new Date().getTime() - beat.startTime) +"---------------\n");
	console.log(str);
};

function log(str) {
    console.log(str);
};

function getBaseContext() {
    var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
    var context = currentApplication.getApplicationContext();
    return context; //Java.scheduleOnMainThread(fn):
};

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};



var loadedXRadar = false;

function loadXinitDexfile(dexfile) {
    loadDexfile('/data/user/0/cn.futu.trader/xinit/'+dexfile);
};

function loadXRadarDexfile() {
    loadedXRadar = true;
    loadDexfile('/data/user/0/cn.futu.trader/radar.dex');
};

function fastTojson(javaObject) {
    var JSONClz = Java.use("gz.com.alibaba.fastjson.JSON");
    return JSONClz.toJSONString(javaObject);
};

function getPrettyString(javaObject) {
    var XPretty = Java.use("gz.util.XPretty");
    return XPretty.getPrettyString(javaObject);
};

function xPretty(javaObject) {
    var str = getPrettyString(javaObject);
    console.log(str);
};

function getField(javaObject, fieldName) {
    var X = Java.use("gz.util.X");
    return X.getField(javaObject, fieldName);
};

function storeObjectAndLog(javaObject) {
    var className = getClassName(javaObject);
    var ObjectsStore = Java.use("gz.radar.objects.ObjectsStore");
    var objectId = ObjectsStore.storeObject(javaObject);
    console.log(className + " ObjectsStoreId: " +objectId);
};



//com.android.internal.widget.RecyclerView
Java.perform(function() {
    var com_android_internal_widget_RecyclerView_clz = Java.use('com.android.internal.widget.RecyclerView');
    var com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollRange_yvjh = com_android_internal_widget_RecyclerView_clz.computeHorizontalScrollRange.overload();
    com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollRange_yvjh.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.computeHorizontalScrollRange()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollRange_yvjh.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_repositionShadowingViews_n812 = com_android_internal_widget_RecyclerView_clz.repositionShadowingViews.overload();
    com_android_internal_widget_RecyclerView_clz_method_repositionShadowingViews_n812.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.repositionShadowingViews()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_repositionShadowingViews_n812.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_isLayoutFrozen_23nc = com_android_internal_widget_RecyclerView_clz.isLayoutFrozen.overload();
    com_android_internal_widget_RecyclerView_clz_method_isLayoutFrozen_23nc.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.isLayoutFrozen()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isLayoutFrozen_23nc.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_viewRangeUpdate_dt1q = com_android_internal_widget_RecyclerView_clz.viewRangeUpdate.overload('int', 'int', 'java.lang.Object');
    com_android_internal_widget_RecyclerView_clz_method_viewRangeUpdate_dt1q.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.viewRangeUpdate(int,int,java.lang.Object)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_viewRangeUpdate_dt1q.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onPointerUp_6gun = com_android_internal_widget_RecyclerView_clz.onPointerUp.overload('android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_onPointerUp_6gun.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.onPointerUp(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onPointerUp_6gun.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_resetTouch_2bmf = com_android_internal_widget_RecyclerView_clz.resetTouch.overload();
    com_android_internal_widget_RecyclerView_clz_method_resetTouch_2bmf.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.resetTouch()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_resetTouch_2bmf.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onRestoreInstanceState_nyef = com_android_internal_widget_RecyclerView_clz.onRestoreInstanceState.overload('android.os.Parcelable');
    com_android_internal_widget_RecyclerView_clz_method_onRestoreInstanceState_nyef.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.onRestoreInstanceState(android.os.Parcelable)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onRestoreInstanceState_nyef.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeOnItemTouchListener_3epc = com_android_internal_widget_RecyclerView_clz.removeOnItemTouchListener.overload('com.android.internal.widget.RecyclerView$OnItemTouchListener');
    com_android_internal_widget_RecyclerView_clz_method_removeOnItemTouchListener_3epc.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.removeOnItemTouchListener(com.android.internal.widget.RecyclerView$OnItemTouchListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_removeOnItemTouchListener_3epc.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeOnChildAttachStateChangeListener_7ytd = com_android_internal_widget_RecyclerView_clz.removeOnChildAttachStateChangeListener.overload('com.android.internal.widget.RecyclerView$OnChildAttachStateChangeListener');
    com_android_internal_widget_RecyclerView_clz_method_removeOnChildAttachStateChangeListener_7ytd.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.removeOnChildAttachStateChangeListener(com.android.internal.widget.RecyclerView$OnChildAttachStateChangeListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_removeOnChildAttachStateChangeListener_7ytd.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_drawChild_ld9g = com_android_internal_widget_RecyclerView_clz.drawChild.overload('android.graphics.Canvas', 'android.view.View', 'long');
    com_android_internal_widget_RecyclerView_clz_method_drawChild_ld9g.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.drawChild(android.graphics.Canvas,android.view.View,long)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_drawChild_ld9g.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_recoverFocusFromState_105j = com_android_internal_widget_RecyclerView_clz.recoverFocusFromState.overload();
    com_android_internal_widget_RecyclerView_clz_method_recoverFocusFromState_105j.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.recoverFocusFromState()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_recoverFocusFromState_105j.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_canReuseUpdatedViewHolder_x4rl = com_android_internal_widget_RecyclerView_clz.canReuseUpdatedViewHolder.overload('com.android.internal.widget.RecyclerView$ViewHolder');
    com_android_internal_widget_RecyclerView_clz_method_canReuseUpdatedViewHolder_x4rl.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'boolean com.android.internal.widget.RecyclerView.canReuseUpdatedViewHolder(com.android.internal.widget.RecyclerView$ViewHolder)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_canReuseUpdatedViewHolder_x4rl.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_ensureBottomGlow_tter = com_android_internal_widget_RecyclerView_clz.ensureBottomGlow.overload();
    com_android_internal_widget_RecyclerView_clz_method_ensureBottomGlow_tter.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.ensureBottomGlow()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_ensureBottomGlow_tter.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findViewHolderForAdapterPosition_xrxk = com_android_internal_widget_RecyclerView_clz.findViewHolderForAdapterPosition.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_findViewHolderForAdapterPosition_xrxk.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.findViewHolderForAdapterPosition(int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findViewHolderForAdapterPosition_xrxk.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_animateChange_n8cf = com_android_internal_widget_RecyclerView_clz.animateChange.overload('com.android.internal.widget.RecyclerView$ViewHolder', 'com.android.internal.widget.RecyclerView$ViewHolder', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo', 'boolean', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_animateChange_n8cf.implementation = function(v0, v1, v2, v3, v4, v5) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.animateChange(com.android.internal.widget.RecyclerView$ViewHolder,com.android.internal.widget.RecyclerView$ViewHolder,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo,boolean,boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_animateChange_n8cf.call(this, v0, v1, v2, v3, v4, v5);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_addOnItemTouchListener_xgxj = com_android_internal_widget_RecyclerView_clz.addOnItemTouchListener.overload('com.android.internal.widget.RecyclerView$OnItemTouchListener');
    com_android_internal_widget_RecyclerView_clz_method_addOnItemTouchListener_xgxj.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.addOnItemTouchListener(com.android.internal.widget.RecyclerView$OnItemTouchListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addOnItemTouchListener_xgxj.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onGenericMotionEvent_33li = com_android_internal_widget_RecyclerView_clz.onGenericMotionEvent.overload('android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_onGenericMotionEvent_33li.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.onGenericMotionEvent(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_onGenericMotionEvent_33li.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_setRecycledViewPool_et6r = com_android_internal_widget_RecyclerView_clz.setRecycledViewPool.overload('com.android.internal.widget.RecyclerView$RecycledViewPool');
    com_android_internal_widget_RecyclerView_clz_method_setRecycledViewPool_et6r.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setRecycledViewPool(com.android.internal.widget.RecyclerView$RecycledViewPool)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setRecycledViewPool_et6r.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_clearNestedRecyclerViewIfNotNested_obeb = com_android_internal_widget_RecyclerView_clz.clearNestedRecyclerViewIfNotNested.overload('com.android.internal.widget.RecyclerView$ViewHolder');
    com_android_internal_widget_RecyclerView_clz_method_clearNestedRecyclerViewIfNotNested_obeb.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static void com.android.internal.widget.RecyclerView.clearNestedRecyclerViewIfNotNested(com.android.internal.widget.RecyclerView$ViewHolder)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_clearNestedRecyclerViewIfNotNested_obeb.call(com_android_internal_widget_RecyclerView_clz, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_assertInLayoutOrScroll_r55n = com_android_internal_widget_RecyclerView_clz.assertInLayoutOrScroll.overload('java.lang.String');
    com_android_internal_widget_RecyclerView_clz_method_assertInLayoutOrScroll_r55n.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.assertInLayoutOrScroll(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_assertInLayoutOrScroll_r55n.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setLayoutFrozen_o9mb = com_android_internal_widget_RecyclerView_clz.setLayoutFrozen.overload('boolean');
    com_android_internal_widget_RecyclerView_clz_method_setLayoutFrozen_o9mb.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setLayoutFrozen(boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setLayoutFrozen_o9mb.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getLayoutManager_kpui = com_android_internal_widget_RecyclerView_clz.getLayoutManager.overload();
    com_android_internal_widget_RecyclerView_clz_method_getLayoutManager_kpui.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$LayoutManager com.android.internal.widget.RecyclerView.getLayoutManager()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getLayoutManager_kpui.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_setViewCacheExtension_znnl = com_android_internal_widget_RecyclerView_clz.setViewCacheExtension.overload('com.android.internal.widget.RecyclerView$ViewCacheExtension');
    com_android_internal_widget_RecyclerView_clz_method_setViewCacheExtension_znnl.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setViewCacheExtension(com.android.internal.widget.RecyclerView$ViewCacheExtension)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setViewCacheExtension_znnl.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_offsetChildrenVertical_hy5v = com_android_internal_widget_RecyclerView_clz.offsetChildrenVertical.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_offsetChildrenVertical_hy5v.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.offsetChildrenVertical(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_offsetChildrenVertical_hy5v.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildPosition_bkln = com_android_internal_widget_RecyclerView_clz.getChildPosition.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getChildPosition_bkln.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getChildPosition(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildPosition_bkln.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onRequestFocusInDescendants_bml3 = com_android_internal_widget_RecyclerView_clz.onRequestFocusInDescendants.overload('int', 'android.graphics.Rect');
    com_android_internal_widget_RecyclerView_clz_method_onRequestFocusInDescendants_bml3.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'protected boolean com.android.internal.widget.RecyclerView.onRequestFocusInDescendants(int,android.graphics.Rect)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_onRequestFocusInDescendants_bml3.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForMove_wzfs = com_android_internal_widget_RecyclerView_clz.offsetPositionRecordsForMove.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForMove_wzfs.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.offsetPositionRecordsForMove(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForMove_wzfs.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findContainingViewHolder_7jx1 = com_android_internal_widget_RecyclerView_clz.findContainingViewHolder.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_findContainingViewHolder_7jx1.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.findContainingViewHolder(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findContainingViewHolder_7jx1.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getScrollState_x08w = com_android_internal_widget_RecyclerView_clz.getScrollState.overload();
    com_android_internal_widget_RecyclerView_clz_method_getScrollState_x08w.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getScrollState()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getScrollState_x08w.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChangedHolderKey_52tb = com_android_internal_widget_RecyclerView_clz.getChangedHolderKey.overload('com.android.internal.widget.RecyclerView$ViewHolder');
    com_android_internal_widget_RecyclerView_clz_method_getChangedHolderKey_52tb.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'long com.android.internal.widget.RecyclerView.getChangedHolderKey(com.android.internal.widget.RecyclerView$ViewHolder)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChangedHolderKey_52tb.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onSizeChanged_3vmc = com_android_internal_widget_RecyclerView_clz.onSizeChanged.overload('int', 'int', 'int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_onSizeChanged_3vmc.implementation = function(v0, v1, v2, v3) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.onSizeChanged(int,int,int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onSizeChanged_3vmc.call(this, v0, v1, v2, v3);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_scrollToPosition_khnh = com_android_internal_widget_RecyclerView_clz.scrollToPosition.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_scrollToPosition_khnh.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.scrollToPosition(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_scrollToPosition_khnh.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_clearOnScrollListeners_7rto = com_android_internal_widget_RecyclerView_clz.clearOnScrollListeners.overload();
    com_android_internal_widget_RecyclerView_clz_method_clearOnScrollListeners_7rto.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.clearOnScrollListeners()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_clearOnScrollListeners_7rto.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onChildDetachedFromWindow_z9qa = com_android_internal_widget_RecyclerView_clz.onChildDetachedFromWindow.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_onChildDetachedFromWindow_z9qa.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.onChildDetachedFromWindow(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onChildDetachedFromWindow_z9qa.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_releaseGlows_tkos = com_android_internal_widget_RecyclerView_clz.releaseGlows.overload();
    com_android_internal_widget_RecyclerView_clz_method_releaseGlows_tkos.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.releaseGlows()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_releaseGlows_tkos.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_shouldDeferAccessibilityEvent_sb5p = com_android_internal_widget_RecyclerView_clz.shouldDeferAccessibilityEvent.overload('android.view.accessibility.AccessibilityEvent');
    com_android_internal_widget_RecyclerView_clz_method_shouldDeferAccessibilityEvent_sb5p.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'boolean com.android.internal.widget.RecyclerView.shouldDeferAccessibilityEvent(android.view.accessibility.AccessibilityEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_shouldDeferAccessibilityEvent_sb5p.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onDetachedFromWindow_47o8 = com_android_internal_widget_RecyclerView_clz.onDetachedFromWindow.overload();
    com_android_internal_widget_RecyclerView_clz_method_onDetachedFromWindow_47o8.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.onDetachedFromWindow()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onDetachedFromWindow_47o8.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollExtent_dvgf = com_android_internal_widget_RecyclerView_clz.computeHorizontalScrollExtent.overload();
    com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollExtent_dvgf.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.computeHorizontalScrollExtent()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollExtent_dvgf.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_initChildrenHelper_pcbc = com_android_internal_widget_RecyclerView_clz.initChildrenHelper.overload();
    com_android_internal_widget_RecyclerView_clz_method_initChildrenHelper_pcbc.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.initChildrenHelper()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_initChildrenHelper_pcbc.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollExtent_vfc5 = com_android_internal_widget_RecyclerView_clz.computeVerticalScrollExtent.overload();
    com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollExtent_vfc5.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.computeVerticalScrollExtent()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollExtent_vfc5.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_findViewHolderForItemId_5qkt = com_android_internal_widget_RecyclerView_clz.findViewHolderForItemId.overload('long');
    com_android_internal_widget_RecyclerView_clz_method_findViewHolderForItemId_5qkt.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.findViewHolderForItemId(long)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findViewHolderForItemId_5qkt.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_clearOnChildAttachStateChangeListeners_01h3 = com_android_internal_widget_RecyclerView_clz.clearOnChildAttachStateChangeListeners.overload();
    com_android_internal_widget_RecyclerView_clz_method_clearOnChildAttachStateChangeListeners_01h3.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.clearOnChildAttachStateChangeListeners()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_clearOnChildAttachStateChangeListeners_01h3.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_scrollTo_gp1w = com_android_internal_widget_RecyclerView_clz.scrollTo.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_scrollTo_gp1w.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.scrollTo(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_scrollTo_gp1w.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_animateAppearance_frgk = com_android_internal_widget_RecyclerView_clz.animateAppearance.overload('com.android.internal.widget.RecyclerView$ViewHolder', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo');
    com_android_internal_widget_RecyclerView_clz_method_animateAppearance_frgk.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.animateAppearance(com.android.internal.widget.RecyclerView$ViewHolder,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_animateAppearance_frgk.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setItemViewCacheSize_sh0k = com_android_internal_widget_RecyclerView_clz.setItemViewCacheSize.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_setItemViewCacheSize_sh0k.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setItemViewCacheSize(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setItemViewCacheSize_sh0k.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_addOnScrollListener_axpd = com_android_internal_widget_RecyclerView_clz.addOnScrollListener.overload('com.android.internal.widget.RecyclerView$OnScrollListener');
    com_android_internal_widget_RecyclerView_clz_method_addOnScrollListener_axpd.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.addOnScrollListener(com.android.internal.widget.RecyclerView$OnScrollListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addOnScrollListener_axpd.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForRemove_ptwm = com_android_internal_widget_RecyclerView_clz.offsetPositionRecordsForRemove.overload('int', 'int', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForRemove_ptwm.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.offsetPositionRecordsForRemove(int,int,boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForRemove_ptwm.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_didChildRangeChange_6ath = com_android_internal_widget_RecyclerView_clz.didChildRangeChange.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_didChildRangeChange_6ath.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.didChildRangeChange(int,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_didChildRangeChange_6ath.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_isPreferredNextFocus_cbcm = com_android_internal_widget_RecyclerView_clz.isPreferredNextFocus.overload('android.view.View', 'android.view.View', 'int');
    com_android_internal_widget_RecyclerView_clz_method_isPreferredNextFocus_cbcm.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.isPreferredNextFocus(android.view.View,android.view.View,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isPreferredNextFocus_cbcm.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeItemDecoration_t1rc = com_android_internal_widget_RecyclerView_clz.removeItemDecoration.overload('com.android.internal.widget.RecyclerView$ItemDecoration');
    com_android_internal_widget_RecyclerView_clz_method_removeItemDecoration_t1rc.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.removeItemDecoration(com.android.internal.widget.RecyclerView$ItemDecoration)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_removeItemDecoration_t1rc.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_handleMissingPreInfoForChangeError_qobg = com_android_internal_widget_RecyclerView_clz.handleMissingPreInfoForChangeError.overload('long', 'com.android.internal.widget.RecyclerView$ViewHolder', 'com.android.internal.widget.RecyclerView$ViewHolder');
    com_android_internal_widget_RecyclerView_clz_method_handleMissingPreInfoForChangeError_qobg.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.handleMissingPreInfoForChangeError(long,com.android.internal.widget.RecyclerView$ViewHolder,com.android.internal.widget.RecyclerView$ViewHolder)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_handleMissingPreInfoForChangeError_qobg.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onScrolled_5vmm = com_android_internal_widget_RecyclerView_clz.onScrolled.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_onScrolled_5vmm.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.onScrolled(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onScrolled_5vmm.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildViewHolderInt_peak = com_android_internal_widget_RecyclerView_clz.getChildViewHolderInt.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getChildViewHolderInt_peak.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.getChildViewHolderInt(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildViewHolderInt_peak.call(com_android_internal_widget_RecyclerView_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onChildAttachedToWindow_mzq4 = com_android_internal_widget_RecyclerView_clz.onChildAttachedToWindow.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_onChildAttachedToWindow_mzq4.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.onChildAttachedToWindow(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onChildAttachedToWindow_mzq4.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getItemDecorInsetsForChild_trqf = com_android_internal_widget_RecyclerView_clz.getItemDecorInsetsForChild.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getItemDecorInsetsForChild_trqf.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'android.graphics.Rect com.android.internal.widget.RecyclerView.getItemDecorInsetsForChild(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getItemDecorInsetsForChild_trqf.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeDetachedView_5qtg = com_android_internal_widget_RecyclerView_clz.removeDetachedView.overload('android.view.View', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_removeDetachedView_5qtg.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.removeDetachedView(android.view.View,boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_removeDetachedView_5qtg.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_defaultOnMeasure_anjs = com_android_internal_widget_RecyclerView_clz.defaultOnMeasure.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_defaultOnMeasure_anjs.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.defaultOnMeasure(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_defaultOnMeasure_anjs.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildItemId_ewum = com_android_internal_widget_RecyclerView_clz.getChildItemId.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getChildItemId_ewum.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public long com.android.internal.widget.RecyclerView.getChildItemId(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildItemId_ewum.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_createLayoutManager_072p = com_android_internal_widget_RecyclerView_clz.createLayoutManager.overload('android.content.Context', 'java.lang.String', 'android.util.AttributeSet', 'int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_createLayoutManager_072p.implementation = function(v0, v1, v2, v3, v4) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.createLayoutManager(android.content.Context,java.lang.String,android.util.AttributeSet,int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_createLayoutManager_072p.call(this, v0, v1, v2, v3, v4);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setAccessibilityDelegateCompat_7vmr = com_android_internal_widget_RecyclerView_clz.setAccessibilityDelegateCompat.overload('com.android.internal.widget.RecyclerViewAccessibilityDelegate');
    com_android_internal_widget_RecyclerView_clz_method_setAccessibilityDelegateCompat_7vmr.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setAccessibilityDelegateCompat(com.android.internal.widget.RecyclerViewAccessibilityDelegate)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setAccessibilityDelegateCompat_7vmr.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setLayoutManager_26vt = com_android_internal_widget_RecyclerView_clz.setLayoutManager.overload('com.android.internal.widget.RecyclerView$LayoutManager');
    com_android_internal_widget_RecyclerView_clz_method_setLayoutManager_26vt.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setLayoutManager(com.android.internal.widget.RecyclerView$LayoutManager)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setLayoutManager_26vt.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_checkLayoutParams_dlzh = com_android_internal_widget_RecyclerView_clz.checkLayoutParams.overload('android.view.ViewGroup$LayoutParams');
    com_android_internal_widget_RecyclerView_clz_method_checkLayoutParams_dlzh.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected boolean com.android.internal.widget.RecyclerView.checkLayoutParams(android.view.ViewGroup$LayoutParams)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_checkLayoutParams_dlzh.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onExitLayoutOrScroll_93x9 = com_android_internal_widget_RecyclerView_clz.onExitLayoutOrScroll.overload();
    com_android_internal_widget_RecyclerView_clz_method_onExitLayoutOrScroll_93x9.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.onExitLayoutOrScroll()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onExitLayoutOrScroll_93x9.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_markKnownViewsInvalid_5qgi = com_android_internal_widget_RecyclerView_clz.markKnownViewsInvalid.overload();
    com_android_internal_widget_RecyclerView_clz_method_markKnownViewsInvalid_5qgi.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.markKnownViewsInvalid()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_markKnownViewsInvalid_5qgi.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findContainingItemView_ah6r = com_android_internal_widget_RecyclerView_clz.findContainingItemView.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_findContainingItemView_ah6r.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public android.view.View com.android.internal.widget.RecyclerView.findContainingItemView(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findContainingItemView_ah6r.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_setAdapterInternal_t64r = com_android_internal_widget_RecyclerView_clz.setAdapterInternal.overload('com.android.internal.widget.RecyclerView$Adapter', 'boolean', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_setAdapterInternal_t64r.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.setAdapterInternal(com.android.internal.widget.RecyclerView$Adapter,boolean,boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setAdapterInternal_t64r.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_focusSearch_7fm9 = com_android_internal_widget_RecyclerView_clz.focusSearch.overload('android.view.View', 'int');
    com_android_internal_widget_RecyclerView_clz_method_focusSearch_7fm9.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public android.view.View com.android.internal.widget.RecyclerView.focusSearch(android.view.View,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_focusSearch_7fm9.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildDrawingOrder_48v3 = com_android_internal_widget_RecyclerView_clz.getChildDrawingOrder.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_getChildDrawingOrder_48v3.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'protected int com.android.internal.widget.RecyclerView.getChildDrawingOrder(int,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildDrawingOrder_48v3.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_scrollByInternal_f45p = com_android_internal_widget_RecyclerView_clz.scrollByInternal.overload('int', 'int', 'android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_scrollByInternal_f45p.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'boolean com.android.internal.widget.RecyclerView.scrollByInternal(int,int,android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_scrollByInternal_f45p.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollOffset_vrjd = com_android_internal_widget_RecyclerView_clz.computeHorizontalScrollOffset.overload();
    com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollOffset_vrjd.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.computeHorizontalScrollOffset()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_computeHorizontalScrollOffset_vrjd.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_hasUpdatedView_iakr = com_android_internal_widget_RecyclerView_clz.hasUpdatedView.overload();
    com_android_internal_widget_RecyclerView_clz_method_hasUpdatedView_iakr.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.hasUpdatedView()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_hasUpdatedView_iakr.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_swapAdapter_mt95 = com_android_internal_widget_RecyclerView_clz.swapAdapter.overload('com.android.internal.widget.RecyclerView$Adapter', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_swapAdapter_mt95.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.swapAdapter(com.android.internal.widget.RecyclerView$Adapter,boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_swapAdapter_mt95.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_smoothScrollBy_048h = com_android_internal_widget_RecyclerView_clz.smoothScrollBy.overload('int', 'int', 'android.view.animation.Interpolator');
    com_android_internal_widget_RecyclerView_clz_method_smoothScrollBy_048h.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.smoothScrollBy(int,int,android.view.animation.Interpolator)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_smoothScrollBy_048h.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_hasPendingAdapterUpdates_oqlb = com_android_internal_widget_RecyclerView_clz.hasPendingAdapterUpdates.overload();
    com_android_internal_widget_RecyclerView_clz_method_hasPendingAdapterUpdates_oqlb.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.hasPendingAdapterUpdates()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_hasPendingAdapterUpdates_oqlb.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_eatRequestLayout_kr9n = com_android_internal_widget_RecyclerView_clz.eatRequestLayout.overload();
    com_android_internal_widget_RecyclerView_clz_method_eatRequestLayout_kr9n.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.eatRequestLayout()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_eatRequestLayout_kr9n.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getRecycledViewPool_v187 = com_android_internal_widget_RecyclerView_clz.getRecycledViewPool.overload();
    com_android_internal_widget_RecyclerView_clz_method_getRecycledViewPool_v187.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$RecycledViewPool com.android.internal.widget.RecyclerView.getRecycledViewPool()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getRecycledViewPool_v187.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_smoothScrollToPosition_b1lq = com_android_internal_widget_RecyclerView_clz.smoothScrollToPosition.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_smoothScrollToPosition_b1lq.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.smoothScrollToPosition(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_smoothScrollToPosition_b1lq.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findMinMaxChildLayoutPositions_3klk = com_android_internal_widget_RecyclerView_clz.findMinMaxChildLayoutPositions.overload('[I');
    com_android_internal_widget_RecyclerView_clz_method_findMinMaxChildLayoutPositions_3klk.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.findMinMaxChildLayoutPositions(int[])';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_findMinMaxChildLayoutPositions_3klk.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setRecyclerListener_3c8k = com_android_internal_widget_RecyclerView_clz.setRecyclerListener.overload('com.android.internal.widget.RecyclerView$RecyclerListener');
    com_android_internal_widget_RecyclerView_clz_method_setRecyclerListener_3c8k.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setRecyclerListener(com.android.internal.widget.RecyclerView$RecyclerListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setRecyclerListener_3c8k.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_ensureTopGlow_ri63 = com_android_internal_widget_RecyclerView_clz.ensureTopGlow.overload();
    com_android_internal_widget_RecyclerView_clz_method_ensureTopGlow_ri63.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.ensureTopGlow()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_ensureTopGlow_ri63.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setHasFixedSize_18so = com_android_internal_widget_RecyclerView_clz.setHasFixedSize.overload('boolean');
    com_android_internal_widget_RecyclerView_clz_method_setHasFixedSize_18so.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setHasFixedSize(boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setHasFixedSize_18so.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep1_8mjp = com_android_internal_widget_RecyclerView_clz.dispatchLayoutStep1.overload();
    com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep1_8mjp.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.dispatchLayoutStep1()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep1_8mjp.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep2_cucf = com_android_internal_widget_RecyclerView_clz.dispatchLayoutStep2.overload();
    com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep2_cucf.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.dispatchLayoutStep2()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep2_cucf.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onLayout_j8p9 = com_android_internal_widget_RecyclerView_clz.onLayout.overload('boolean', 'int', 'int', 'int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_onLayout_j8p9.implementation = function(v0, v1, v2, v3, v4) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.onLayout(boolean,int,int,int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onLayout_j8p9.call(this, v0, v1, v2, v3, v4);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep3_2vfb = com_android_internal_widget_RecyclerView_clz.dispatchLayoutStep3.overload();
    com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep3_2vfb.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.dispatchLayoutStep3()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchLayoutStep3_2vfb.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_postAnimationRunner_zqxq = com_android_internal_widget_RecyclerView_clz.postAnimationRunner.overload();
    com_android_internal_widget_RecyclerView_clz_method_postAnimationRunner_zqxq.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.postAnimationRunner()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_postAnimationRunner_zqxq.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchOnScrollStateChanged_iavb = com_android_internal_widget_RecyclerView_clz.dispatchOnScrollStateChanged.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_dispatchOnScrollStateChanged_iavb.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.dispatchOnScrollStateChanged(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchOnScrollStateChanged_iavb.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onScrollStateChanged_yfjf = com_android_internal_widget_RecyclerView_clz.onScrollStateChanged.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_onScrollStateChanged_yfjf.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.onScrollStateChanged(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onScrollStateChanged_yfjf.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setDataSetChangedAfterLayout_6k6v = com_android_internal_widget_RecyclerView_clz.setDataSetChangedAfterLayout.overload();
    com_android_internal_widget_RecyclerView_clz_method_setDataSetChangedAfterLayout_6k6v.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.setDataSetChangedAfterLayout()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setDataSetChangedAfterLayout_6k6v.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildViewHolder_yi0w = com_android_internal_widget_RecyclerView_clz.getChildViewHolder.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getChildViewHolder_yi0w.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.getChildViewHolder(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildViewHolder_yi0w.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchOnItemTouchIntercept_h685 = com_android_internal_widget_RecyclerView_clz.dispatchOnItemTouchIntercept.overload('android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_dispatchOnItemTouchIntercept_h685.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.dispatchOnItemTouchIntercept(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_dispatchOnItemTouchIntercept_h685.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getOnFlingListener_wv3a = com_android_internal_widget_RecyclerView_clz.getOnFlingListener.overload();
    com_android_internal_widget_RecyclerView_clz_method_getOnFlingListener_wv3a.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$OnFlingListener com.android.internal.widget.RecyclerView.getOnFlingListener()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getOnFlingListener_wv3a.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_consumePendingUpdateOperations_722a = com_android_internal_widget_RecyclerView_clz.consumePendingUpdateOperations.overload();
    com_android_internal_widget_RecyclerView_clz_method_consumePendingUpdateOperations_722a.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.consumePendingUpdateOperations()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_consumePendingUpdateOperations_722a.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_requestLayout_5lum = com_android_internal_widget_RecyclerView_clz.requestLayout.overload();
    com_android_internal_widget_RecyclerView_clz_method_requestLayout_5lum.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.requestLayout()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_requestLayout_5lum.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeAndRecycleViews_a8rq = com_android_internal_widget_RecyclerView_clz.removeAndRecycleViews.overload();
    com_android_internal_widget_RecyclerView_clz_method_removeAndRecycleViews_a8rq.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.removeAndRecycleViews()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_removeAndRecycleViews_a8rq.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_addAnimatingView_9m1t = com_android_internal_widget_RecyclerView_clz.addAnimatingView.overload('com.android.internal.widget.RecyclerView$ViewHolder');
    com_android_internal_widget_RecyclerView_clz_method_addAnimatingView_9m1t.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.addAnimatingView(com.android.internal.widget.RecyclerView$ViewHolder)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addAnimatingView_9m1t.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_scrollBy_3qej = com_android_internal_widget_RecyclerView_clz.scrollBy.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_scrollBy_3qej.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.scrollBy(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_scrollBy_3qej.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_stopScrollersInternal_k2ev = com_android_internal_widget_RecyclerView_clz.stopScrollersInternal.overload();
    com_android_internal_widget_RecyclerView_clz_method_stopScrollersInternal_k2ev.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.stopScrollersInternal()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_stopScrollersInternal_k2ev.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_assertNotInLayoutOrScroll_5f6p = com_android_internal_widget_RecyclerView_clz.assertNotInLayoutOrScroll.overload('java.lang.String');
    com_android_internal_widget_RecyclerView_clz_method_assertNotInLayoutOrScroll_5f6p.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.assertNotInLayoutOrScroll(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_assertNotInLayoutOrScroll_5f6p.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setScrollingTouchSlop_gty9 = com_android_internal_widget_RecyclerView_clz.setScrollingTouchSlop.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_setScrollingTouchSlop_gty9.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setScrollingTouchSlop(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setScrollingTouchSlop_gty9.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeAnimatingView_e0j9 = com_android_internal_widget_RecyclerView_clz.removeAnimatingView.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_removeAnimatingView_e0j9.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'boolean com.android.internal.widget.RecyclerView.removeAnimatingView(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_removeAnimatingView_e0j9.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onAttachedToWindow_6o68 = com_android_internal_widget_RecyclerView_clz.onAttachedToWindow.overload();
    com_android_internal_widget_RecyclerView_clz_method_onAttachedToWindow_6o68.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.onAttachedToWindow()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onAttachedToWindow_6o68.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onTouchEvent_rv3c = com_android_internal_widget_RecyclerView_clz.onTouchEvent.overload('android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_onTouchEvent_rv3c.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.onTouchEvent(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_onTouchEvent_rv3c.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_considerReleasingGlowsOnScroll_drxj = com_android_internal_widget_RecyclerView_clz.considerReleasingGlowsOnScroll.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_considerReleasingGlowsOnScroll_drxj.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.considerReleasingGlowsOnScroll(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_considerReleasingGlowsOnScroll_drxj.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_generateLayoutParams_hvpi = com_android_internal_widget_RecyclerView_clz.generateLayoutParams.overload('android.view.ViewGroup$LayoutParams');
    com_android_internal_widget_RecyclerView_clz_method_generateLayoutParams_hvpi.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected android.view.ViewGroup$LayoutParams com.android.internal.widget.RecyclerView.generateLayoutParams(android.view.ViewGroup$LayoutParams)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_generateLayoutParams_hvpi.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchOnItemTouch_78uh = com_android_internal_widget_RecyclerView_clz.dispatchOnItemTouch.overload('android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_dispatchOnItemTouch_78uh.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.dispatchOnItemTouch(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_dispatchOnItemTouch_78uh.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getPreserveFocusAfterLayout_ji7n = com_android_internal_widget_RecyclerView_clz.getPreserveFocusAfterLayout.overload();
    com_android_internal_widget_RecyclerView_clz_method_getPreserveFocusAfterLayout_ji7n.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.getPreserveFocusAfterLayout()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getPreserveFocusAfterLayout_ji7n.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_fling_9d4h = com_android_internal_widget_RecyclerView_clz.fling.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_fling_9d4h.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.fling(int,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_fling_9d4h.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_ensureLeftGlow_z9oe = com_android_internal_widget_RecyclerView_clz.ensureLeftGlow.overload();
    com_android_internal_widget_RecyclerView_clz_method_ensureLeftGlow_z9oe.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.ensureLeftGlow()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_ensureLeftGlow_z9oe.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_cancelTouch_eq8z = com_android_internal_widget_RecyclerView_clz.cancelTouch.overload();
    com_android_internal_widget_RecyclerView_clz_method_cancelTouch_eq8z.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.cancelTouch()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_cancelTouch_eq8z.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getScrollFactor_bdsg = com_android_internal_widget_RecyclerView_clz.getScrollFactor.overload();
    com_android_internal_widget_RecyclerView_clz_method_getScrollFactor_bdsg.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private float com.android.internal.widget.RecyclerView.getScrollFactor()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getScrollFactor_bdsg.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getDeepestFocusedViewWithId_jp7z = com_android_internal_widget_RecyclerView_clz.getDeepestFocusedViewWithId.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getDeepestFocusedViewWithId_jp7z.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private int com.android.internal.widget.RecyclerView.getDeepestFocusedViewWithId(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getDeepestFocusedViewWithId_jp7z.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onDraw_148n = com_android_internal_widget_RecyclerView_clz.onDraw.overload('android.graphics.Canvas');
    com_android_internal_widget_RecyclerView_clz_method_onDraw_148n.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.onDraw(android.graphics.Canvas)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onDraw_148n.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findNestedRecyclerView_i4jm = com_android_internal_widget_RecyclerView_clz.findNestedRecyclerView.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_findNestedRecyclerView_i4jm.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static com.android.internal.widget.RecyclerView com.android.internal.widget.RecyclerView.findNestedRecyclerView(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findNestedRecyclerView_i4jm.call(com_android_internal_widget_RecyclerView_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForInsert_sg5q = com_android_internal_widget_RecyclerView_clz.offsetPositionRecordsForInsert.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForInsert_sg5q.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.offsetPositionRecordsForInsert(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_offsetPositionRecordsForInsert_sg5q.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_isComputingLayout_wlzr = com_android_internal_widget_RecyclerView_clz.isComputingLayout.overload();
    com_android_internal_widget_RecyclerView_clz_method_isComputingLayout_wlzr.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.isComputingLayout()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isComputingLayout_wlzr.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_draw_kqrj = com_android_internal_widget_RecyclerView_clz.draw.overload('android.graphics.Canvas');
    com_android_internal_widget_RecyclerView_clz_method_draw_kqrj.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.draw(android.graphics.Canvas)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_draw_kqrj.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getDecoratedBoundsWithMarginsInt_pju9 = com_android_internal_widget_RecyclerView_clz.getDecoratedBoundsWithMarginsInt.overload('android.view.View', 'android.graphics.Rect');
    com_android_internal_widget_RecyclerView_clz_method_getDecoratedBoundsWithMarginsInt_pju9.implementation = function(v0, v1) {
        var executor = 'Class';
        var beatText = 'static void com.android.internal.widget.RecyclerView.getDecoratedBoundsWithMarginsInt(android.view.View,android.graphics.Rect)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_getDecoratedBoundsWithMarginsInt_pju9.call(com_android_internal_widget_RecyclerView_clz, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_saveOldPositions_z5le = com_android_internal_widget_RecyclerView_clz.saveOldPositions.overload();
    com_android_internal_widget_RecyclerView_clz_method_saveOldPositions_z5le.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.saveOldPositions()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_saveOldPositions_z5le.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_jumpToPositionForSmoothScroller_w282 = com_android_internal_widget_RecyclerView_clz.jumpToPositionForSmoothScroller.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_jumpToPositionForSmoothScroller_w282.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.jumpToPositionForSmoothScroller(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_jumpToPositionForSmoothScroller_w282.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setItemAnimator_4qoe = com_android_internal_widget_RecyclerView_clz.setItemAnimator.overload('com.android.internal.widget.RecyclerView$ItemAnimator');
    com_android_internal_widget_RecyclerView_clz_method_setItemAnimator_4qoe.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setItemAnimator(com.android.internal.widget.RecyclerView$ItemAnimator)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setItemAnimator_4qoe.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_recordAnimationInfoIfBouncedHiddenView_7mok = com_android_internal_widget_RecyclerView_clz.recordAnimationInfoIfBouncedHiddenView.overload('com.android.internal.widget.RecyclerView$ViewHolder', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo');
    com_android_internal_widget_RecyclerView_clz_method_recordAnimationInfoIfBouncedHiddenView_7mok.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.recordAnimationInfoIfBouncedHiddenView(com.android.internal.widget.RecyclerView$ViewHolder,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_recordAnimationInfoIfBouncedHiddenView_7mok.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchOnScrolled_tpa5 = com_android_internal_widget_RecyclerView_clz.dispatchOnScrolled.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_dispatchOnScrolled_tpa5.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.dispatchOnScrolled(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchOnScrolled_tpa5.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_generateDefaultLayoutParams_jjg6 = com_android_internal_widget_RecyclerView_clz.generateDefaultLayoutParams.overload();
    com_android_internal_widget_RecyclerView_clz_method_generateDefaultLayoutParams_jjg6.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected android.view.ViewGroup$LayoutParams com.android.internal.widget.RecyclerView.generateDefaultLayoutParams()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_generateDefaultLayoutParams_jjg6.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_onMeasure_gnbp = com_android_internal_widget_RecyclerView_clz.onMeasure.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_onMeasure_gnbp.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.onMeasure(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onMeasure_gnbp.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildLayoutPosition_vj0n = com_android_internal_widget_RecyclerView_clz.getChildLayoutPosition.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getChildLayoutPosition_vj0n.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getChildLayoutPosition(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildLayoutPosition_vj0n.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getMinFlingVelocity_aqsf = com_android_internal_widget_RecyclerView_clz.getMinFlingVelocity.overload();
    com_android_internal_widget_RecyclerView_clz_method_getMinFlingVelocity_aqsf.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getMinFlingVelocity()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getMinFlingVelocity_aqsf.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_invalidateGlows_ob08 = com_android_internal_widget_RecyclerView_clz.invalidateGlows.overload();
    com_android_internal_widget_RecyclerView_clz_method_invalidateGlows_ob08.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.invalidateGlows()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_invalidateGlows_ob08.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findViewHolderForPosition_grxp = com_android_internal_widget_RecyclerView_clz.findViewHolderForPosition.overload('int', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_findViewHolderForPosition_grxp.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.findViewHolderForPosition(int,boolean)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findViewHolderForPosition_grxp.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_isPreferredNextFocusAbsolute_6fkt = com_android_internal_widget_RecyclerView_clz.isPreferredNextFocusAbsolute.overload('android.view.View', 'android.view.View', 'int');
    com_android_internal_widget_RecyclerView_clz_method_isPreferredNextFocusAbsolute_6fkt.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.isPreferredNextFocusAbsolute(android.view.View,android.view.View,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isPreferredNextFocusAbsolute_6fkt.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_isAttachedToWindow_r1b5 = com_android_internal_widget_RecyclerView_clz.isAttachedToWindow.overload();
    com_android_internal_widget_RecyclerView_clz_method_isAttachedToWindow_r1b5.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.isAttachedToWindow()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isAttachedToWindow_r1b5.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_animateDisappearance_vz6p = com_android_internal_widget_RecyclerView_clz.animateDisappearance.overload('com.android.internal.widget.RecyclerView$ViewHolder', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo', 'com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo');
    com_android_internal_widget_RecyclerView_clz_method_animateDisappearance_vz6p.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.animateDisappearance(com.android.internal.widget.RecyclerView$ViewHolder,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo,com.android.internal.widget.RecyclerView$ItemAnimator$ItemHolderInfo)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_animateDisappearance_vz6p.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_clearOldPositions_1d9n = com_android_internal_widget_RecyclerView_clz.clearOldPositions.overload();
    com_android_internal_widget_RecyclerView_clz_method_clearOldPositions_1d9n.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.clearOldPositions()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_clearOldPositions_1d9n.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchChildAttached_c7dl = com_android_internal_widget_RecyclerView_clz.dispatchChildAttached.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_dispatchChildAttached_c7dl.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.dispatchChildAttached(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchChildAttached_c7dl.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setPreserveFocusAfterLayout_qgm8 = com_android_internal_widget_RecyclerView_clz.setPreserveFocusAfterLayout.overload('boolean');
    com_android_internal_widget_RecyclerView_clz_method_setPreserveFocusAfterLayout_qgm8.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setPreserveFocusAfterLayout(boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setPreserveFocusAfterLayout_qgm8.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onSaveInstanceState_7x72 = com_android_internal_widget_RecyclerView_clz.onSaveInstanceState.overload();
    com_android_internal_widget_RecyclerView_clz_method_onSaveInstanceState_7x72.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected android.os.Parcelable com.android.internal.widget.RecyclerView.onSaveInstanceState()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_onSaveInstanceState_7x72.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_smoothScrollBy_8hvc = com_android_internal_widget_RecyclerView_clz.smoothScrollBy.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_smoothScrollBy_8hvc.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.smoothScrollBy(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_smoothScrollBy_8hvc.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_absorbGlows_p0qk = com_android_internal_widget_RecyclerView_clz.absorbGlows.overload('int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_absorbGlows_p0qk.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.absorbGlows(int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_absorbGlows_p0qk.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchChildDetached_2hl8 = com_android_internal_widget_RecyclerView_clz.dispatchChildDetached.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_dispatchChildDetached_2hl8.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.dispatchChildDetached(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchChildDetached_2hl8.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_isAnimating_vdxf = com_android_internal_widget_RecyclerView_clz.isAnimating.overload();
    com_android_internal_widget_RecyclerView_clz_method_isAnimating_vdxf.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.isAnimating()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isAnimating_vdxf.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getDecoratedBoundsWithMargins_b98u = com_android_internal_widget_RecyclerView_clz.getDecoratedBoundsWithMargins.overload('android.view.View', 'android.graphics.Rect');
    com_android_internal_widget_RecyclerView_clz_method_getDecoratedBoundsWithMargins_b98u.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.getDecoratedBoundsWithMargins(android.view.View,android.graphics.Rect)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_getDecoratedBoundsWithMargins_b98u.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_initAdapterManager_89a4 = com_android_internal_widget_RecyclerView_clz.initAdapterManager.overload();
    com_android_internal_widget_RecyclerView_clz_method_initAdapterManager_89a4.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.initAdapterManager()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_initAdapterManager_89a4.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_removeOnScrollListener_iwi9 = com_android_internal_widget_RecyclerView_clz.removeOnScrollListener.overload('com.android.internal.widget.RecyclerView$OnScrollListener');
    com_android_internal_widget_RecyclerView_clz_method_removeOnScrollListener_iwi9.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.removeOnScrollListener(com.android.internal.widget.RecyclerView$OnScrollListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_removeOnScrollListener_iwi9.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_ensureRightGlow_csvu = com_android_internal_widget_RecyclerView_clz.ensureRightGlow.overload();
    com_android_internal_widget_RecyclerView_clz_method_ensureRightGlow_csvu.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.ensureRightGlow()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_ensureRightGlow_csvu.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getAdapter_xzko = com_android_internal_widget_RecyclerView_clz.getAdapter.overload();
    com_android_internal_widget_RecyclerView_clz_method_getAdapter_xzko.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$Adapter com.android.internal.widget.RecyclerView.getAdapter()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getAdapter_xzko.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_isAccessibilityEnabled_36p8 = com_android_internal_widget_RecyclerView_clz.isAccessibilityEnabled.overload();
    com_android_internal_widget_RecyclerView_clz_method_isAccessibilityEnabled_36p8.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'boolean com.android.internal.widget.RecyclerView.isAccessibilityEnabled()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_isAccessibilityEnabled_36p8.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchPendingImportantForAccessibilityChanges_2uvu = com_android_internal_widget_RecyclerView_clz.dispatchPendingImportantForAccessibilityChanges.overload();
    com_android_internal_widget_RecyclerView_clz_method_dispatchPendingImportantForAccessibilityChanges_2uvu.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.dispatchPendingImportantForAccessibilityChanges()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchPendingImportantForAccessibilityChanges_2uvu.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findViewHolderForLayoutPosition_gnfl = com_android_internal_widget_RecyclerView_clz.findViewHolderForLayoutPosition.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_findViewHolderForLayoutPosition_gnfl.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.findViewHolderForLayoutPosition(int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findViewHolderForLayoutPosition_gnfl.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_addItemDecoration_ff1l = com_android_internal_widget_RecyclerView_clz.addItemDecoration.overload('com.android.internal.widget.RecyclerView$ItemDecoration', 'int');
    com_android_internal_widget_RecyclerView_clz_method_addItemDecoration_ff1l.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.addItemDecoration(com.android.internal.widget.RecyclerView$ItemDecoration,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addItemDecoration_ff1l.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getCompatAccessibilityDelegate_sh7s = com_android_internal_widget_RecyclerView_clz.getCompatAccessibilityDelegate.overload();
    com_android_internal_widget_RecyclerView_clz_method_getCompatAccessibilityDelegate_sh7s.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerViewAccessibilityDelegate com.android.internal.widget.RecyclerView.getCompatAccessibilityDelegate()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getCompatAccessibilityDelegate_sh7s.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchRestoreInstanceState_q829 = com_android_internal_widget_RecyclerView_clz.dispatchRestoreInstanceState.overload('android.util.SparseArray');
    com_android_internal_widget_RecyclerView_clz_method_dispatchRestoreInstanceState_q829.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.dispatchRestoreInstanceState(android.util.SparseArray)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchRestoreInstanceState_q829.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getFullClassName_a5i8 = com_android_internal_widget_RecyclerView_clz.getFullClassName.overload('android.content.Context', 'java.lang.String');
    com_android_internal_widget_RecyclerView_clz_method_getFullClassName_a5i8.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'private java.lang.String com.android.internal.widget.RecyclerView.getFullClassName(android.content.Context,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getFullClassName_a5i8.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_setChildDrawingOrderCallback_wjj5 = com_android_internal_widget_RecyclerView_clz.setChildDrawingOrderCallback.overload('com.android.internal.widget.RecyclerView$ChildDrawingOrderCallback');
    com_android_internal_widget_RecyclerView_clz_method_setChildDrawingOrderCallback_wjj5.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setChildDrawingOrderCallback(com.android.internal.widget.RecyclerView$ChildDrawingOrderCallback)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setChildDrawingOrderCallback_wjj5.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_resetFocusInfo_yde4 = com_android_internal_widget_RecyclerView_clz.resetFocusInfo.overload();
    com_android_internal_widget_RecyclerView_clz_method_resetFocusInfo_yde4.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.resetFocusInfo()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_resetFocusInfo_yde4.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_pullGlows_aumn = com_android_internal_widget_RecyclerView_clz.pullGlows.overload('float', 'float', 'float', 'float');
    com_android_internal_widget_RecyclerView_clz_method_pullGlows_aumn.implementation = function(v0, v1, v2, v3) {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.pullGlows(float,float,float,float)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_pullGlows_aumn.call(this, v0, v1, v2, v3);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchLayout_kktu = com_android_internal_widget_RecyclerView_clz.dispatchLayout.overload();
    com_android_internal_widget_RecyclerView_clz_method_dispatchLayout_kktu.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.dispatchLayout()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchLayout_kktu.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getBaseline_uxrp = com_android_internal_widget_RecyclerView_clz.getBaseline.overload();
    com_android_internal_widget_RecyclerView_clz_method_getBaseline_uxrp.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getBaseline()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getBaseline_uxrp.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_setOnScrollListener_jrxo = com_android_internal_widget_RecyclerView_clz.setOnScrollListener.overload('com.android.internal.widget.RecyclerView$OnScrollListener');
    com_android_internal_widget_RecyclerView_clz_method_setOnScrollListener_jrxo.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setOnScrollListener(com.android.internal.widget.RecyclerView$OnScrollListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setOnScrollListener_jrxo.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getAdapterPositionFor_wmhq = com_android_internal_widget_RecyclerView_clz.getAdapterPositionFor.overload('com.android.internal.widget.RecyclerView$ViewHolder');
    com_android_internal_widget_RecyclerView_clz_method_getAdapterPositionFor_wmhq.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'int com.android.internal.widget.RecyclerView.getAdapterPositionFor(com.android.internal.widget.RecyclerView$ViewHolder)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getAdapterPositionFor_wmhq.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchSaveInstanceState_564i = com_android_internal_widget_RecyclerView_clz.dispatchSaveInstanceState.overload('android.util.SparseArray');
    com_android_internal_widget_RecyclerView_clz_method_dispatchSaveInstanceState_564i.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.android.internal.widget.RecyclerView.dispatchSaveInstanceState(android.util.SparseArray)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchSaveInstanceState_564i.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getItemAnimator_n0de = com_android_internal_widget_RecyclerView_clz.getItemAnimator.overload();
    com_android_internal_widget_RecyclerView_clz_method_getItemAnimator_n0de.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ItemAnimator com.android.internal.widget.RecyclerView.getItemAnimator()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getItemAnimator_n0de.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_generateLayoutParams_j9dp = com_android_internal_widget_RecyclerView_clz.generateLayoutParams.overload('android.util.AttributeSet');
    com_android_internal_widget_RecyclerView_clz_method_generateLayoutParams_j9dp.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public android.view.ViewGroup$LayoutParams com.android.internal.widget.RecyclerView.generateLayoutParams(android.util.AttributeSet)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_generateLayoutParams_j9dp.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_saveFocusInfo_8n44 = com_android_internal_widget_RecyclerView_clz.saveFocusInfo.overload();
    com_android_internal_widget_RecyclerView_clz_method_saveFocusInfo_8n44.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.saveFocusInfo()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_saveFocusInfo_8n44.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findChildViewUnder_k62o = com_android_internal_widget_RecyclerView_clz.findChildViewUnder.overload('float', 'float');
    com_android_internal_widget_RecyclerView_clz_method_findChildViewUnder_k62o.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public android.view.View com.android.internal.widget.RecyclerView.findChildViewUnder(float,float)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findChildViewUnder_k62o.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getChildAdapterPosition_hzaq = com_android_internal_widget_RecyclerView_clz.getChildAdapterPosition.overload('android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_getChildAdapterPosition_hzaq.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getChildAdapterPosition(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getChildAdapterPosition_hzaq.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getNanoTime_douo = com_android_internal_widget_RecyclerView_clz.getNanoTime.overload();
    com_android_internal_widget_RecyclerView_clz_method_getNanoTime_douo.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'long com.android.internal.widget.RecyclerView.getNanoTime()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getNanoTime_douo.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_setAdapter_aj69 = com_android_internal_widget_RecyclerView_clz.setAdapter.overload('com.android.internal.widget.RecyclerView$Adapter');
    com_android_internal_widget_RecyclerView_clz_method_setAdapter_aj69.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setAdapter(com.android.internal.widget.RecyclerView$Adapter)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setAdapter_aj69.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_invalidateItemDecorations_2zv9 = com_android_internal_widget_RecyclerView_clz.invalidateItemDecorations.overload();
    com_android_internal_widget_RecyclerView_clz_method_invalidateItemDecorations_2zv9.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.invalidateItemDecorations()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_invalidateItemDecorations_2zv9.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_addItemDecoration_vknt = com_android_internal_widget_RecyclerView_clz.addItemDecoration.overload('com.android.internal.widget.RecyclerView$ItemDecoration');
    com_android_internal_widget_RecyclerView_clz_method_addItemDecoration_vknt.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.addItemDecoration(com.android.internal.widget.RecyclerView$ItemDecoration)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addItemDecoration_vknt.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_getMaxFlingVelocity_rtdp = com_android_internal_widget_RecyclerView_clz.getMaxFlingVelocity.overload();
    com_android_internal_widget_RecyclerView_clz_method_getMaxFlingVelocity_rtdp.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.getMaxFlingVelocity()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getMaxFlingVelocity_rtdp.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_getClipToPadding_zqan = com_android_internal_widget_RecyclerView_clz.getClipToPadding.overload();
    com_android_internal_widget_RecyclerView_clz_method_getClipToPadding_zqan.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.getClipToPadding()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_getClipToPadding_zqan.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_sendAccessibilityEventUnchecked_qz2i = com_android_internal_widget_RecyclerView_clz.sendAccessibilityEventUnchecked.overload('android.view.accessibility.AccessibilityEvent');
    com_android_internal_widget_RecyclerView_clz_method_sendAccessibilityEventUnchecked_qz2i.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.sendAccessibilityEventUnchecked(android.view.accessibility.AccessibilityEvent)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_sendAccessibilityEventUnchecked_qz2i.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_stopScroll_b106 = com_android_internal_widget_RecyclerView_clz.stopScroll.overload();
    com_android_internal_widget_RecyclerView_clz_method_stopScroll_b106.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.stopScroll()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_stopScroll_b106.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setClipToPadding_9p1l = com_android_internal_widget_RecyclerView_clz.setClipToPadding.overload('boolean');
    com_android_internal_widget_RecyclerView_clz_method_setClipToPadding_9p1l.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setClipToPadding(boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setClipToPadding_9p1l.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setChildImportantForAccessibilityInternal_fv2f = com_android_internal_widget_RecyclerView_clz.setChildImportantForAccessibilityInternal.overload('com.android.internal.widget.RecyclerView$ViewHolder', 'int');
    com_android_internal_widget_RecyclerView_clz_method_setChildImportantForAccessibilityInternal_fv2f.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'boolean com.android.internal.widget.RecyclerView.setChildImportantForAccessibilityInternal(com.android.internal.widget.RecyclerView$ViewHolder,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_setChildImportantForAccessibilityInternal_fv2f.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_dispatchContentChangedIfNecessary_r36w = com_android_internal_widget_RecyclerView_clz.dispatchContentChangedIfNecessary.overload();
    com_android_internal_widget_RecyclerView_clz_method_dispatchContentChangedIfNecessary_r36w.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.dispatchContentChangedIfNecessary()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_dispatchContentChangedIfNecessary_r36w.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_processAdapterUpdatesAndSetAnimationFlags_06x8 = com_android_internal_widget_RecyclerView_clz.processAdapterUpdatesAndSetAnimationFlags.overload();
    com_android_internal_widget_RecyclerView_clz_method_processAdapterUpdatesAndSetAnimationFlags_06x8.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.android.internal.widget.RecyclerView.processAdapterUpdatesAndSetAnimationFlags()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_processAdapterUpdatesAndSetAnimationFlags_06x8.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_addOnChildAttachStateChangeListener_sbbh = com_android_internal_widget_RecyclerView_clz.addOnChildAttachStateChangeListener.overload('com.android.internal.widget.RecyclerView$OnChildAttachStateChangeListener');
    com_android_internal_widget_RecyclerView_clz_method_addOnChildAttachStateChangeListener_sbbh.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.addOnChildAttachStateChangeListener(com.android.internal.widget.RecyclerView$OnChildAttachStateChangeListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addOnChildAttachStateChangeListener_sbbh.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_requestChildFocus_j7hu = com_android_internal_widget_RecyclerView_clz.requestChildFocus.overload('android.view.View', 'android.view.View');
    com_android_internal_widget_RecyclerView_clz_method_requestChildFocus_j7hu.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.requestChildFocus(android.view.View,android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_requestChildFocus_j7hu.call(this, v0, v1);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollOffset_espe = com_android_internal_widget_RecyclerView_clz.computeVerticalScrollOffset.overload();
    com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollOffset_espe.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.computeVerticalScrollOffset()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollOffset_espe.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_requestDisallowInterceptTouchEvent_vcs9 = com_android_internal_widget_RecyclerView_clz.requestDisallowInterceptTouchEvent.overload('boolean');
    com_android_internal_widget_RecyclerView_clz_method_requestDisallowInterceptTouchEvent_vcs9.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.requestDisallowInterceptTouchEvent(boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_requestDisallowInterceptTouchEvent_vcs9.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_findViewHolderForPosition_9tby = com_android_internal_widget_RecyclerView_clz.findViewHolderForPosition.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_findViewHolderForPosition_9tby.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView$ViewHolder com.android.internal.widget.RecyclerView.findViewHolderForPosition(int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findViewHolderForPosition_9tby.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_findNextViewToFocus_lshv = com_android_internal_widget_RecyclerView_clz.findNextViewToFocus.overload();
    com_android_internal_widget_RecyclerView_clz_method_findNextViewToFocus_lshv.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private android.view.View com.android.internal.widget.RecyclerView.findNextViewToFocus()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_findNextViewToFocus_lshv.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_predictiveItemAnimationsEnabled_6whf = com_android_internal_widget_RecyclerView_clz.predictiveItemAnimationsEnabled.overload();
    com_android_internal_widget_RecyclerView_clz_method_predictiveItemAnimationsEnabled_6whf.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private boolean com.android.internal.widget.RecyclerView.predictiveItemAnimationsEnabled()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_predictiveItemAnimationsEnabled_6whf.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_markItemDecorInsetsDirty_m75d = com_android_internal_widget_RecyclerView_clz.markItemDecorInsetsDirty.overload();
    com_android_internal_widget_RecyclerView_clz_method_markItemDecorInsetsDirty_m75d.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.markItemDecorInsetsDirty()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_markItemDecorInsetsDirty_m75d.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setScrollState_mqy7 = com_android_internal_widget_RecyclerView_clz.setScrollState.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_setScrollState_mqy7.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.setScrollState(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setScrollState_mqy7.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_setOnFlingListener_w65w = com_android_internal_widget_RecyclerView_clz.setOnFlingListener.overload('com.android.internal.widget.RecyclerView$OnFlingListener');
    com_android_internal_widget_RecyclerView_clz_method_setOnFlingListener_w65w.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.setOnFlingListener(com.android.internal.widget.RecyclerView$OnFlingListener)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_setOnFlingListener_w65w.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onEnterLayoutOrScroll_hatn = com_android_internal_widget_RecyclerView_clz.onEnterLayoutOrScroll.overload();
    com_android_internal_widget_RecyclerView_clz_method_onEnterLayoutOrScroll_hatn.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.onEnterLayoutOrScroll()';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_onEnterLayoutOrScroll_hatn.call(this);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_addFocusables_ngkg = com_android_internal_widget_RecyclerView_clz.addFocusables.overload('java.util.ArrayList', 'int', 'int');
    com_android_internal_widget_RecyclerView_clz_method_addFocusables_ngkg.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.addFocusables(java.util.ArrayList,int,int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_addFocusables_ngkg.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollRange_0jtp = com_android_internal_widget_RecyclerView_clz.computeVerticalScrollRange.overload();
    com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollRange_0jtp.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.android.internal.widget.RecyclerView.computeVerticalScrollRange()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_computeVerticalScrollRange_0jtp.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_offsetChildrenHorizontal_6l14 = com_android_internal_widget_RecyclerView_clz.offsetChildrenHorizontal.overload('int');
    com_android_internal_widget_RecyclerView_clz_method_offsetChildrenHorizontal_6l14.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.android.internal.widget.RecyclerView.offsetChildrenHorizontal(int)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_offsetChildrenHorizontal_6l14.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_method_onInterceptTouchEvent_px9d = com_android_internal_widget_RecyclerView_clz.onInterceptTouchEvent.overload('android.view.MotionEvent');
    com_android_internal_widget_RecyclerView_clz_method_onInterceptTouchEvent_px9d.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.onInterceptTouchEvent(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_onInterceptTouchEvent_px9d.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_requestChildRectangleOnScreen_7o83 = com_android_internal_widget_RecyclerView_clz.requestChildRectangleOnScreen.overload('android.view.View', 'android.graphics.Rect', 'boolean');
    com_android_internal_widget_RecyclerView_clz_method_requestChildRectangleOnScreen_7o83.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.requestChildRectangleOnScreen(android.view.View,android.graphics.Rect,boolean)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_requestChildRectangleOnScreen_7o83.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_hasFixedSize_br8y = com_android_internal_widget_RecyclerView_clz.hasFixedSize.overload();
    com_android_internal_widget_RecyclerView_clz_method_hasFixedSize_br8y.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public boolean com.android.internal.widget.RecyclerView.hasFixedSize()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_android_internal_widget_RecyclerView_clz_method_hasFixedSize_br8y.call(this);
        printBeat(beat);
        return ret;
    };
    var com_android_internal_widget_RecyclerView_clz_method_resumeRequestLayout_kg2v = com_android_internal_widget_RecyclerView_clz.resumeRequestLayout.overload('boolean');
    com_android_internal_widget_RecyclerView_clz_method_resumeRequestLayout_kg2v.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'void com.android.internal.widget.RecyclerView.resumeRequestLayout(boolean)';
        var beat = newMethodBeat(beatText, executor);
        com_android_internal_widget_RecyclerView_clz_method_resumeRequestLayout_kg2v.call(this, v0);
        printBeat(beat);
    };
    var com_android_internal_widget_RecyclerView_clz_init_dhic = com_android_internal_widget_RecyclerView_clz.$init.overload('android.content.Context');
    com_android_internal_widget_RecyclerView_clz_init_dhic.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView(android.content.Context)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = com_android_internal_widget_RecyclerView_clz_init_dhic.call(this, v0);
        printBeat(beat);
        return returnObj;
    };
    var com_android_internal_widget_RecyclerView_clz_init_hm6g = com_android_internal_widget_RecyclerView_clz.$init.overload('android.content.Context', 'android.util.AttributeSet', 'int');
    com_android_internal_widget_RecyclerView_clz_init_hm6g.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView(android.content.Context,android.util.AttributeSet,int)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = com_android_internal_widget_RecyclerView_clz_init_hm6g.call(this, v0, v1, v2);
        printBeat(beat);
        return returnObj;
    };
    var com_android_internal_widget_RecyclerView_clz_init_5emq = com_android_internal_widget_RecyclerView_clz.$init.overload('android.content.Context', 'android.util.AttributeSet');
    com_android_internal_widget_RecyclerView_clz_init_5emq.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public com.android.internal.widget.RecyclerView(android.content.Context,android.util.AttributeSet)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = com_android_internal_widget_RecyclerView_clz_init_5emq.call(this, v0, v1);
        printBeat(beat);
        return returnObj;
    };
});