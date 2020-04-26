/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, AppState, Button, Modal} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {HomeList} from '../Components';
import {connect} from 'react-redux';
import SmsListener from 'react-native-android-sms-listener';
import BackgroundJob from 'react-native-background-job';
import BackgroundTimer from 'react-native-background-timer';

// const test = {
//   jobKey: 'myJob',
//   job: () => {
//     let a = 1;
//     setInterval(() => {
//       console.log(++a);
//     }, 1000);
//   },
// };
// BackgroundJob.register(test);
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
      modalVisible: false,
    };
    this.subscription = SmsListener.addListener((message) => {
      // console.log('msg', message);
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
        console.log('获取所有短信', count);

        var arr = JSON.parse(smsList);
        // console.log(arr);
        let newArr = arr.map((item) => {
          return {
            id: item._id,
            time: item.date,
            body: item.body,
            address: item.address,
          };
        });
        console.log(newArr);
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
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      this.getMsgList();
    }
    this.setState({appState: nextAppState});
  };

  registerJob = () => {
    console.log(this.props.mainReducer.hasRegister);
    if (!this.props.mainReducer.hasRegister) {
      let a = 1;
      const intervalId = BackgroundTimer.setInterval(() => {
        // this will be executed every 200 ms
        // even when app is the the background
        this.getMsgList();
        console.log('timer', ++a);
      }, 2000);
      this.props.dispatch({
        type: 'registerJob',
      });
    }
    return;
  };
  cancelJob = () => {
    if (!this.props.mainReducer.hasRegister) {
      BackgroundTimer.stop();
    }
    return;
  };
  componentDidMount() {
    // this.cancelJob();
    this.registerJob();
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
        <View style={styles.btn}>
          <Button
            title={`已获取短信(${this.state.msgNum})`}
            onPress={() => this.setState({modalVisible: true})}
          />
        </View>
        <View style={styles.btn}>
          <Button title="获取所有短信" onPress={this.getMsgList} />
        </View>
        <View style={styles.btn}>
          <Button title="点击上传" onPress={() => console.log('已上传')} />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
            this.setState({modalVisible: false});
          }}>
          <View style={styles.container}>
            <HomeList tagList={this.props.mainReducer.data} />
          </View>
        </Modal>
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
