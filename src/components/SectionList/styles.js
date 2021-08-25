import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: '#CBD2E1',
    backgroundColor: '#F7F8FB',
  },
  header: {
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderColor: '#CBD2E1',
    borderWidth: 0.5,
    backgroundColor: '#F1F4F8',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4F6C92',
  },
  itemTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F6C92',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
  },
  cancel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E2006A',
    borderColor: '#E2006A',
  },
  available: {
    fontSize: 17,
    fontWeight: '700',
    color: '#16A64D',
    borderColor: '#16A64D',
  },
  disable: {
    fontSize: 17,
    fontWeight: '700',
    color: '#B2B2B2',
    borderColor: '#B2B2B2',
  },
  booked: {
    marginRight: 25,
    fontSize: 16,
    fontWeight: '600',
    color: '#4F6C92',
  },
  overlapping: {
    marginRight: 25,
    fontSize: 16,
    fontWeight: '600',
    color: '#E2006A',
  },
});

export default styles;
