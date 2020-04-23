import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import Views from './src/Views';
import React, {PureComponent} from 'react';

SmsListener.addListener((message) => {
  console.log(message);
});
export default class App extends PureComponent {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Views />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
