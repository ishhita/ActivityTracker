import React from 'react';
import {Button, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {StackParams} from '..';

type Props = {
  navigation: StackNavigationProp<StackParams, 'Activity'>;
  route: RouteProp<StackParams, 'Activity'>;
};
const Activity = (props: Props) => {
  return (
    <View>
      <Text>this is your activity page</Text>
      <Text>id: {props.route.params.id}</Text>
      <Text>name: {props.route.params.name}</Text>
      <Button
        title="go back to home"
        onPress={props.navigation.goBack}></Button>
    </View>
  );
};

export default Activity;
