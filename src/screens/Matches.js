import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useRoute} from '@react-navigation/native';
import SubHeader from '../components/SubHeader';

const Matches = ({navigation}) => {
  const [allMatches, setAllMatches] = useState([]);
  const [matches, setMatches] = useState([]);
  const {params} = useRoute();
  const {item, players} = params;
  console.log(item, matches, 'item');

  useEffect(() => {
    getMatches();
  }, []);

  useEffect(() => {
    if (allMatches.length) {
      const temp = allMatches.filter(ele => {
        const {player1, player2} = ele;
        if (player1.id === item.id || player2.id === item.id) {
          return ele;
        }
      });
      console.log(temp, '{}{');
      setMatches(temp);
    }
  }, [allMatches]);

  const getMatches = async () => {
    const resp = await fetch('https://api.npoint.io/bc3f07c7442e85446788');
    const data = await resp.json();
    setAllMatches(data);
  };

  const onNavigate = () => {
    navigation.goBack();
  };

  const getName = id => {
    for (let player of players) {
      if (player.id === id) {
        return player.name;
      }
    }
  };

  const getColor = match => {
    const {player1, player2} = match;
    if (player1.id == item.id) {
      if (player1.score > player2.score) {
        return 'green';
      } else if (player1.score < player2.score) {
        return 'red';
      } else {
        return 'white';
      }
    } else {
      if (player2.score > player1.score) {
        return 'green';
      } else if (player2.score < player1.score) {
        return 'red';
      } else {
        return 'white';
      }
    }
  };

  return (
    <View style={styles.matchesContainer}>
      <Header title={item.name} navigation={'prev'} onNavigate={onNavigate} />
      <SubHeader title="Matches" />
      <FlatList
        data={matches}
        renderItem={({item}) => {
          const {player1, player2} = item;
          return (
            <View
              style={[styles.cardContainer, {backgroundColor: getColor(item)}]}>
              <Text style={styles.cardText}>{getName(player1.id)}</Text>
              <Text
                style={
                  styles.cardText
                }>{`${player1.score}-${player2.score}`}</Text>
              <Text style={styles.cardText}>{getName(player2.id)}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  matchesContainer: {
    flex: 1,
  },
  cardContainer: {
    height: 100,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
