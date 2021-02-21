import React from 'react';
import {Button, Text, View} from 'react-native';
import {withOAuth} from 'aws-amplify-react-native';

const Splash = withOAuth((props) => {
  return (
    <View>
      <Text>splash screen - not logged in</Text>
      <Button onPress={props.googleSignIn} title="Google sign in"></Button>
    </View>
  );
});

export default Splash;
