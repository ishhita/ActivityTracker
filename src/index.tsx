import React from 'react';
import {Button, Linking, Text, View} from 'react-native';
import Amplify, {Auth, Hub} from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {withOAuth} from 'aws-amplify-react-native';
import config from './aws-exports';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Splash from './Splash';

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

const Stack = createStackNavigator();

const App = (props: any) => {
  const {oAuthUser, googleSignIn, signOut} = props;
  const email = oAuthUser?.attributes?.email;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {email ? (
          <Stack.Screen name="Home">
            {(props) => <Home {...props} email={email} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Home" component={Splash} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withOAuth(App);
