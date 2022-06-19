import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import SuccessIcon from '../../assets/icons/Success';

const Home = ({route, navigation}) => {
  const {
    params: {areaCode, campaignCode},
  } = route;
  const [candidateData, setCandidateData] = useState([]);
  const [addharNo, setAdharNo] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOTP] = useState('');
  const [token, setToken] = useState('');
  const [candidateCode, setCandidateCode] = useState('');
  const [validation, setValidation] = useState({
    validationField: 'nothing',
    validationErrorMsg: 'nothing',
  });
  const [showVotingSuccess, setShowVotingSuccess] = useState(false);
  const [name, setName] = useState('');
  const url = `https://decentralized-ivoting.herokuapp.com/candidate-list?campaignCode=${campaignCode}&areaCode=${areaCode}`;
  console.log(url);

  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => {
        console.log({response});
        setCandidateData(response);
      });
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [5, '30%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = candidateCode => {
    setCandidateCode(candidateCode);
    bottomSheetRef.current.snapToPosition('35%');
  };

  const checkForVoter = () => {
    if (showOtp) {
      if (otp.length === 0) {
        setValidation({
          validationField: 'otp',
          validationErrorMsg: 'OTP No is mandatory',
        });
      } else {
        setValidation({
          validationField: 'nothing',
          validationErrorMsg: 'nothing',
        });
        voteAfterAuthenticate();
      }
    } else {
      if (name.length === 0) {
        setValidation({
          validationField: 'name',
          validationErrorMsg: 'Name is mandatory',
        });
      } else if (addharNo.length === 0) {
        setValidation({
          validationField: 'aadhar',
          validationErrorMsg: 'Aadhar No is mandatory',
        });
      } else {
        setValidation({
          validationField: 'nothing',
          validationErrorMsg: 'nothing',
        });
        authenticate();
      }
    }
  };

  const voteAfterAuthenticate = () => {
    const voteURL = 'https://decentralized-ivoting.herokuapp.com/vote/';
    fetch(voteURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        campaignCode: campaignCode,
        areaCode: areaCode,
        candidateCode,
        voterId: addharNo,
        token,
        otp,
      }),
    })
      .then(res => res.json())
      .then(response => {
        console.log({response});
        if (response?.error) {
          setValidation({
            validationField: 'otp',
            validationErrorMsg: response?.error,
          });
        } else {
          setValidation({
            validationField: 'nothing',
            validationErrorMsg: 'nothing',
          });
          setShowVotingSuccess(true);
        }
      })
      .catch(() => {
        setValidation({
          validationField: 'otp',
          validationErrorMsg: 'Invalid OTP',
        });
      });
  };

  const authenticate = () => {
    const voterURL =
      'https://decentralized-ivoting.herokuapp.com/authenticate-voter/';
    fetch(voterURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voterId: addharNo,
        campaignCode: campaignCode,
        areaCode: areaCode,
      }),
    })
      .then(res => res.json())
      .then(response => {
        console.log({response});
        if (response?.error) {
          setValidation({
            validationField: 'aadhar',
            validationErrorMsg: 'Invalid Aadhar No.',
          });
        } else {
          setValidation({
            validationField: 'nothing',
            validationErrorMsg: 'nothing',
          });
          setToken(response?.token);
          setShowOtp(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
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
            uri: item?.candidateSign,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{fontSize: 16, marginTop: 10}}>{item?.candidateName}</Text>
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
          onPress={() => openBottomSheet(item?.candidateCode)}>
          <Text style={{color: 'white', fontWeight: '600'}}>Vote</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const VotingFailed = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}>
          <SuccessIcon height={50} width={50} />
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
            Voted Successfully
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => goBack()}
          style={{
            height: 35,
            width: 200,
            backgroundColor: '#121212',
            alignSelf: 'center',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const goBack = () => {
    navigation.goBack();
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
          data={candidateData}
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
        {showVotingSuccess ? (
          <VotingFailed />
        ) : (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>
              Enter Credentials to Vote
            </Text>
            <TextInput
              style={{
                width: '80%',
                height: 40,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor:
                  validation.validationField === 'name' ? 'red' : '#000',
                marginTop: 10,
                borderRadius: 10,
                paddingLeft: 10,
                backgroundColor: showOtp ? '#FFE4B5' : null,
              }}
              placeholder={'Name'}
              onChangeText={e => setName(e)}
              editable={!showOtp}
              placeholderTextColor="black"
            />
            {validation.validationField === 'name' && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'red',
                  width: '80%',
                  top: 2,
                }}>
                {validation.validationErrorMsg}
              </Text>
            )}
            <TextInput
              style={{
                width: '80%',
                height: 40,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor:
                  validation.validationField === 'aadhar' ? 'red' : '#000',
                marginTop: 10,
                borderRadius: 10,
                paddingLeft: 10,
                backgroundColor: showOtp ? '#FFE4B5' : null,
              }}
              editable={!showOtp}
              placeholder={'Aadhar No'}
              placeholderTextColor="black"
              onChangeText={e => setAdharNo(e)}
            />
            {validation.validationField === 'aadhar' && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'red',
                  width: '80%',
                  top: 2,
                }}>
                {validation.validationErrorMsg}
              </Text>
            )}
            {showOtp && (
              <TextInput
                style={{
                  width: '80%',
                  height: 40,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor:
                    validation.validationField === 'otp' ? 'red' : '#000',
                  marginTop: 10,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
                placeholder={'OTP'}
                placeholderTextColor="black"
                onChangeText={e => setOTP(e)}
              />
            )}
            {validation.validationField === 'otp' && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'red',
                  width: '80%',
                  top: 2,
                }}>
                {validation.validationErrorMsg}
              </Text>
            )}
            <TouchableOpacity
              style={{
                width: '80%',
                height: 40,
                backgroundColor: 'blue',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => checkForVoter()}>
              <Text style={{color: 'white', fontWeight: '600'}}>
                {showOtp ? 'Vote' : 'Authenticate'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Home;
