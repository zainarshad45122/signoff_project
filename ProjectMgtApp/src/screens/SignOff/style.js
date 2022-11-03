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
    alignItems: 'center',
    width:'100%'
  },
  cameraContainer: {
    height: '100%',
    width: '100%',

  },
  centerItems : {
    position: 'relative',
    alignItems: 'center'
  },
  card: {
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
  marginTop : {
    marginTop : '30%'
  },
  textStyle: {
    fontSize: moderateScale(11),
    color: colors.primary
  },
  tabTextStyle: {
    fontSize: moderateScale(11),
    color: colors.secondary
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
  marginTop40: {
    marginTop: '40%'
  },
  alignItemsCenter: {
    width: '100%'
  },
  imageView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 160,
    borderRadius: 5,
    marginLeft:moderateScale(8)
  },
  image: {
    width:  moderateScale(100),
    height:  moderateScale(110),
    padding: 20,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 5,
  },
  imageDeleteIcon: {
    position: 'absolute',
    left: 0,
    top: 6,
  },
  signoffButton: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    width: '50%'
  },
  signatureHolder: {
    width: '98%',
    borderColor: '#194467',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    borderRadius: 5,
  },
  signatureButton: {
    fontSize: moderateScale(9),
    color: colors.secondary,
    backgroundColor: '#194467',
    padding: 10,
    borderBottomWidth: 0.5,
    margin: 5,
    textTransform: 'uppercase',
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 5,
  },
  tabButton : {
    flex : 1,
  },
  label : {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize:moderateScale(11),
    color:'grey'
  },
  textInput : {
    fontSize:moderateScale(11),
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#194467',
    color:colors.secondary,
    borderColor : colors.secondary,
    borderWidth : 1,
    fontSize: moderateScale(11),
  },
  scrollStyle: {
    backgroundColor: 'transparent',
  },
});
