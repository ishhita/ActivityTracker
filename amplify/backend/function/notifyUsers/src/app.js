/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	AUTH_ACTIVITYTRACKERBF35F7F5_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');
// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.post('/notify', function (req, res) {
  var pinpoint = new AWS.Pinpoint();
  const {message, title, users} = req.body;
  const hash = users.reduce((map, curr) => {
    map[curr] = {
      BodyOverride: 'BodyOverride - dev',
      TitleOverride: ' Dev Title',
    };
    return map;
  }, {});
  console.log(process.env.PINPOINT_ID, 'pinpoint id');

  var params = {
    ApplicationId: process.env.PINPOINT_ID,
    SendUsersMessageRequest: {
      MessageConfiguration: {
        DefaultMessage: {
          Body: 'DefaultMessage - dev',
        },
        DefaultPushNotificationMessage: {
          Action: 'OPEN_APP',
          Body: 'DefaultPushNotificationMessage - dev',
          SilentPush: false,
          Title: 'Title - Dev',
        },
        GCMMessage: {
          Action: 'OPEN_APP',
          Body: 'GCMMessage - dev',
          SilentPush: false,
          Title: ' Dev',
        },
      },
      Users: hash,
    },
  };
  pinpoint.sendUsersMessages(params, function (err, data) {
    if (err) {
      res.statusCode = 500;
      console.log(err);
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({
        success: 'post call succeed!',
        url: req.url,
        body: req.body,
        data: JSON.stringify(data),
      });
    }
  });

  // Try to send the message.
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
