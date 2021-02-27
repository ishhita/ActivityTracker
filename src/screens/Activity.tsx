<<<<<<< HEAD
import React, { useState } from 'react';
import {Button, Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
=======
import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
>>>>>>> main
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ago from 's-ago';

import {StackParams} from '..';
import {useProfile} from '../store/UserStore';
import {useActivityLogs} from '../store/ActivityLogStore';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import activityJsonMapper from '../utils/activityJsonMapper';
import Animation from 'lottie-react-native';
import CalendarStrip from 'react-native-calendar-strip';

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
    activity.getActivityLog()
  }
  const json = activityJsonMapper[activityName];
  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
  ];
  return (
    <ScrollView>
      <View style={{backgroundColor: 'white', display: 'flex', width: '100%', height: '100%'}}>
        <View style={{backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          <Animation
            style={{
              height: 100,
            }}
            source={json}
            autoPlay
          />
          <Text style={{fontWeight: 'bold', color: '#893a77', fontSize: 20}}>{activityName}</Text>
        </View>
        {!isFavAlready ? (
          <TouchableOpacity
            onPress={() => user.markActivityFav(activityId)}
            activeOpacity={.8}
                style={{backgroundColor: 'white',  justifyContent: 'center', display:'flex', elevation: 5, padding: 10, marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}
           >
            <Text style={{color: '#893a77', fontWeight: '100', alignSelf: 'center'}}>Mark as Habit</Text>
          </TouchableOpacity>
        ) : <View
              style={{backgroundColor: '#893a77',  justifyContent: 'center', display:'flex', padding: 10, marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}
            >
              <Text style={{color: 'white', fontWeight: '100', alignSelf: 'center'}}>Marked in your HobbitHole</Text>
            </View>}
            <View style={{display: 'flex',margin: 10, justifyContent: 'center', alignItems: 'center', flex: 1}}>
               {/* @ts-ignore */}
               {false && <CalendarStrip
                scrollable
                style={{height:200, paddingTop: 20, paddingBottom: 10}}
                calendarColor={'#3343CE'}
                calendarHeaderStyle={{color: 'white'}}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                iconContainer={{flex: 0.1}}
              />}
            </View>
        {/* <View
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
          }}></FlatList> */}
      </View>
    </ScrollView>
  );
};

export default Activity;
