import { StyleSheet } from "react-native";
import { moderateScale} from '../../helper/helperFunctions'
export default StyleSheet.create({
 
  iconStyle: {
    alignSelf: 'center'
  },
  nameStyle: {
    alignSelf: 'center', 
    fontSize: moderateScale(10),
    fontWeight : 'bold',
    textAlign : 'center'
  },
  textStyle: {
    alignSelf: 'center', 
    fontSize: moderateScale(10), 
    marginBottom: 20, 
    marginTop: 10,
    fontWeight : 'bold'
  },
 
  MarginRight: {
    marginLeft: 10
  },
  MarginTop: {
    marginTop: 20
  },
  flexStyle : {
    flex : 1
  }
});
