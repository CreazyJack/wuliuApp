import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
class Address extends PureComponent {
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
  loginPress = () => {
    this.props.dispatch({
      type: 'login',
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}> 网关: </Text>
          <TextInput style={styles.inputText} placeholder="请输入网关" />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}> 令牌: </Text>
          <TextInput
            style={styles.inputText}
            placeholder="请输入令牌(没有令牌请联系我们)"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}> 权限: </Text>
          <TouchableOpacity style={styles.authBtn} onPress={this.testPress}>
            <Text style={styles.authBtnTxt}>点击获取短信权限</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logBtn} onPress={this.loginPress}>
          <Text style={styles.loginTxt}>登录</Text>
        </TouchableOpacity>
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
  inputBox: {
    height: 50,
    width: '80%',
    flexDirection: 'row',
    // backgroundColor: '#74b9ff',
    paddingRight: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputLabel: {
    // backgroundColor: 'red',
    lineHeight: 50,
    fontSize: 18,
  },
  inputText: {
    backgroundColor: '#fff',
    fontSize: 16,
    height: 40,
    lineHeight: 40,
    flex: 1,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0984e3',
    marginLeft: 20,
  },
  authBtn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#00cec9',
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0984e3',
  },
  logBtn: {
    width: '50%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#0984e3',
    alignItems: 'center',
    marginTop: 20,
  },
  authBtnTxt: {
    lineHeight: 40,
    color: '#0984e3',
  },
  loginTxt: {
    lineHeight: 50,
    color: '#fff',
    fontSize: 16,
  },
});

export default connect()(Address);
