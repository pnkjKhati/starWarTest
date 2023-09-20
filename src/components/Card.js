import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Card = ({item, onPress}) => {
  const {icon, name} = item;
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={{uri: icon}} style={{width: 80, height: 80}} />
      <Text>{name}</Text>
      {item?.points && <Text>{item.points}</Text>}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 10,
  },
});
