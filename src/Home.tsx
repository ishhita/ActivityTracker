import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  email: string;
};

export default function Home(props: Props) {
  return (
    <View>
      <Text>Hello, {props.email}</Text>
    </View>
  );
}
