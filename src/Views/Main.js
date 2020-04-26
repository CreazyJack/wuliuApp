import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, AppState, Button} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {HomeList} from '../Components';
import {connect} from 'react-redux';
import SmsListener from 'react-native-android-sms-listener';
import BackgroundJob from 'react-native-background-job';

const test = {
  jobKey: 'myJob',
  job: () =>
    setInterval(() => {
      console.log(1);
    }, 1000),
};
BackgroundJob.register(test);

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
      appState: AppState.currentState,
    };
    this.subscription = SmsListener.addListener((message) => {
      // console.log('msg', message);
      this.getMsgList();
    });
  }

  getMsgList = () => {
    console.log('获取所有短信');
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

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/background/)) {
      console.log('App has come to the foreground!');
      this.getMsgList();
    }
    this.setState({appState: nextAppState});
  };

  componentDidMount() {
    this.backgroundJob;
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    this.subscription.remove();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text onPress={this.testPress}> 已监听短信: </Text> */}
        <Text onPress={this.getMsgList}> 已获取短信: {this.state.msgNum}</Text>
        <View style={styles.btn}>
          <Button title="获取所有短信" onPress={this.getMsgList} />
        </View>
        <View style={styles.btn}>
          <Button title="点击上传" onPress={() => console.log('已上传')} />
        </View>
        {/* <HomeList tagList={this.props.mainReducer.data} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginVertical: 10,
    width: '80%',
  },
});

const mapState = (state) => state;
export default connect(mapState)(Main);
