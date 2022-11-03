import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../theme';


const {colors} = theme;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: '100%',
    position: 'relative',
    alignItems:'center',
    justifyContent:'center'
  },
});
