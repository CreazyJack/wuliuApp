import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Address extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}> 网关: </Text>
          <TextInput style={styles.inputText} placeholder="asdfasdf" />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}> 令牌: </Text>
          <TextInput style={styles.inputText} placeholder="asdfasdf" />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}> 权限: </Text>
          <TouchableOpacity style={styles.authBtn}>
            <Text style={{lineHeight: 40, color: '#0984e3'}}>
              点击获取短信权限
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logBtn}>
          <Text style={{lineHeight: 50, color: '#fff', fontSize: 16}}>
            登录
          </Text>
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
});
