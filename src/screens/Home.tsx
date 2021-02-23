import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StackParams} from '../index';
import defaultActivities from '../utils/default-activity-list';
import {useProfile} from '../store/UserStore';
import {User} from '../../types/models';
import {withOAuth} from 'aws-amplify-react-native';

type Props = {
  email: string;
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home(props: Props) {
  const [message, setMessage] = useState('');
  const profile = useProfile();

  const registerNewUser = async () => {
    try {
      setMessage('First time user, creating a profile...');
      const userPayload: User = {
        pk: props.email,
        sk: 'profile',
        proDate: 0,
        activities: {},
      };

      await profile.setUser(userPayload);
      setMessage('Profile created!');
    } catch (error) {}
  };

  useEffect(() => {
    const bootstrap = async () => {
      const user = await profile.getUser(props.email);

      if (!('pk' in user) || !user.pk) {
        registerNewUser();
      }
    };
    bootstrap();
  }, []);

  return (
    <View>
      <Text>Hello, {props.email}</Text>
      <Text style={{color: 'blue', fontSize: 30, textAlign: 'center'}}>
        {message}
      </Text>

      <Text style={{fontWeight: '600', color: 'green'}}>
        my current tracking activities
      </Text>
      <Text style={{fontWeight: '900', color: 'violet'}}>
        {Object.keys(profile.activities)
          .map((s) => s.substring(0, s.indexOf('-')))
          .join('       ')}
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
