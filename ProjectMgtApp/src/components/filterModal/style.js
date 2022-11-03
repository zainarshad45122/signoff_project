import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const {colors} = theme;

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    position: 'relative',
    borderRadius: 3,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignSelf: 'center',
    color: colors.primary
  },
  searchButton: {
    backgroundColor: colors.primary, 
    width:'40%', 
    height:40,  
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  flexDirection: {
    flexDirection: 'row'
  },
  textMarginLeft: {
    marginLeft: 10
  },
  marginTop: {
    marginTop: 10
  },
  flexStyle : {
    flex : 1
  }
});
