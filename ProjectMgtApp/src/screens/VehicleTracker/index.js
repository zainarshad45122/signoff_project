import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Header from '../../components/header';
import VehicleTrackerModal from '../../components/vehicleTrackerModal';
import { getValue } from '../../helper/storageWrapper';
import { getBaseUrl, getTrackerDetail } from '../../ApiManager/request';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { carIcon } from '../../helper/constants'
import Modal from '../../components/modal';
import axios from 'axios';
import styles from './style';

export default function index(props) {
    const { navigation } = props;
    const [customerLatitude, setCustomerLatitude] = useState(navigation.getParam('customerLatitude'));
    const [customerLongitude, setCustomerLongitude] = useState(navigation.getParam('customerLongitude'));
    const [openVehicleTrackerModal, setOpenVehicleTrackerModal] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [vehicleData, setVehicleData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const projectId = navigation.getParam('projectId');

    const { colors } = useTheme();
    const initialRegion = {
        latitude: Number(customerLatitude),
        longitude: Number(customerLongitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    useEffect(() => {
        (async () => {
            
            const baseUrl = await getBaseUrl();
            const accessToken = await getValue('aToken');
            let getTrackerDetailUrl = baseUrl + getTrackerDetail;

            setInterval(() => {
                axios
                .get(getTrackerDetailUrl, {
                    params: {
                        projectId: projectId,
                        grant_type: 'access_token',
                        access_token: accessToken,
                        truckIds: ''
                    },
                })
                .then((response) => {
                    console.log("Data is drivers", response.data.Detail);
                    if (response.data.Detail != '') {
                        setDrivers(response.data.Detail)
                    }
                })
                .catch(function (error) {
                    console.log('catch error', error);
                    setErrorMessage(error);
                    setVisible(true);
                })
            }, 1000);                      
        })();
    }, []);

    const handleVehicleTrackerModal = (vehicleData) => {
        setVehicleData(vehicleData);
        setOpenVehicleTrackerModal(true);
      };

    return (
        <View style={styles.container}>
            <Modal isOpen={visible} isClose={() => setVisible(false)} title="Error Fetching Drivers" type="error" message={errorMessage} />
            <VehicleTrackerModal isOpen={openVehicleTrackerModal} isClose={() => setOpenVehicleTrackerModal(false)} vehicleData={vehicleData}/>
            <Header navigation={navigation} backButton={true} />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapPadding={styles.mapPadding}
                initialRegion={initialRegion}
            >
                <MapView.Marker
                    key={1}
                    pinColor={colors.primary}
                    coordinate={{
                        latitude: Number(customerLatitude),
                        longitude: Number(customerLongitude),
                    }} />

                {drivers.map((driver, index) => {
                    return (
                        <MapView.Marker
                            key={index}
                            image={carIcon}
                            coordinate={{
                                latitude: Number(driver.latitude),
                                longitude: Number(driver.longitude),
                            }}
                            onPress={() => handleVehicleTrackerModal(driver)}
                        />
                    )
                })}

            </MapView>
        </View>
    );
}
