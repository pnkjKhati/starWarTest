import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SubHeader = ({title}) => {
  return (
    <View style={styles.subHeaderContainer}>
      <Text style={styles.subHeaderText}>{title}</Text>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  subHeaderContainer: {
    height: 50,
    backgroundColor: '#B3B6B7 ',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  subHeaderText: {
    fontSize: 20,
    color: '#626567',
    fontWeight: 'bold',
  },
});
