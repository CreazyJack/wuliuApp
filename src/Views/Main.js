import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {HomeList} from '../Components';
import {connect} from 'react-redux';
import SmsListener from 'react-native-android-sms-listener';

// console.log(subscription);
/* ----------------------- 获取全部短信列表 -----------------------*/
var filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

  /**
   *  the next 3 filters can work together, they are AND-ed
   *
   *  minDate, maxDate filters work like this:
   *    - If and only if you set a maxDate, it's like executing this SQL query:
   *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
   *    - Same for minDate but with "date >= minDate"
   */
  // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
  // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
  // bodyRegex: '(.*)How are you(.*)', // content regex to match

  /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
  // read: 0, // 0 for unread SMS, 1 for SMS already read
  // _id: 1234, // specify the msg id
  // thread_id: 12, // specify the conversation thread_id
  // address: '+1888------', // sender's phone number
  // body: 'How are you', // content to match
  /** the next 2 filters can be used for pagination **/
  // indexFrom: 0, // start from index 0
  // maxCount: 10, // count of SMS to return each time
};

class Main extends PureComponent {
  constructor() {
    super();
    this.state = {
      msgNum: 0,
    };
    this.subscription = SmsListener.addListener((message) => {
      console.log('msg', message);
      this.getMsgList();
    });
  }

  getMsgList = () => {
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        this.setState({msgNum: count});
        var arr = JSON.parse(smsList);
        let newArr = arr.map((item) => {
          return {
            time: item.data,
            body: item.body,
            address: item.address,
          };
        });
        this.props.dispatch({
          type: 'addMessage',
          data: newArr,
        });
      },
    );
  };

  testPress = () => {
    this.props.dispatch({
      type: 'logout',
    });
  };
  componentDidMount() {}
  componentWillUnmount() {
    this.subscription.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.testPress}> 已监听短信: </Text>
        <Text onPress={this.getMsgList}> 已获取短信: {this.state.msgNum}</Text>
        <HomeList tagList={this.props.mainReducer.data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapState = (state) => state;
export default connect(mapState)(Main);
