import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Alert,
  PermissionsAndroid,
  StyleSheet,
  FlatList,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {HomeList} from '../Components';
/* ----------------------- 获取全部短信列表 -----------------------*/
// var filter = {
//   box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

//   /**
//    *  the next 3 filters can work together, they are AND-ed
//    *
//    *  minDate, maxDate filters work like this:
//    *    - If and only if you set a maxDate, it's like executing this SQL query:
//    *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
//    *    - Same for minDate but with "date >= minDate"
//    */
//   // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
//   // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
//   bodyRegex: '(.*)How are you(.*)', // content regex to match

//   /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
//   read: 0, // 0 for unread SMS, 1 for SMS already read
//   _id: 1234, // specify the msg id
//   thread_id: 12, // specify the conversation thread_id
//   address: '+1888------', // sender's phone number
//   body: 'How are you', // content to match
//   /** the next 2 filters can be used for pagination **/
//   indexFrom: 0, // start from index 0
//   maxCount: 10, // count of SMS to return each time
// };
// SmsAndroid.list(
//   JSON.stringify(filter),
//   (fail) => {
//     console.log('Failed with this error: ' + fail);
//   },
//   (count, smsList) => {
//     console.log('Count: ', count);
//     console.log('List: ', smsList);
//     var arr = JSON.parse(smsList);

//     arr.forEach(function (object) {
//       console.log('Object: ' + object);
//       console.log('-->' + object.date);
//       console.log('-->' + object.body);
//     });
//   },
// );

export default class Main extends PureComponent {
  requestReadSmsPermission = async () => {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: '阅读短信',
          message: '需要获取阅读短信权限',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          {
            title: '接收短信',
            message: '需要获取接收短信权限',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('RECEIVE_SMS permissions granted', granted);
        } else {
          console.log('RECEIVE_SMS permissions denied');
        }
      } else {
        console.log('sms read permissions denied');
      }
    } catch (err) {
      console.log(err);
    }
  };
  testPress = () => {
    this.requestReadSmsPermission();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.testPress}> 已监听短信: </Text>
        <HomeList tagList={[1, 2, 3, 4, 5, 6]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
});
