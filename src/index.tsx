import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import Amplify, {Analytics} from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {withOAuth} from 'aws-amplify-react-native';
import DeviceInfo from 'react-native-device-info';

import config from './aws-exports';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Splash from './screens/Splash';
import Activity from './screens/Activity';

// get the notification data when notification is received
PushNotification.onNotification((notification) => {
  // Note that the notification object structure is different from Android and IOS
  console.log('in app notification', notification);
});

// get the registration token
// This will only be triggered when the token is generated or updated.
PushNotification.onRegister((token) => {
  console.log('in app registration', token);
});

// get the notification data when notification is opened
PushNotification.onNotificationOpened((notification) => {
  console.log('the notification is opened', notification);
});

async function urlOpener(url: string, redirectUrl: string) {
  await InAppBrowser.isAvailable();
  // @ts-ignore
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});

export type StackParams = {
  Home: undefined;
  Splash: undefined;
  Activity: {id: string; name: string};
};
const Stack = createStackNavigator<StackParams>();

const App = (props: any) => {
  const {oAuthUser} = props;
  const email = oAuthUser?.attributes?.email;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {email ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} email={email} />}
            </Stack.Screen>
            <Stack.Screen name="Activity" component={Activity}></Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Splash" component={Splash} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withOAuth(App);
