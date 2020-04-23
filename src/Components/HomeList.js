import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

export default class HomeList extends PureComponent {
  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.tagList}
        renderItem={({item, index}) => <TagBox />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

function TagBox() {
  return <Text>11111</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
