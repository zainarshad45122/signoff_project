import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { moderateScale } from '../../helper/helperFunctions';

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
    width: '90%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginTop: '5%',
    borderColor: '#194467'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  headingStyle: {
    fontWeight: 'bold',
    fontSize: moderateScale(11),
  },
  textStyle: {
    fontSize: moderateScale(11),
    width: '60%',
  },
  viewStyle: {
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonStyle: {
    marginLeft: 'auto',
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    backgroundColor: '#194467',
  },
  marginLeftAuto: {
    marginLeft: 'auto',
  },
  flatlistStyle: {
    height: '100%',
    width: '100%',
  },
  cardTopBar: {
    backgroundColor: '#194467',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopColor: '#194467'
  },
  noJobsText: {
    marginTop: '40%',
    color: colors.secondary,
    fontSize: moderateScale(15),

  },
  marginTop40 : {
    marginTop:'40%'
  },
  alignItemsCenter : {
    alignItems : 'center'
  }

});
