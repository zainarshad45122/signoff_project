import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as constants from '../../helper/constants';
import { useTheme, Text } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import styles from './style';

export default function index(props) {
  const netInfo = useNetInfo();
  const { colors } = useTheme();
  const { navigation, backButton, forwardButton, logoutButton, isDashboard, isCustomField, isHourlyHire, isSignOff, handleCameraView, skip } = props;

  return (
    <>
      <View style={styles.container}>

        {logoutButton ? (
          <TouchableOpacity
            onPress={() => props.handleLogout()}
          >
            <Icon name="power-off" size={20} color={colors.secondary} />
          </TouchableOpacity>
        ) : (
          backButton ?
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={20} color={colors.secondary} />
            </TouchableOpacity>
            :
            <></>
        )}

        <View style={styles.centerAlign}>
          <Image source={constants.headerLogo} style={[styles.headerImage, isDashboard ? styles.marginLeftLogo : '']} />
          <View style={[{ borderColor: netInfo.isConnected ? colors.success : colors.error }, styles.headerInternetLine, isDashboard ? styles.marginLeftLogo : '']} />
          <View>
            {!netInfo.isConnected ? <Text style={styles.textStyle}>No Internet Connection</Text> : <></>}
          </View>
        </View>

        {forwardButton ? (
          <TouchableOpacity
          >
            <Icon name="arrow-right" size={20} color={colors.secondary} />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {isDashboard ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('JobListing')}
            style={styles.rightButton}
            rippleColor={colors.primary}
          >
            <Text style={styles.buttonText}> {'SIGN OFF'}{'\n'}{`   JOBS`} </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        { (isCustomField || isHourlyHire)  ?  (
          <TouchableOpacity
            onPress={() => skip()}
            style={styles.rightButton}
            rippleColor={colors.primary}
          >
            <Text style={styles.buttonText}> {'SKIP'} </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        { (isSignOff)  ?  (
          <TouchableOpacity
            onPress={() => handleCameraView(true)}
            style={styles.cameraButton}
            rippleColor={colors.primary}
          >
            <Icon name="camera" size={25} color={colors.secondary} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}
