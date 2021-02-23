import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ago from 's-ago';

import {StackParams} from '..';
import {useProfile} from '../store/UserStore';
import {useActivityLogs} from '../store/ActivityLogStore';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  navigation: StackNavigationProp<StackParams, 'Activity'>;
  route: RouteProp<StackParams, 'Activity'>;
};
const Activity = (props: Props) => {
  const activityId = props.route.params.id;
  const activityName = props.route.params.name;
  const user = useProfile();

  const [date, setDate] = useState('2021-02');

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

  const getFromServer = () => {
    activity.getActivityLog(user.pk, `${activityId}_${date}`, activityId);
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

      <View
        style={{
          height: StyleSheet.hairlineWidth,
          margin: 20,
          backgroundColor: 'black',
        }}></View>
      <Button onPress={getFromServer} title="get from server" />
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          margin: 20,
          backgroundColor: 'black',
        }}></View>

      <Text>All past activites</Text>
      <FlatList
        keyExtractor={(item) => item}
        data={Object.keys(activity.logs[activityId] || {})}
        renderItem={({item}) => {
          const eachActivity = activity.logs[activityId][item];
          return (
            <View
              key={eachActivity.sk}
              style={{backgroundColor: '#afafaf', margin: 20, padding: 10}}>
              <Text>
                done{' '}
                {ago(
                  new Date(
                    eachActivity.sk
                      .replace('activity_', '')
                      .replace(activityId + '_', ''),
                  ),
                )}
              </Text>
              <Text>for --- {eachActivity.duration} mins</Text>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

export default Activity;
