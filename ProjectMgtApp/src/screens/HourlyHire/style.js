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
  },
  card: {
    width: '98%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginTop: '5%',
    borderColor: '#194467',
  },
  scrollStyle: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center'
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
  },
  viewStyle: {
    flexDirection: 'row',
    marginTop: 5,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize:moderateScale(11),
    color:'grey',
    fontSize: moderateScale(11),
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
  marginLeft : {
    marginLeft : 10
  },
  cardTopBar: {
    backgroundColor: '#194467',
    padding: 5,
    borderTopColor: '#194467',
    justifyContent :'center',
    marginTop:20
  },
  Picker: {
    borderStyle: 'solid',
    borderWidth: 1,
    
  },
  marginTop20 : {
    marginTop:'20%'
  },
  marginTop8 : {
    marginTop:-8
  },
  alignItemsCenter : {
    alignItems : 'center'
  },
  marginBottom10: {
  marginBottom:10
  },
  scene: {
    flex: 1,
    backgroundColor: colors.primary
  },
  topBarText : {
    color : colors.secondary,
    textAlign:'center',
    fontSize:moderateScale(11),
  },
  flexStyle: {
    flex: 1
  },
  textInput : {
    fontSize:moderateScale(10),
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
  marginTop50 : {
    marginTop:'50%'
  },
  tabButton : {
    flex : 1,
    border: 1, 
    borderColor:colors.secondary
  }
});
