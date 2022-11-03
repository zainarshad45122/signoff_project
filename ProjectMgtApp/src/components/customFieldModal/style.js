import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { moderateScale} from '../../helper/helperFunctions';

const {colors} = theme;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '68%',
    position: 'relative',
    borderRadius: 3,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignSelf: 'center',
    color: colors.primary
  },
  searchButton: {
    backgroundColor: colors.primary, 
    width:'37%', 
    height:moderateScale(30),  
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
   

  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent : 'center'
  },
  textMarginLeft: {
    marginLeft: 10
  },
  marginTop: {
    marginTop: 15,
    textAlign : 'center'
  },
  flexStyle : {
    flex : 1
  },
  marginLeftAuto : {
    marginLeft :'auto'
  },
  boldFont : {
    fontWeight : 'bold'
  },
  buttonText : {
    color : colors.secondary,
    fontSize : moderateScale(10)
  }
});
