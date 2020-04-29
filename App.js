import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Views from './src/Views';
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="default" />
          <SafeAreaView style={styles.container}>
            <Views />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
