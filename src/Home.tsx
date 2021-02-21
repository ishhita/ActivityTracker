import {actionIcon} from '@aws-amplify/ui';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import api from './API';
import defaultActivities from './DefaultActivities';
type Props = {
  email: string;
};

export default function Home(props: Props) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const fetchUser = async () => {
    try {
      const user = await api.get(`/user/${props.email}`);
      console.log({user});
      if (Object.keys(user).length === 0) {
        setMessage('First time user, creating a profile...');
        const response = await api.put(`/user/${props.email}`, {
          pk: props.email,
          sk: 'profile',
          proDate: 0,
          activities: [],
          friends: [],
        });
        console.log('response', response);
        setMessage('Profile created!');
      }
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
        {defaultActivities.map((activity) => (
          <View style={{margin: 4, padding: 8}} key={activity.id}>
            <Button onPress={() => {}} title={activity.name}></Button>
          </View>
        ))}
      </View>
    </View>
  );
}
