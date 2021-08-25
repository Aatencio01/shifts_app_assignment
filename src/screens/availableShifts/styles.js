import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: '#F7F8FB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#CBD2E1',
  },
});

export default styles;
