import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const CampaignList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://decentralized-ivoting.herokuapp.com/campaign-list', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => {
        console.log({response});
        setData(response);
      });
  }, []);
  const navigate = useNavigation();
  const navigateToArea = item => {
    const {code, endDateTime, startDateTime} = item;
    checkStatusOfTheCampaign(startDateTime, endDateTime);
    navigate.navigate('Area', {
      code: code,
    });
  };

  const convertServerDateTimeToReadable = dateTime => {
    const date = moment(dateTime).format('DD-MMM-YYYY , HH:MM:SS');
    return date;
  };

  const checkStatusOfTheCampaign = (startTime, endTime) => {
    const currentDate = moment();
    const startDate = moment(startTime);
    const endDate = moment(endTime);
    if (currentDate.isBetween(startDate, endDate)) {
      return 'In Progress';
    } else if (currentDate.isAfter(endDate)) {
      return 'Completed';
    } else {
      return 'Not yet started';
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={
          checkStatusOfTheCampaign(item?.startDateTime, item?.endDateTime) !==
          'In Progress'
        }
        style={{
          height: 100,
          backgroundColor:
            checkStatusOfTheCampaign(item?.startDateTime, item?.endDateTime) ===
            'In Progress'
              ? '#DCDCDC'
              : '#FFE4B5',
          margin: 5,
          borderRadius: 10,
          justifyContent: 'center',
        }}
        onPress={() => navigateToArea(item)}>
        <Text style={{fontSize: 18, marginLeft: 10}}>{item?.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, marginLeft: 10, fontWeight: 'bold'}}>
            StartTime :
          </Text>
          <Text style={{fontSize: 14, marginLeft: 10}}>
            {convertServerDateTimeToReadable(item?.startDateTime)}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, marginLeft: 10, fontWeight: 'bold'}}>
            EndTime :
          </Text>
          <Text style={{fontSize: 14, marginLeft: 10}}>
            {convertServerDateTimeToReadable(item?.endDateTime)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            fontWeight: 'bold',
            color:
              checkStatusOfTheCampaign(
                item?.startDateTime,
                item?.endDateTime,
              ) === 'In Progress'
                ? 'green'
                : 'red',
          }}>
          Status :{' '}
          {checkStatusOfTheCampaign(item?.startDateTime, item?.endDateTime)}
        </Text>
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
