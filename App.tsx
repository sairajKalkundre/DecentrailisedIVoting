/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DownArrow} from './src/assets/icons/DownArrow';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'yellow',
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22}}>Chief Minister</Text>
        <View style={{height: 30, width: 30, marginRight: 10}}>
          <DownArrow />
        </View>
      </View>
      {/*<FastImage*/}
      {/*  style={{width: 200, height: 200}}*/}
      {/*  source={{*/}
      {/*    uri: 'https://unsplash.it/400/400?image=1',*/}
      {/*    headers: {Authorization: 'someAuthToken'},*/}
      {/*    priority: FastImage.priority.normal,*/}
      {/*  }}*/}
      {/*  resizeMode={FastImage.resizeMode.contain}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

export default App;
