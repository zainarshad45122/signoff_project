
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
    width: '90%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginTop: '5%',
  },
  textStyle: {
    color: colors.primary,
    fontSize:moderateScale(11)
  },
  cardTopBar: {
    backgroundColor: '#194467',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopColor: '#194467'
  },
  cardContent: {
    flexDirection: 'row'
  },
  textMarginLeft: {
    marginLeft: 10
  },
  textMarginTop: {
    marginTop: -20
  },
  marginTop: {
    marginTop: -50
  },
  marginLeftAuto: {
    marginLeft: 'auto'
  },
  subTitleStyle: {
    fontSize: 17,
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
  flexDirectionRow: {
    flexDirection: 'row'
  },
  checkBoxStyle: {
    flex: 0.2,
    marginTop: 20
  },
  bottomButtonsView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginTop: 20
  },
  bottomButtons: {
    marginLeft: 10,
    backgroundColor: colors.secondary
  },
  submitButton: {
    marginLeft: 10,
    backgroundColor: '#194467'
  },
  submitButontext: {
    color: colors.secondary,
    fontSize:moderateScale(11)
  },
  disabledInput: {
    backgroundColor: 'lightgrey',
    color: 'grey'
  },
  textInput : {
    fontSize:moderateScale(11),
  },
  customFieldLabel: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize:moderateScale(11),
    color:'grey'
  },
  dropDownColor: {
    backgroundColor: colors.secondary
  },
  Picker: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
  },
  colorWhite: {
    color: colors.secondary
  },
  textHeading: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
   
    fontSize:moderateScale(12)
  },
  marginTop60 : {
    marginTop:'60%'
  },
 
});
