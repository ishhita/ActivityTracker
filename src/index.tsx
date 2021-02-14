import React from 'react';
import {Text} from 'react-native';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const App = () => {
  return <Text>hello, world </Text>;
};

export default App;
