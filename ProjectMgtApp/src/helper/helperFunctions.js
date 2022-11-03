import { Dimensions } from 'react-native';
import { setValue, removeItemValue, getValue } from '../helper/storageWrapper';
import crashlytics from '@react-native-firebase/crashlytics';
import moment from 'moment';

export const saveUserData = (server, response) => {
    let accessToken = response.access_token
    let refreshToken = response.refresh_token
    let userDetails = response.userDetails
    let userName = userDetails.loginName
    let userId = userDetails.userId
    let email= userDetails.emailAddress
    setValue('loginStatus', 'true')
    setValue('serverName', server)
    setValue('aToken', accessToken)
    setValue('rToken', refreshToken)
    setValue('userName', userName)
    setValue('email', email)
    setValue('userId', userId)
};


export const deleteUserData = () => {

    setValue('loginStatus', 'false')
    removeItemValue('aToken')
    removeItemValue('rToken')
    removeItemValue('userName')
    removeItemValue('email')
    removeItemValue('userId')
};

export const sendCrashlyticsReport = async (error) => {

    const loginStatus = await getValue('loginStatus');
    if (loginStatus == 'true') {
        const userId = await getValue('userId');
        crashlytics().log(error);
        await Promise.all([
            crashlytics().setUserId(userId),
        ]);
        crashlytics().recordError(error);
    }
    else {
        crashlytics().log(error);
        crashlytics().recordError(error);
    }

};

export const isValidJSON = response => {
   
    let obj = JSON.stringify(response)
   
    try {
    console.log('obj', obj)
      JSON.parse(obj);
      console.log('Json response',true)
      return true;
    } catch (e) {
        console.log('Json response',false)
      return false;
    }
  };

  export const timeDifference = (endTime, startTime) => {

    let ms = moment(startTime,"YYYY-MM-DD HH:mm:ss").diff(moment(endTime,"YYYY-MM-DD HH:mm:ss"));
    let d = moment.duration(ms);
    let timeDifference = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    return timeDifference;
  };

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};
  