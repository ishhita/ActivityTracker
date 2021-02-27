import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StackParams} from '../index';
import defaultActivities from '../utils/default-activity-list';
import {useProfile} from '../store/UserStore';
import {User} from '../../types/models';
import {withOAuth} from 'aws-amplify-react-native';
import DeviceInfo from 'react-native-device-info';
import {Analytics} from 'aws-amplify';
import {sendPush} from '../api/API';

type Props = {
  email: string;
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home(props: Props) {
  const [message, setMessage] = useState('');
  const profile = useProfile();

  useEffect(() => {
    if (props.email) {
      Analytics.updateEndpoint({
        userId: props.email,
      });
    }

    const bootstrap = async () => {
      const user = await profile.getUser(props.email);

      // profile.setUser({
      //   ...user,
      //   deviceIds: [...(user.deviceIds || []), deviceId],
      // });
      if (!('pk' in user) || !user.pk) {
        registerNewUser();
      } else {
        // if (user && user.deviceIds && !user.deviceIds.includes(deviceId)) {
        // }
      }
    };
    bootstrap();
  }, []);

  const registerNewUser = async () => {
    try {
      setMessage('First time user, creating a profile...');
      const userPayload: User = {
        pk: props.email,
        sk: 'profile',
        proDate: 0,
        activities: {},
        deviceIds: [DeviceInfo.getUniqueId()],
      };

      await profile.setUser(userPayload);
      setMessage('Profile created!');
    } catch (error) {}
  };

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
      <Button
        title="Send push notification"
        onPress={() => {
          sendPush({
            message: 'send via app ' + Math.random() * 100,
            title: 'yo push',
            users: [props.email],
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }}></Button>
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
