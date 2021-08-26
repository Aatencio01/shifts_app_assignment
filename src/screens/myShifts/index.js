import React, {useEffect} from 'react';
import {SafeAreaView, Alert, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import get from 'lodash/get';

// Components
import {SectionListComponent} from '../../components';

// Store
import {useStore} from '../../store';
import {
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
import {groupShiftsByDate} from '../../utils';

// Styles
import styles from './styles';

const MyShifts = () => {
  const [state, dispatch] = useStore();
  const {shifts, showLoading} = state;

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
            {text: 'Retry now', onPress: () => getShifts()},
          ],
        );
      }
    }
    getShifts();
  }, [dispatch]);

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

  const myshifts = groupShiftsByDate(shifts.filter(shift => shift.booked));
  return (
    <SafeAreaView style={styles.container}>
      {get(myshifts, 'length', false) > 0 ? (
        <SectionListComponent
          shifts={myshifts}
          onPress={handleBooking}
          showLoading={showLoading}
          fromMyShifts
        />
      ) : (
        <View style={styles.paragraphContainer}>
          <MaterialIcons name="local-activity" color="#4F6C92" size={50} />
          <Text style={styles.paragraph}>
            Looks like you don't have booked shifts, right now
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyShifts;
