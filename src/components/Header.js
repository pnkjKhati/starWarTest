import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Header = ({title, navigation, onNavigate}) => {
  return (
    <View style={styles.headerContainer}>
      {navigation === 'prev' && (
        <TouchableOpacity onPress={onNavigate} style={styles.headerLeft}>
          <Text style={[styles.headerText, {color: '#2E86C1'}]}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
      {navigation === 'next' && (
        <TouchableOpacity style={styles.headerRight}>
          <Text>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D3D4',
    position: 'relative',
  },
  headerText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  headerLeft: {
    position: 'absolute',
    left: 5,
  },
  headerRight: {},
});
