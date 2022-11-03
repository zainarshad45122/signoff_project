import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
const { colors } = theme;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerImage: {
    resizeMode: "contain",
    height: 50,
  },
  headerInternetLine: {
    width: 55,
    borderWidth: 2.5,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginTop: 8
  },
  textStyle: {
    color: colors.error,
    fontSize: 13
  },
  centerAlign: {
    alignItems: 'center',
    marginLeft: "auto",
    marginRight: 'auto'
  },
  marginLeftLogo: {
    marginLeft: 30
  },
  rightButton: {
    padding: 10,
    marginRight: -30,
    marginTop: -10,
    borderRadius: 5,
    height: 60
  },
  cameraButton : {
    padding: 10,
    marginRight: -20,
    marginTop: -13,
  },
  buttonText : {
    color: colors.secondary, 
    fontWeight: 'bold'
  }
});
