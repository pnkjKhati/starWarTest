import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Card from '../components/Card';

const PointsTable = ({navigation}) => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (matches.length) {
      calcPoints();
    }
  }, [matches]);

  const getData = async () => {
    const resp1 = await fetch('https://www.jsonkeeper.com/b/IKQQ');
    const resp2 = await fetch('https://api.npoint.io/bc3f07c7442e85446788');
    const data1 = await resp1.json();
    const data2 = await resp2.json();
    setPlayers(data1);
    setMatches(data2);
  };

  const onCardPress = item => {
    navigation.navigate('matches', {item, players});
  };

  const updatePlayerScore = (id, points, arr) => {
    for (let i = 0; i < arr.length; i++) {
      const player = arr[i];
      if (player.id == id) {
        const updatedPlayer = player.points
          ? {...player, points: player.points + points}
          : {...player, points};
        arr.splice(i, 1, updatedPlayer);
      }
    }
  };

  const sortData = players => {
    const length = players.length;
    if (length < 2) {
      return players;
    }
    const pivot = players[length - 1];
    const leftArr = [];
    const rightArr = [];
    for (let i = 0; i < players.length - 1; i++) {
      if (players[i].points > pivot.points) {
        leftArr.push(players[i]);
      } else {
        rightArr.push(players[i]);
      }
    }
    return [...sortData(leftArr), pivot, ...sortData(rightArr)];
  };

  const calcPoints = () => {
    const arr = players;
    for (let ele of matches) {
      const {match, player1, player2} = ele;
      if (player1.score > player2.score) {
        updatePlayerScore(player1.id, 3, arr);
      } else if (player2.score > player1.score) {
        updatePlayerScore(player2.id, 3, arr);
      } else {
        updatePlayerScore(player1.id, 1, arr);
        updatePlayerScore(player2.id, 1, arr);
      }
    }
    const sortedData = sortData(arr);
    setPlayers(sortedData);
  };

  const renderItem = ({item}) => {
    return <Card item={item} onPress={() => onCardPress(item)} />;
  };
  return (
    <View style={styles.container}>
      <Header title={'Star Wars Blaster Tournament'} />
      <SubHeader title="Points Table" />
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PointsTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
