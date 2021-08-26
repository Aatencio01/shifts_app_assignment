import React from 'react';
import PropTypes from 'prop-types';
import {Text, SectionList, View, TouchableWithoutFeedback} from 'react-native';
import get from 'lodash/get';

// Components
import Spinner from '../Spinner';

// Utils
import {getHoursAndMinutes, getTotalShiftsHours} from '../../utils';

// Styles
import styles from './styles';
import {prototype} from 'react-native/Libraries/Image/ImageBackground';

const getButtonStyleState = (date, isAlreadyStarted) => {
  if (date.overlapping || isAlreadyStarted) {
    return 'disable';
  } else {
    if (date.booked) {
      return 'cancel';
    } else {
      return 'available';
    }
  }
};

const getLoadingComponent = date => {
  if (date.booked) {
    return <Spinner color={'#E2006A'} size="small" />;
  }

  return <Spinner color={'#16A64D'} size="small" />;
};

const getTimeAndArea = date => {
  return (
    <View>
      <Text style={styles.itemTime}>
        {getHoursAndMinutes(date.startTime, date.endTime)}
      </Text>
      <Text style={styles.areaName}>{date.area}</Text>
    </View>
  );
};

const getEventDescription = (
  isBooked,
  isOverlapping,
  fromMyShifts,
  isAlreadyStarted,
) => {
  if (isBooked && !isOverlapping && !isAlreadyStarted) {
    return <Text style={styles.booked}>Booked</Text>;
  }
  if (isAlreadyStarted || (isAlreadyStarted && fromMyShifts)) {
    return <Text style={styles.booked}>Started</Text>;
  }
  if (isOverlapping && !fromMyShifts) {
    return <Text style={styles.overlapping}>Overlapping</Text>;
  }
};

const Item = ({date, showLoading, onPress, fromMyShifts}) => {
  const isBooked = get(date, 'booked', false);
  const isOverlapping = get(date, 'overlapping', false);
  const isAlreadyStarted = Date.now() > date.startTime;
  const isBookedTxt = isBooked ? 'Cancel' : 'Book';
  return (
    <View style={styles.item}>
      {fromMyShifts ? (
        getTimeAndArea(date)
      ) : (
        <Text style={styles.itemTime}>
          {getHoursAndMinutes(date.startTime, date.endTime)}
        </Text>
      )}
      <View style={styles.row}>
        {getEventDescription(
          isBooked,
          isOverlapping,
          fromMyShifts,
          isAlreadyStarted,
        )}
        <TouchableWithoutFeedback
          onPress={() => onPress(date)}
          disabled={isOverlapping || isAlreadyStarted}>
          <View
            style={[
              styles.button,
              styles[getButtonStyleState(date, isAlreadyStarted)],
            ]}>
            {showLoading.isLoading && showLoading.date.id === date.id ? (
              getLoadingComponent(date)
            ) : (
              <Text style={styles[getButtonStyleState(date, isAlreadyStarted)]}>
                {isBookedTxt}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const getMyShiftsHeader = section => {
  return (
    <Text style={styles.headerTitleSummary}>
      {`${get(section, 'data.length', 0)} shifts, ${getTotalShiftsHours(
        section,
      )}h`}
    </Text>
  );
};

const SectionListComponent = ({shifts, showLoading, onPress, fromMyShifts}) => {
  return (
    <SectionList
      sections={shifts}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <Item
          date={item}
          showLoading={showLoading}
          onPress={onPress}
          fromMyShifts={fromMyShifts}
        />
      )}
      renderSectionHeader={({section}) => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{section.title}</Text>
          {fromMyShifts && getMyShiftsHeader(section)}
        </View>
      )}
    />
  );
};

SectionListComponent.propTypes = {
  shifts: PropTypes.arrayOf(PropTypes.object).isRequired,
  showLoading: PropTypes.shape({
    isLoading: PropTypes.bool,
    date: PropTypes.object,
  }),
  onPress: PropTypes.func.isRequired,
  fromMyShifts: PropTypes.bool,
};

export default SectionListComponent;
