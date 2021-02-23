/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ACTIVITYTABLE_ARN
	STORAGE_ACTIVITYTABLE_NAME
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

AWS.config.update({region: process.env.TABLE_REGION});

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = 'activityTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

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

app.get('/activities/:email/:activity', function (req, res) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'pk = :pkVal and begins_with (sk, :skVal)',
    ExpressionAttributeValues: {
      ':pk': req.params.email,
      ':sk': req.params.activity,
    },
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      console.log(err);
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'success', url: req.url, data: data});
    }
  });
});

app.listen(3000, function () {
  console.log('App started');
});

module.exports = app;
