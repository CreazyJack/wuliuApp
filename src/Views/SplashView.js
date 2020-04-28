import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

class SplashView extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./新智慧5.png')} />
      </View>
    );
  }

  goLoginScreen = () => {
    setTimeout(() => {
      this.props.dispatch({
        type: 'goLoginScreen',
      });
    }, 3000);
  };

  goMainScreen = () => {
    setTimeout(() => {
      this.props.dispatch({
        type: 'goMainScreen',
      });
    }, 2000);
  };

  _getStore = async () => {
    try {
      // const token = await AsyncStorage.getItem('userToken');
      const token = await AsyncStorage.getItem('test');
      if (token) {
        axios({
          method: 'post',
          url: 'http://rap2.taobao.org:38080/app/mock/251021/app/login',
          data: {
            token,
          },
        }).then((res) => {
          if (res.data.isUser) {
            this.goMainScreen();
          } else {
            this.goLoginScreen();
          }
        });
      } else {
        this.goLoginScreen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this._getStore();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

const mapState = (state) => state;
export default connect(mapState)(SplashView);
