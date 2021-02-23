import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ago from 's-ago';

import {StackParams} from '..';
import {useProfile} from '../store/UserStore';
import {useActivityLogs} from '../store/ActivityLogStore';

type Props = {
  navigation: StackNavigationProp<StackParams, 'Activity'>;
  route: RouteProp<StackParams, 'Activity'>;
};
const Activity = (props: Props) => {
  const activityId = props.route.params.id;
  const activityName = props.route.params.name;
  const user = useProfile();

  const isFavAlready = user.activities[activityId];
  const activity = useActivityLogs();

  const log = async () => {
    const date = new Date();

    activity.logActivity(activityId, {
      duration: 60,
      pk: user.pk,
      sk: 'activity_' + activityId + '_' + date.toISOString(),
    });
  };

  return (
    <View>
      <Text>this is your activity page</Text>
      <Text>id: {activityId}</Text>
      <Text>name: {activityName}</Text>
      {!isFavAlready && (
        <Button
          onPress={() => user.markActivityFav(activityId)}
          title="mark fav and start tracking"></Button>
      )}
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          margin: 20,
          backgroundColor: 'black',
        }}></View>

      {isFavAlready && <Button title="I did this - yo!" onPress={log} />}
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          margin: 20,
          backgroundColor: 'black',
        }}></View>
      <Button
        title="go back to home"
        onPress={props.navigation.goBack}></Button>

      <View
        style={{
          height: StyleSheet.hairlineWidth,
          margin: 20,
          backgroundColor: 'black',
        }}></View>

      <Text>All past activites</Text>
      <FlatList
        keyExtractor={(item) => item.sk}
        data={activity.logs[activityId] || {}}
        renderItem={({item: a}) => (
          <View
            key={a.sk}
            style={{backgroundColor: '#afafaf', margin: 20, padding: 10}}>
            <Text>
              done{' '}
              {ago(
                new Date(
                  a.sk.replace('activity_', '').replace(activityId + '_', ''),
                ),
              )}
            </Text>
            <Text>for --- {a.duration} mins</Text>
          </View>
        )}></FlatList>
    </View>
  );
};

export default Activity;
