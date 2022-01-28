// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';

import {
  get,
  post,
  Request,
  requestBody,
  response,
  RestBindings,
} from '@loopback/rest';
var FCM = require('fcm-node');
// import {inject} from '@loopback/core';

export class FirebaseapiController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/hello')
  hello(@requestBody() payment: any) {
    sendMsg();
    return 'this is testing from backend';
  }
}
function sendMsg() {
  let serverKey =
    'AAAAuStBKyE:APA91bGb1kLt7_m3Sv5X2XdUg0lLRbA71XtGueZ4nCg-qblPE0xZykrYx4O-gajYcefUw_U9TvgygTicV_vTtLG3BSnDdubwSx2qBmuYGotIAH0rsuPA6QBI3Bqr2SOupwMjSibUAhg8';
  var fcm = new FCM(serverKey);
  var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'dYp9uTx2alwYGisU6iI2G0:APA91bEmDdhP4bn4tGvuZP2CJ-vLnkzws7Cexm4HGdcLSi5vByyYXQQI10QAVgdqVIsvyx7jcDhA7yXn5Sd1CvJGdBZAHlDK3xGOEKiz8_4yJUt5ZVwm0RRbLvz-CXykLZ4ih4FbOr7B',
    collapse_key: 'your_collapse_key',

    notification: {
      title: 'this is success msg ',
      body: 'Body of your push notification',
    },

    data: {
      //you can send only notification or only data(or include both)
      my_key: 'my value',
      my_another_key: 'my another value',
    },
  };

  try {
    fcm.send(message, function (err: any, response: any) {
      if (err) {
        return 'something went Wrong';
      } else {
        return response;
      }
    });
  } catch (err) {
    console.log(err);
  }
}
