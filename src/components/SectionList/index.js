import React from 'react';
import {Text, SectionList, View, TouchableWithoutFeedback} from 'react-native';
import get from 'lodash/get';

import Spinner from '../Spinner';

import {groupShiftsByDate, getHoursAndMinutes} from '../../utils';

import styles from './styles';

const getButtonStyleState = date => {
  if (date.overlapping) {
    return 'disable';
  } else {
    if (date.booked) {
      return 'cancel';
    } else {
      return 'available';
    }
  }
};

const Item = ({date, onPress}) => {
  const isBooked = get(date, 'booked', false);
  const isOverlapping = get(date, 'overlapping', false);
  const isBookedTxt = isBooked ? 'Cancel' : 'Book';
  return (
    <View style={styles.item}>
      <Text style={styles.itemTime}>
        {getHoursAndMinutes(date.startTime, date.endTime)}
      </Text>
      <View style={styles.row}>
        {isBooked && !isOverlapping && (
          <Text style={styles.booked}>Booked</Text>
        )}
        {isOverlapping && <Text style={styles.overlapping}>Overlapping</Text>}
        <TouchableWithoutFeedback
          onPress={() => onPress(date)}
          disabled={isOverlapping}>
          <View style={[styles.button, styles[getButtonStyleState(date)]]}>
            <Text style={styles[getButtonStyleState(date)]}>{isBookedTxt}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const SectionListComponent = ({shifts, onPress, selectedArea}) => {
  const formattedShifts = groupShiftsByDate(
    shifts.filter(shift => shift.area === selectedArea),
  );
  return (
    <SectionList
      sections={formattedShifts || []}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <Item date={item} onPress={onPress} />}
      renderSectionHeader={({section}) => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{section.title}</Text>
        </View>
      )}
    />
  );
};

export default SectionListComponent;
//<Spinner color={'#E2006A'} />
//<Spinner color={'#16A64D'} />
