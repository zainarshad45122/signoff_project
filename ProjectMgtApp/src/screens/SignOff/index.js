import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import { useTheme, Card, Divider, Paragraph, Text, Button,FAB, TextInput } from 'react-native-paper';
import { getValue } from '../../helper/storageWrapper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Camera from '../../components/camera';
import SignOff from './signOff'
import Modal from '../../components/modal';
import styles from './style';
var RNFS = require('react-native-fs');

export default function index(props) {
    const { navigation } = props;
    const { colors } = useTheme();
    const job = navigation.getParam('job');
    const [images, setImages] = useState([]);
    const [signature, setSignature] = useState('');
    const [savedSignature, setSavedSignature] = useState('');
    const [isCamera, setIsCamera] = useState(false);
    const [isSignOff, setIsSignOff] = useState(false);
    const [isTabChanged, setIsTabChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const SubmitButton = () => <FAB label={'SUBMIT'} style={styles.fab} onPress={() => handleSubmit()} />

    useEffect(() => {
        (async () => {
            const email = await getValue('email');
            const userName = await getValue('userName');
            setUserName(userName);
            setEmail(email);
        })();
    }, []);

    const handleCameraView = (flag) => {
        setIsCamera(flag);
    };


    const handleDeleteImage = (index) => {
        let imagesArray = [...images];
        imagesArray.splice(index, 1);
        setImages(imagesArray);
    };

    const handleSubmit = () => {
        console.log('Submit data', signature);
        console.log('Submit Data')
    };

    const handleSignature = (signature) => {
        console.log('OK is Called', signature);
        setSavedSignature(signature);
        let spliteBase = signature.split('base64,');
        let encoded = spliteBase[1];
        console.log('encoded is ', encoded);
        let path = `file://${RNFS.DownloadDirectoryPath}/ProjectManagementApp/SignOff`;
        RNFS.mkdir(path);
        path += '/signature.jpeg';
        console.log('signature path', path)
        RNFS.writeFile(path, encoded, 'base64').then(async (filepath) => {
            if (RNFS.exists(path)) {
            }
            console.log('Success', filepath);
            setSignature(path);
        })
    };

    return (

        <View style={isCamera ? styles.cameraContainer : styles.container}>
            {isCamera ? <Camera images={images} setImages={setImages} setIsCamera={setIsCamera} handleCameraView={handleCameraView} handleDeleteImage={handleDeleteImage} />
                :
                <>
                    <Modal isOpen={visible} isClose={() => setVisible(false)} title="Error Fetching Jobs" type="error" message={errorMessage} />
                    <Header navigation={navigation} backButton={true} isSignOff={true} handleCameraView={handleCameraView} />
                    <View style={styles.flexDirectionRow}>
                        <TouchableOpacity style={styles.centerItems} onPress={() => { setIsTabChanged(false); setIsSignOff(false) }}>
                            <Button mode="text">
                                <Text style={{ color: isTabChanged ? colors.secondary : colors.success }}>Job Details</Text>
                            </Button>

                            <Icon name="dot-circle" size={20} color={isTabChanged ? colors.secondary : colors.success} />
                        </TouchableOpacity>
                        <View style={styles.centerItems}>
                            <Button mode="text">
                                <Icon name="arrow-right" size={20} color={colors.secondary} style={{ flex: 1 }} />
                            </Button>
                        </View>
                        <TouchableOpacity style={styles.centerItems} onPress={() => { setIsTabChanged(true); setIsSignOff(true) }}>
                            <Button mode="text">
                                <Text style={{ color: isTabChanged ? colors.success : colors.secondary }}>SignOff Job</Text>
                            </Button>
                            <Icon name="dot-circle" size={20} color={isTabChanged ? colors.success : colors.secondary} />
                        </TouchableOpacity>
                    </View>

                    {isSignOff ?
                        <SignOff handleSignature={handleSignature} savedSignature={savedSignature} setSavedSignature={setSavedSignature} setSignature={setSignature} />
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={styles.scrollStyle}
                            style={{ width: '100%' }}
                        >
                            <Card style={[styles.card]}>

                                <View style={[styles.flexDirectionRow, styles.cardTopBar]}>
                                    <Paragraph style={{ color: colors.secondary }}>Job Id : {job.idJobCustomer}</Paragraph>
                                    <Paragraph style={[styles.marginLeftAuto, { color: colors.secondary }]}>Date : {job.Job_Date}</Paragraph>
                                </View>
                                <Card.Content>
                                    <Divider style={{ marginBottom: 10 }} />

                                    <View style={styles.flexDirectionRow}>
                                        <Text style={styles.headingStyle}>Client Name : </Text>
                                        <Text style={styles.textStyle}> {job.clientName}</Text>
                                    </View>

                                    <Divider />
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.headingStyle}>Supplier Name : </Text>
                                        <Text style={styles.textStyle}> {job.supplierName}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.headingStyle}>Supplier Address : </Text>
                                        <Text style={styles.textStyle}> {job.pickup_address}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.headingStyle}>Customer Name : </Text>
                                        <Text style={styles.textStyle}> {job.customerName}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.headingStyle}>Customer Address : </Text>
                                        <Text style={styles.textStyle}> {job.delivery_address}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewStyle}>
                                        <Text style={styles.headingStyle}>Items : </Text>
                                        <Text style={styles.textStyle}> {job.Item_Description}</Text>
                                    </View>

                                </Card.Content>
                            </Card>
                            {images.length > 0 ?
                                <View style={{ marginTop: '5%' }}>
                                    <Divider style={{ backgroundColor: 'grey' }} />
                                    <Text style={{ color: colors.secondary }}>Images</Text>
                                </View>
                                : <></>
                            }

                            <FlatList
                                horizontal={true}
                                data={images}
                                nestedScrollEnabled={true}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View
                                        style={styles.imageView}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item }}
                                        />
                                        <Icon style={styles.imageDeleteIcon} name="times-circle" size={20} color={'red'} onPress={() => handleDeleteImage(index)} />
                                    </View>
                                )}
                            />
                            <Card style={[styles.card]}>
                                <View style={[styles.flexDirectionRow, styles.cardTopBar]}>
                                    <Paragraph style={{ color: colors.secondary }}>Consignee Details</Paragraph>
                                </View>
                                <Card.Content>
                                    <Text style={styles.label}>Consignee Email</Text>
                                    <TextInput
                                        mode="outlined"
                                        outlineColor="grey"
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        style={[styles.textInput]}
                                    />
                                    <Text style={styles.label}>Consignee Username</Text>
                                    <TextInput
                                        mode="outlined"
                                        outlineColor="grey"
                                        value={userName}
                                        onChangeText={text => setUserName(text)}
                                        style={[styles.textInput]}
                                    />
                                </Card.Content>
                            </Card>
                        </ScrollView>
                    }



                </>
            }
            {!isCamera ? <SubmitButton /> : <></>}

        </View >
    );
}
