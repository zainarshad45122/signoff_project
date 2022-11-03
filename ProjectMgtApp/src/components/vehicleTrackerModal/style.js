import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const {colors} = theme;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    position: 'relative',
    borderRadius: 3,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignSelf: 'center',
    color: colors.primary
  },

});
