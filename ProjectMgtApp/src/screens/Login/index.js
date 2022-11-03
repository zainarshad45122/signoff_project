import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Title, TextInput, Divider, HelperText, ActivityIndicator } from 'react-native-paper';
import Header from '../../components/header';
import { useTheme } from 'react-native-paper';
import { loginAPI } from '../../ApiManager/request';
import { POST } from '../../ApiManager/apiManager';
import { saveUserData } from '../../helper/helperFunctions';
import * as config from '../../helper/config';

import Modal from '../../components/modal';
import styles from './style';

export default function index(props) {
  const { colors } = useTheme();
  const { state } = props.navigation;
  const [server, setServer] = useState('');
  const [isServerReachable, setIsServerReachable] = useState(false);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkServerWithHttps = server => {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://' + server);
    request.send();
    request.onload = function () {
      if (request.status != 200) {
        // e.g. 404: Not Found
        setIsServerReachable(false);
      } else {
        setIsServerReachable(true);
        setServer(server);
      }
    };
    request.onerror = function () {
      // Request failed
      setIsServerReachable(false);
    };
  };

  const handleLogin = async () => {
    let isError = false
    if (username === '') { setIsUsernameEmpty(true); isError = true }
    if (password === '') { setIsPasswordEmpty(true); isError = true }

    if (!isError) {
      setIsLoading(true);
      let loginUrl = `http://${server}/api/` + loginAPI;
      const configRequest = { url: loginUrl }
      const requestBody = { grant_type: 'password', password: password, username: username, client_id: config.clientId }

      POST(configRequest, requestBody, (response) => {
        response = response.data.Detail
        saveUserData(server, response) //Saving user data to async storage
        props.navigation.navigate('Dashboard'); //navigation to dashboard if login is successful

      }, (error) => {
          error= error.data != undefined ? error.data.Error : error ; 
          setErrorMessage(error); //Diplaying error message for unsccessful login
          setVisible(true);
          setIsLoading(false);
      })
    }

  }


  return (
    <>
      <View style={styles.container}>
        <Modal isOpen={visible} isClose={() => setVisible(false)} title="Login Failed" type="error" message={errorMessage} />
        <Header routeName={state.routeName} />
        <Card style={styles.card}>
          <Card.Content>
            <Title>Login</Title>
            <Divider style={{ margin: 15 }} />
            <TextInput
              mode="outlined"
              outlineColor="grey"
              label="Server"
              onChangeText={server => setServer(server)}
              left={<TextInput.Icon name="server" color={colors.primary} />}
              right={
                isServerReachable ? (
                  <TextInput.Icon
                    name="check"
                    color="green"
                  />
                ) : (
                  <TextInput.Icon
                    name="close"
                    color="red"
                  />
                )
              }
              onEndEditing={e => checkServerWithHttps(e.nativeEvent.text)}
            />
            <TextInput
              mode="outlined"
              outlineColor="grey"
              label="Username"
              onChangeText={text => setUsername(text)}
              left={<TextInput.Icon name="account" color={colors.primary} />}
              error={isUsernameEmpty}
            />
            {
              isUsernameEmpty ?
                <HelperText type="error" visible={isUsernameEmpty}>
                  Username cannot be empty
                </HelperText> : <></>
            }
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={showPassword}
              onChangeText={text => setPassword(text)}
              error={isPasswordEmpty}
              left={<TextInput.Icon name="lock" color={colors.primary} />}
              right={
                showPassword ? (
                  <TextInput.Icon
                    name="eye-off"
                    color={colors.primary}
                    onPress={() => {
                      setShowPassword(!showPassword)
                    }}
                  />
                ) : (
                  <TextInput.Icon
                    name="eye"
                    color={colors.primary}
                    onPress={() => {
                      setShowPassword(!showPassword)
                    }}
                  />
                )

              }
            />
            {
              isPasswordEmpty ?
                <HelperText type="error" visible={isUsernameEmpty}>
                  Password cannot be empty
                </HelperText> : <></>
            }
            <ActivityIndicator animating={isLoading} style={styles.activityIndicator} />
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => handleLogin()}>
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}