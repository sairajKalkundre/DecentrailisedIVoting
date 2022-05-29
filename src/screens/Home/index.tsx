import React, {useCallback, useMemo, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Profile from '../../assets/icons/profile';
import {DownArrow} from '../../assets/icons/DownArrow';
import BottomSheet from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';

const Home = () => {
  const data = [
    {
      id: '1',
      name: 'Narendra Modi',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Official_portrait_of_the_Prime_Minister_Narendra_Modi%2C_November_2020_%28cropped%29.jpg',
    },
    {
      id: '2',
      name: 'Rahul Gandhi',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Rahul_Gandhi_%28portrait_crop%29.jpg',
    },
    {
      id: '3',
      name: 'Narendra Modi',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Official_portrait_of_the_Prime_Minister_Narendra_Modi%2C_November_2020_%28cropped%29.jpg',
    },
    {
      id: '4',
      name: 'Rahul Gandhi',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Rahul_Gandhi_%28portrait_crop%29.jpg',
    },
  ];

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [5, '30%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current.snapToPosition('35%');
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          height: 200,
          width: 150,
          flexDirection: 'column',
          borderWidth: 0.3,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginLeft: 10,
          marginTop: 10,
          backgroundColor: 'white',
          marginBottom: 20,
        }}>
        <FastImage
          style={{width: 100, height: 100, borderRadius: 50}}
          source={{
            uri: item?.imgUrl,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{fontSize: 16, marginTop: 10}}>{item?.name}</Text>
        <TouchableOpacity
          style={{
            width: 100,
            height: 25,
            backgroundColor: 'blue',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => openBottomSheet()}>
          <Text style={{color: 'white', fontWeight: '600'}}>Vote</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E8E8E8'}}>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{height: 20, width: 20, marginLeft: 10}}>
            <Profile />
          </View>
          <Text style={{fontSize: 22}}>Chief Minister</Text>
          <View style={{height: 20, width: 20, marginRight: 10}}>
            <DownArrow />
          </View>
        </View>
        <FlatList
          data={data}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#C8C8C8'}}
        onChange={handleSheetChanges}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>
            Enter Credentials to Vote
          </Text>
          <TextInput
            style={{
              width: '80%',
              height: 40,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#000',
              marginTop: 10,
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder={'Name'}
            placeholderTextColor="black"
          />
          <TextInput
            style={{
              width: '80%',
              height: 40,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#000',
              marginTop: 10,
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder={'Aadhar No'}
            placeholderTextColor="black"
          />
          <TextInput
            style={{
              width: '80%',
              height: 40,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#000',
              marginTop: 10,
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder={'OTP'}
            placeholderTextColor="black"
          />
          <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              backgroundColor: 'blue',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontWeight: '600'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Home;
