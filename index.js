/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import PushNotification ,{Importance}from "react-native-push-notification";
import { POPUP_CHANNEL_ID,localNotificationService,SILENT_CHANNEL_ID } from './src/NotificationServices/LocalNotificationService';
import {name as appName} from './app.json';



/**
 * Createing Notification channels
 */
PushNotification.createChannel({
    channelId:POPUP_CHANNEL_ID,
    channelName:'Mobile Pharmacy',
    soundName:'default',
    importance:Importance.HIGH,
    vibrate:true,
},(created)=>console.log(`createChannel Returned '${created}'`)
);

PushNotification.createChannel(
    {
        channelId: SILENT_CHANNEL_ID, // (required)
        channelName: 'Tabo customer silent', // (required)
        channelDescription: 'A channel to group your notifications', // (optional) default: undefined.
        importance: Importance.LOW, // (optional) default: 4. Int value of the Android notification importance
        vibrate: false, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


/**
 * Register background handler
 */
 messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
   
    setTimeout(() => {
        localNotificationService.groupNotifications();
    }, 8000);
});


AppRegistry.registerComponent(appName, () => App);

