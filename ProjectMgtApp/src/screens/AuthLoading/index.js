import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getValue } from '../../helper/storageWrapper';
import styles from './style';
import { useTheme } from 'react-native-paper';

export default function index(props) {
const { colors } = useTheme();

    useEffect(() => {
        (async () => {
            let isLoggedIn = false;
            const loginStatus = await getValue('loginStatus');
            if (loginStatus != null && loginStatus == 'true') isLoggedIn = true;
            props.navigation.navigate(isLoggedIn ? 'Auth' : 'App');
        })();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={colors.secondary} />
        </View>

    );
}
