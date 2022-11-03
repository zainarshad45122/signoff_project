import { StyleSheet } from "react-native";
import { moderateScale } from '../../helper/helperFunctions'
import { theme } from "../../../theme";

const { colors } = theme;
export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: '100%',
    width: '100%'
  },
  cameraView : {
    height:'70%',
    width:'100%'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
    backgroundColor: colors.secondary
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
    top: 5,
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%'
  },
  cameraButtonText : {
    color: colors.secondary,
   
  }
});
