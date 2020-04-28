import Main from './Main';
import Address from './Address';
import SplashView from './SplashView';
import React, {PureComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class index extends PureComponent {
  render() {
    const screenOptions = {
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
    };
    return (
      <NavigationContainer>
        {this.props.userReducer.isLogin ? (
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={screenOptions}>
            <Stack.Screen
              name="Main"
              component={Main}
              options={({navigation}) => ({
                title: '首页',
              })}
            />
          </Stack.Navigator>
        ) : this.props.userReducer.isFirstScreen ? (
          <Stack.Navigator
            initialRouteName="SplashView"
            screenOptions={screenOptions}>
            <Stack.Screen
              name="SplashView"
              component={SplashView}
              options={({navigation}) => ({
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Address"
            screenOptions={screenOptions}>
            <Stack.Screen
              name="Address"
              component={Address}
              options={({navigation}) => ({
                title: '登录',
              })}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapState = (state) => state;
export default connect(mapState)(index);
