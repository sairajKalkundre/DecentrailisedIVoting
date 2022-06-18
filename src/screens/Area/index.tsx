import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Area = ({route, navigation}) => {
  const {code} = route.params;
  console.log({code});
  const url =
    'https://decentralized-ivoting.herokuapp.com/area-list?campaignCode=' +
    code;
  const [area, setArea] = useState([]);
  const navigate = useNavigation();

  const navigateToVoting = areaCode => {
    navigate.navigate('Home', {
      campaignCode: code,
      areaCode: areaCode,
    });
  };
  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => {
        console.log({response});
        setArea(response);
      });
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#DCDCDC',
          margin: 5,
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigateToVoting(item?.areaCode)}>
        <Text style={{fontSize: 18, marginLeft: 10}}>{item?.areaName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList data={area} renderItem={renderItem} />
    </View>
  );
};

export default Area;
