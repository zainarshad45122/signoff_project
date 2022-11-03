import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';


const {colors} = theme;

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    height: '100%',
    position: 'relative',
    alignItems:'center'
  },
  card: {
    width: '90%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
    position: 'absolute',
    top : '30%'
  },
  button: {
    width: '30%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  activityIndicator : {
    marginTop :10
  }

});
