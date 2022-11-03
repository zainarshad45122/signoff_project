import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

const { colors } = theme;

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    height: '100%',
    position: 'relative',
    alignItems: 'center'
  },
  mapStyle : {
    height: '100%', 
    width: '100%'
  },
  mapPadding : {
    top: 100, 
    right: 0, 
    bottom: 0,
    left: 0
  }

});
