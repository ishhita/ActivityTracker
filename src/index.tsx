import React from 'react';
import {Linking} from 'react-native';
import Amplify from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {withOAuth} from 'aws-amplify-react-native';
import config from './aws-exports';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Splash from './screens/Splash';
import Activity from './screens/Activity';

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
