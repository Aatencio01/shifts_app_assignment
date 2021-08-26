import React, {useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Components
import {SectionListComponent} from '../../components';

// Store
import {useStore} from '../../store';
import {
  setSelectedArea,
  loadShifts,
  setShowLoading,
  bookShift,
  cancelShift,
} from '../../store/shifts/actions';

// Services
import {
  getAvailableShifts,
  postBookingShift,
  postCancelShift,
} from '../../services/';

// Utils
import {
  groupShiftsByArea,
  filterOutOfTime,
  groupShiftsByDate,
} from '../../utils';

// Styles
import styles from './styles';

const AvailableShifts = ({navigation}) => {
  const [state, dispatch] = useStore();
  const {shifts, selectedArea, showLoading} = state;

  useEffect(() => {
    async function getShifts() {
      try {
        const availableShifts = await getAvailableShifts();
        dispatch(loadShifts(availableShifts));
      } catch {
        Alert.alert(
          'An Error occurs',
          'Please be sure to have the server up and running or try again',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Try again', onPress: () => getShifts()},
          ],
        );
      }
    }
    getShifts();
  }, [dispatch]);

  const setShiftsByArea = item => {
    dispatch(setSelectedArea(item.title));
  };

  const handleBooking = async date => {
    try {
      dispatch(setShowLoading({isLoading: true, date}));
      if (date.booked) {
        const canceledShift = await postCancelShift(date);
        dispatch(cancelShift(canceledShift));
      } else {
        const bookedShift = await postBookingShift(date);
        dispatch(bookShift(bookedShift));
      }
      dispatch(setShowLoading({isLoading: false, date}));
    } catch {
      dispatch(setShowLoading({isLoading: false, date: {}}));
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

  const formattedShifts = groupShiftsByDate(
    shifts.filter(shift => shift.area === selectedArea),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
        shifts={formattedShifts}
        onPress={handleBooking}
        showLoading={showLoading}
      />
    </SafeAreaView>
  );
};

export default AvailableShifts;
