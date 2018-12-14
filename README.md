# DialogCordovaPlugin
Android Cordova 插件开发之自定义插件生成安装包,首先说明下为什么要给这个插件生成一个安装包， 因为我自定义一个插件测试都好好地，等下一次在目中再添加一个
第三方插件或者cordova项目build的时候，发现刚才写的配置全部被清空了，让人很蛋疼。你总不能次次反复添加吧，然后在网上找了一些资料学习了下，把过程记录这里
便于自己使用以及他人学习。我把cordova自定义插件分为两个步骤，第一步，在Android项目中去定义配置插件数据至测试成功；2、第二步，将刚才在项目中写的类
以及配置文件封装成安装包。Ok,下面我们开始

一、第一步：自定义一个dialog插件，供web调用，显示系统弹窗。
  1、新建一个包名，在java/org/apache/cordova目录下新建dialog文件，然后创建CustomDialog的类；
  2、CustomDialog继承CordovaPlugin   --------------> CustomDialog extends CordovaPlugin
  然后去重写execute(String action, CordovaArgs args, CallbackContext callbackContext)这个方法
  参数说明：
     action:一个类可以调用多个功能，action指明了具体调用哪个功能；
     args:web以json的数据格式传递给Android native，CordovaArgs 是对JSONArray 的一个封装;
     callbackContext:这个是回调给web，有success和error两种回调方法。可以把参数回调给web端
  列如：
  @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        if("show".equals(action)){
            AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity());
            builder.setTitle("提示");
            builder.setMessage(args.getString(0));
            builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                    callbackContext.success("点击了确定");
                }
            });
            builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                    callbackContext.error("点击了取消");
                }
            });
            builder.create().show();
            return true;
        }
        return super.execute(action, args, callbackContext);
    }
    
    如果web使用了CustomDialog插件，并调用show方法（action）。这时候，会弹出一个系统窗口，会显示web传过来的消息内容，点击确定，回调web，
    告诉它调用成功，取消则是失败。最后记得return true（表示调用成功）。
    
    
    
    

