   //cordova.define("cordova-plugin-dialog.MyDialog",function(require, exports, module) {
   var exec = require('cordova/exec');
   module.exports = {
           show: function (content,success,error){
           exec(success,error,"CustomDialog","show",[content]);
           }
       }
   //});