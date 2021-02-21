import React from 'react';
import {Button, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {StackParams} from '..';
import {useAppState} from '../state/context';
import {logActivity} from '../api/Api';

type Props = {
  navigation: StackNavigationProp<StackParams, 'Activity'>;
  route: RouteProp<StackParams, 'Activity'>;
};
const Activity = (props: Props) => {
  const {state} = useAppState();

  const log = async () => {
    const date = new Date();
    try {
      const a = await logActivity({
        duration: 60,
        pk: state.email,
        sk: 'activity_' + props.route.params.id + '_' + date.toISOString(),
      });
      console.log(a);  
    } catch (error) {
      console.log(error);  
    }
    
  };
  return (
    <View>
      <Text>this is your activity page</Text>
      <Text>id: {props.route.params.id}</Text>
      <Text>name: {props.route.params.name}</Text>
      <Button title="I did this - yo!" onPress={log} />
      <Button
        title="go back to home"
        onPress={props.navigation.goBack}></Button>
    </View>
  );
};

export default Activity;
