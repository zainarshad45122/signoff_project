
import React, { useState, useRef } from 'react';
import { TouchableOpacity, View, Image, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from '../../helper/helperFunctions'
import Modal from '../modal';
import styles from './style';

export default function index(props) {
    const { images, setImages, handleCameraView, handleDeleteImage } = props;
    const { colors } = useTheme();
    let [flash, setFlash] = useState('off')
    let [type, setType] = useState('back')
    let [permission, setPermission] = useState('undetermined')
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);
    let cameraRef = useRef(null)

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            let newImages = [];
            newImages = [...images];
            if (newImages.length == 5) {
                setErrorMessage('Cannot add more than 5 images');
                setVisible(true);
            }
            else {
                newImages.push(data.uri);
                setImages(newImages);
                console.log(data.uri);
            }
        }

    };
    return (
        <View style={styles.container}>
            <Modal isOpen={visible} isClose={() => setVisible(false)} title="Sign Off Images" type="error" message={errorMessage} />
            <View style={styles.cameraView}>
                <View style={{ marginBottom: 'auto', top: 0, padding: 20, zIndex: 20 }}>
                    <TouchableOpacity onPress={() => handleCameraView(false)}>
                        <Icon name="arrow-left" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                </View>
                <RNCamera
                    ref={cameraRef}
                    style={styles.preview}
                    type={type}
                    flashMode={flash}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
                <TouchableOpacity onPress={takePicture} style={styles.cameraButton}>
                    <Icon name="circle" size={moderateScale(50)} color={colors.secondary} />
                    <Text style={styles.cameraButtonText}>Capture</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    horizontal={true}
                    data={images}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{marginBottom : '5%'}}
                    keyExtractor={(item, index) => index.toString()}   
                    renderItem={({ item, index }) => (
                        <View style={styles.imageView}>
                            <Image
                                style={styles.image}
                                source={{ uri: item }}
                            />
                            <Icon style={styles.imageDeleteIcon} name="times-circle" size={moderateScale(20)} color={'red'} onPress={() => handleDeleteImage(index)} />
                        </View>
                    )}
                />
            </View>

        </View>


    );
}