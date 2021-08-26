import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  paragraphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4F6C92',
  },
});

export default styles;
