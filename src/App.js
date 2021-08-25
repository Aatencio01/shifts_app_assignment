import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AvailableShifts, MyShifts} from './screens';

import {StoreProvider} from '../src/store';
import {initialState, shiftsReducer} from './store/shifts';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <StoreProvider initialState={initialState} reducer={shiftsReducer}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="MyShifts"
            component={MyShifts}
            options={{
              tabBarLabel: 'My shifts',
              tabBarIcon: ({color, size}) => (
                <MaterialIcons name="event" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="AvailableShifts"
            component={AvailableShifts}
            options={{
              tabBarLabel: 'Available shifts',
              tabBarIcon: ({color, size}) => (
                <MaterialIcons
                  name="event-available"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
