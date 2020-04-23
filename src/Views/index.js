import Main from './Main';
// import MsgAuthority from './MsgAuthority';
import Address from './Address';
import SplashView from './SplashView';
import React, {PureComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default class index extends PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0984e3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {},
            headerRightContainerStyle: {},
          }}>
          <Stack.Screen name="SplashView" component={SplashView} />
          <Stack.Screen
            name="Address"
            component={Address}
            options={({navigation}) => ({
              title: '登录',
            })}
          />
          {/* <Stack.Screen name="MsgAuthority" component={MsgAuthority} /> */}
          <Stack.Screen
            name="Main"
            component={Main}
            options={({navigation}) => ({
              title: '首页',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
