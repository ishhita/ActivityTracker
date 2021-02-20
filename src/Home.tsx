import API from '@aws-amplify/api';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

type Props = {
  email: string;
};

export default function Home(props: Props) {
  const [user, setUser] = useState({});
  const fetchUser = () => {
    console.log(props.email);
    API.get('activityStore', '/log/:activity', {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchUser();
  });
  return (
    <View>
      <Text>Hello, {props.email}</Text>
      <Button onPress={fetchUser} title=" call api"></Button>
    </View>
  );
}
