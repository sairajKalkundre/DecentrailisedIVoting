import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

const Area = ({route, navigation}) => {
  const {code} = route.params;
  console.log({code});
  const url =
    'https://decentralized-ivoting.herokuapp.com/area-list?campaignCode=' +
    code;
  const [area, setArea] = useState([]);

  useEffect(() => {
    const data = fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => console.log({response}));
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text>{item?.areaName}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={area} renderItem={renderItem} />
    </View>
  );
};

export default Area;
