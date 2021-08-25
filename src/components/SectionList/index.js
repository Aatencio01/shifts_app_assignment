import React from 'react';
import {Text, SectionList, View} from 'react-native';

import {OrderShiftsByDate} from '../../utils';

import styles from './styles';

const Item = ({date}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>Item</Text>
    </View>
  );
};

const SectionListComponent = ({shifts}) => {
  return (
    <SectionList
      sections={OrderShiftsByDate(shifts)}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <Item date={item.startTime} />}
      renderSectionHeader={({section}) => (
        <Text style={styles.header}>{section.title}</Text>
      )}
    />
  );
};

export default SectionListComponent;
