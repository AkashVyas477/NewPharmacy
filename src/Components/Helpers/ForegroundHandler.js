
// import PushNotification, { Importance } from "react-native-push-notification";
// import React,{useEffect} from 'react';
// import messaging from '@react-native-firebase/messaging';

// const ForegroundHandler =()=>{
//     useEffect(()=>{
//         const unsubscribe = messaging().onMessage((remoteNessage)=>{
//             const {notification,messageId}=remoteNessage

//             PushNotification.createChannel(
//               {
//                 channelId: "channel-id", // (required)
//                 channelName: "My channel", // (required)
//                 channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//                 playSound: true, // (optional) default: true
//                 soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//                 importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
//                 vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//               },
//               (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//             );


//             PushNotification.localNotification({
//                 channelId:"channel-id",
//                 id:messageId,
//                 body:notification.body,
//                 title:notification.title,
//                 soundName:'default',
//                 vibrate:true,
//                 playSound:true,
//             })
//             console.log("Handle in foreground --------->",remoteNessage)



//               PushNotification.getChannels(function (channel_ids) {
//                 console.log(channel_ids); // ['channel_id_1']
//               });
            
//         })
//         return unsubscribe
//     },[])


//     return null
// }

// export default ForegroundHandler