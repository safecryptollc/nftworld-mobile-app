/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */


// Rename this to index.js to know the bugs in production


// import { Alert } from 'react-native';
// import * as Sentry from 'sentry-expo';

// Sentry.init({
//     dsn: 'https://a2afa903566f407ab1519fa6fec90821@o1360732.ingest.sentry.io/6648999',
//     enableInExpoDevelopment: true,
//     debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

// import Instabug from 'instabug-reactnative';
// Instabug.start('07c287a8d52a7aa7dfd68dca68d5dbe8', [Instabug.invocationEvent.shake, Instabug.invocationEvent.screenshot]);
import {
    setJSExceptionHandler,
    setNativeExceptionHandler,
} from 'react-native-exception-handler';
import email from 'react-native-email'

import './global';
import { registerRootComponent, scheme } from 'expo';
const { default: App } = require("./AppWithProviders");



registerRootComponent(App);

// const handleEmail = (error, isFatal) => {
//     console.log(error);
//     return true;
//     // const to = ['sadutdy@gmail.com'] // string or array of email addresses
//     // email(to, {
//     //     // Optional additional arguments
//     //     cc: [], // string or array of email addresses
//     //     subject: 'NFT WORLD APP BUG ISFATAL = ' + isFatal,
//     //     body: JSON.stringify(error),
//     //     checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
//     // }).catch(console.error)
// }


// const handleError = (e, isFatal) => {
//     if (isFatal) {

//         Alert.alert(
//             "Unexpected error occurred",
//             `
//         Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}

//         We have reported this to our team ! Please close the app and start again!
//         `
//         );
//     } else {
//         console.log(e); // So that we can see it in the ADB logs in case of Android if needed
//     }
// };

// setJSExceptionHandler((e, isFatal) => {
//     console.log('caught global error');
//     handleError(e, isFatal);
// }, true);

// setNativeExceptionHandler((errorString) => {
//     handleError([errorString]);
//     // console.log(errorString);
// });





