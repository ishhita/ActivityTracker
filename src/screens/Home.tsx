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

type ExtractProps<T> = T extends React.ComponentClass<infer T, any> ? T : never;
type AuthProps = ExtractProps<Parameters<typeof withOAuth>[0]>;
export default function Home(props: Props & AuthProps) {
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
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const user = await profile.getUser(props.email);
      console.log({user});
      if (!('pk' in user) || !user.pk) {
        console.log({user});
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
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: 'brown',
        }}></View>
      <Button title="LOGOUT" onPress={props.signOut} />
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
