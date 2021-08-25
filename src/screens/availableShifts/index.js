import React, {useEffect} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {SectionListComponent} from '../../components';

import {Variables} from '../../utils';

import {useStore} from '../../store';
import {loadShifts} from '../../store/shifts';

import styles from './styles';

const AvailableShifts = ({navigation}) => {
  const [state, dispatch] = useStore();
  const {shifts} = state;

  useEffect(() => {
    const getAvailableShiftsFromApi = async () => {
      try {
        const response = await fetch(`${Variables.API_BASE_URL}/shifts`);
        const shiftsResponse = await response.json();
        dispatch(loadShifts(shiftsResponse));
      } catch (error) {
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

  return (
    <SafeAreaView style={styles.container}>
      <SectionListComponent shifts={shifts} />
    </SafeAreaView>
  );
};

export default AvailableShifts;
