import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { scale, moderateScale, verticalScale} from '../../helper/helperFunctions'

const {colors} = theme;

export default StyleSheet.create({
  pieChart: {
    height: verticalScale(120), 
    width: scale(120)
  }
 
});
