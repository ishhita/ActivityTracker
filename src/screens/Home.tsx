import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import api from '../api/ApiCaller';
import {StackParams} from '../index';
import defaultActivities from '../utils/default-activity-list';
import {createUser, getUser} from '../api/Api';
import {useAppState} from '../state/context';

type Props = {
  email: string;
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home(props: Props) {
  const {dispatch} = useAppState();
  const [message, setMessage] = useState('');

  const fetchUser = async () => {
    try {
      const user = await getUser(props.email);

      if (Object.keys(user).length !== 0) {
        dispatch({type: 'SET_USER', payload: user});
        return;
      }

      setMessage('First time user, creating a profile...');
      const userPayload = {
        pk: props.email,
        sk: 'profile',
        proDate: 0,
        activities: [],
        friends: {},
      };
      await createUser(userPayload);
      setMessage('Profile created!');
      dispatch({type: 'SET_USER', payload: userPayload});
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <View>
      <Text>Hello, {props.email}</Text>
      <Text style={{color: 'blue', fontSize: 30, textAlign: 'center'}}>
        {message}
      </Text>
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: 'brown',
        }}></View>
      <Text>Pick a new activity</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {defaultActivities.map(({id, name}) => (
          <View style={{margin: 4, padding: 8}} key={id}>
            <Button
              onPress={() => {
                props.navigation.navigate('Activity', {
                  id: id,
                  name: name,
                });
              }}
              title={name}></Button>
          </View>
        ))}
      </View>
    </View>
  );
}
