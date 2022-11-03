import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../theme';

const {colors} = theme;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '70%',
    position: 'relative',
    borderRadius: 3,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  error: {
    color: '#ff3333',
  },
  success: {
    color: '#198754',
  },
});
