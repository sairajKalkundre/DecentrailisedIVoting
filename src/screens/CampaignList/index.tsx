import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';

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

  const renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={{fontSize: 22}}>{item?.name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default CampaignList;
