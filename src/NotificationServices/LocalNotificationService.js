import PushNotification,{Importance} from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import { t } from "i18n-js";
import { firebase } from "@react-native-firebase/messaging";
import { SequencedTransition } from "react-native-reanimated";


const CHANNEL_ID = `Mobile-Pharmacy-ChannelID`;
export const POPUP_CHANNEL_ID ='Mobile-Pharmacy';
export const SILENT_CHANNEL_ID ='Mobile-Pharmacy-Silent';

class LocalNotificationService {
    configure= (onOpenNotification, remoteMessage)=>{
        PushNotification.configure({
            onRegister:function(token){},
            onNotification:function(notification){
                console.log("[LocalNotificationService] onNotification:---->",notification);
                if(!notification?.data){
                    return;
                }
                notification.userInteraction=true;
                onOpenNotification(notification.data,remoteMessage);
            
                if (Platform.OS === "ios"){
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
            },
            //IOS Only Permissions to register.
            permissions:{
                alert:true,
                badge:true,
                sound:true,
            },
            popInitialNotification:true,
            requestPermissions:true,
        });
    };

    unregister =()=>{
        PushNotification.unregister();
    };

    showNotification =(notification,messageId,data={})=>{
        PushNotification.localNotification({
            ...this.buildAndroidNotification(notification,messageId,data),
            ...this.buildIOSNotification(notification,messageId,data),

            body:notification.body || "",
            title:notification.title || "",
            playSound:false,
            soundName: "default",
            userInteraction:true,
        });
    };

    sendChannelId =(data)=>{
        const channel = new firebase.notifications.Notification()
        .setNotificationId(CHANNEL_ID)
        .setTitle(_T("notification.channel.alert.description"))
        .setData(data)
        .android.setAutoCancel(true)
        .android.setCategory(firebase.notifications.Android.Category.Message)
        .android.setChannelId(getChannelId(MsgType.Alert))
        .android.setColor(variables.scheme.primaryColor)
        .android.setSmallIcon(STATUS_ICON)
        .android.setGroup(ALERTS_GROUP)
        .android.setGroupSummary(true)
        .android.setGroupAlertBehaviour(
            firebase.notifications.Android.GroupAlert.Children
           );
           sendIt(channel);
    };


    buildAndroidNotification = (id, title, message, data = {}) => {
        return {
      //    id: id,
         channelId: POPUP_CHANNEL_ID,
         autoCancel: true,
         largeIcon: options.largeIcon || "ic_launcher",
         smallIcon: options.smallIcon || "ic_notification",
         bigText: message || "",
         ignoreInForeground: false,
         subText: title || "",
         vibrate: options.vibrate || true,
         vibration: options.vibration || 300,
         priority: options.priority || "high",
         importance: options.importance || "high", // (optional) set notification importance, default: high,
         data: data,
        };
       };


       buildIOSNotification = (id, title, message, data = {}) => {
        return {
          //  id: id,
         alertAction: options.alertAction || "view",
         category: options.category || "",
         userInfo: {
          id: id,
          item: data,
         },
        };
       };


       cancelAllLocalNotifications = () => {
        if (Platform.OS === "ios") {
         PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
         PushNotification.cancelAllLocalNotifications();
        }
       };


}

export const localNotificationService = new LocalNotificationService();