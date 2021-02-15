import React from 'react';
import {Button, Linking, Text, View} from 'react-native';
import Amplify, {Auth, Hub} from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {withOAuth} from 'aws-amplify-react-native';
import config from './aws-exports';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
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

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>logged in </Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App = (props: any) => {
  const {oAuthUser, googleSignIn, signOut} = props;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {oAuthUser ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
      <View>
        <Text>
          User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}
        </Text>
        {oAuthUser ? (
          <Button title="Sign Out" onPress={signOut} />
        ) : (
          <>
            <Button title="Google" onPress={googleSignIn} />
          </>
        )}
      </View>
    </NavigationContainer>
  );
};

export default withOAuth(App);
