import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

export default class HomeList extends PureComponent {
  render() {
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
  return <Text style={styles.itemTxt}>{item.body}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemTxt: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
