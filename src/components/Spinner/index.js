import React from 'react';
import {ActivityIndicator} from 'react-native';

const Spinner = ({color, size}) => (
  <ActivityIndicator size={size} color={color} />
);

export default Spinner;
