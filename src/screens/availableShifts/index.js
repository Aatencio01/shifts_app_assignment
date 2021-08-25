import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SectionListComponent} from '../../components';

import {Variables, groupShiftsByArea, filterOutOfTime} from '../../utils';

import {useStore} from '../../store';
import {
  loadShifts,
  bookShift,
  cancelShift,
  setSelectedArea,
} from '../../store/shifts';

import styles from './styles';

const AvailableShifts = ({navigation}) => {
  const [state, dispatch] = useStore();
  const {shifts, selectedArea} = state;

  useEffect(() => {
    const getAvailableShiftsFromApi = async () => {
      try {
        const response = await fetch(`${Variables.API_BASE_URL}/shifts`);
        const shiftsResponse = await response.json();
        dispatch(loadShifts(shiftsResponse));
      } catch {
        Alert.alert(
          'An Error occurs',
          'Please be sure to have the server up and running or try again',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => getAvailableShiftsFromApi()},
          ],
        );
      }
    };

    getAvailableShiftsFromApi();
  }, [dispatch]);

  const handleBook = async date => {
    console.log('date ==', date);
    try {
      if (date.booked) {
        const cancelShiftResponse = await fetch(
          `${Variables.API_BASE_URL}/shifts/${date.id}/cancel`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const cancelResponse = await cancelShiftResponse.json();
        console.log('cancelResponse ==', cancelResponse);
        dispatch(cancelShift(cancelResponse));
      } else {
        const bookShiftResponse = await fetch(
          `${Variables.API_BASE_URL}/shifts/${date.id}/book`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const bookResponse = await bookShiftResponse.json();
        console.log('bookResponse ===', bookResponse);
        dispatch(bookShift(bookResponse));
      }
    } catch {
      Alert.alert(
        'An Error occurs',
        'Please be sure to have the server up and running or try again',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK'},
        ],
      );
    }
  };

  const setShiftsByArea = item => {
    dispatch(setSelectedArea(item.title));
  };

  const Item = ({item, fontColor, itemsQuantity}) => (
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setShiftsByArea(item)}>
        <Text
          style={[
            styles.title,
            fontColor,
          ]}>{`${item.title}(${itemsQuantity.length})`}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => {
    const fontColor = {
      color: selectedArea === item.title ? '#004FB4' : '#CBD2E1',
    };
    return (
      <Item
        item={item}
        fontColor={fontColor}
        itemsQuantity={filterOutOfTime(item.data)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {console.log('selectedArea ===', selectedArea)}
        <FlatList
          data={groupShiftsByArea(shifts)}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <SectionListComponent
        shifts={shifts}
        selectedArea={selectedArea}
        onPress={handleBook}
      />
    </SafeAreaView>
  );
};

export default AvailableShifts;
