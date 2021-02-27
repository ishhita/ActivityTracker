import React from 'react';
import {Button, Text, View, Dimensions} from 'react-native';
import {withOAuth} from 'aws-amplify-react-native';
import Animation from 'lottie-react-native';

const Splash = withOAuth((props) => {
  const height = Dimensions.get('screen').height * 0.5;
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Animation
        style={{
          height,
        }}
        source={require('../lottieJsons/login.json')}
        autoPlay
      />
      <Text>Hobbit - Your Personal Habit Tracker</Text>
      <Button color="#582452" onPress={props.googleSignIn} title="Let's Sign You Up!"></Button>
    </View>
  );
});

export default Splash;
