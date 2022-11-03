import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { moderateScale } from '../../helper/helperFunctions'

const { colors } = theme;

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    height: '100%',
    position: 'relative',

  },
  card: {
    width: '98%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginTop: '5%',
  },
  fab: {
    bottom: -30,
    right: 10,
    backgroundColor: colors.primary
  },
  flatlistStyle: {
    height: '100%',
    width: '100%',
  },
  textStyle: {
    fontSize:moderateScale(10)
  },
  listtextStyle : {
    fontSize: moderateScale(13),
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

  marginTop30: {
    marginTop: -55
  },
  marginLeftAuto: {
    marginLeft: 'auto'
  },
  subTitleStyle: {
    fontSize: moderateScale(13),
    marginTop: 10,
    marginBottom: 5
  },
  flexStyle: {
    flex: 1
  },
  scrollStyle: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center'
  },
  smallCardView: {
    flexDirection: 'row',
    marginTop: 10
  },
  flexDirectionRow : {
    flexDirection: 'row'
  },
  titleStyle : {
    fontSize: moderateScale(13),
  },
  marginTop : {
    marginTop:-40
  },
  padding : {
    padding:10
  }
});
