import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { scale, moderateScale, verticalScale} from '../../helper/helperFunctions'

const { colors } = theme;

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    height: '100%',
    position: 'relative',
    alignItems: 'center'
  },
  card: {
    width: '98%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginTop: '5%',
    height:'93%'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  flatlistStyle: {
    height: '100%',
    width: '100%',
  },
  textStyle: {
    marginTop: '40%', 
    color: colors.secondary, 
    fontSize: 25
  },
  cardContent: {
    flexDirection: 'row'
  },
  textMarginLeft: {
    marginLeft: 10
  },
  textMarginTop: {
    marginTop: 20
  },
  flexStyle : {
    flex : 1
  },
  marginTop40 : {
    marginTop:'40%'
  },
  marginTop : {
    marginTop:-40
  },
  padding : {
    padding:10
  },
  alignItemsCenter : {
    alignItems : 'center'
  },
  titleStyle : {
    fontSize: moderateScale(15),
  }
});
