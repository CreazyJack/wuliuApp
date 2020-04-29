import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';

export default class HomeList extends PureComponent {
  render() {
    // console.log(this.props.tagList);
    return (
      <FlatList
        style={styles.container}
        data={this.props.tagList}
        renderItem={({item, index}) => <TagBox item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

function TagBox({item}) {
  // console.log(item);
  return (
    <View style={styles.itemBox}>
      {/* <Text style={styles.itemTxt}>
        序号：{item.address},
        {moment(item.time).format('YYYY年MM月DD日，hh:mm:ss')}
      </Text> */}
      <Text style={styles.itemTxt}>对方号码：{item.address}</Text>
      <Text style={styles.itemTxt}>
        接收日期：{moment(item.time).format('YYYY年MM月DD日，hh:mm:ss')}
      </Text>
      <Text style={styles.itemTxt}>内容：{item.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    width: '100%',
  },
  itemTxt: {
    // padding: 10,
    // borderRadius: 5,
    // marginBottom: 5,
  },
  itemBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
