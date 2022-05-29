import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CampaignList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = fetch(
      'https://decentralized-ivoting.herokuapp.com/campaign-list',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(response => setData(response));
  }, []);
  const navigate = useNavigation();
  const navigateToArea = (code: string) => {
    navigate.navigate('Area', {
      code: code,
    });
  };
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
        onPress={() => navigateToArea(item?.code)}>
        <Text style={{fontSize: 18, marginLeft: 10}}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default CampaignList;
