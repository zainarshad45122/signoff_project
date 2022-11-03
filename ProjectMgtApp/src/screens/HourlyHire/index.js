import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Header from '../../components/header';
import { Card, TextInput, Button, ActivityIndicator, Text, Paragraph, useTheme, FAB } from 'react-native-paper';
import { getBaseUrl, saveJobTimeDetail } from '../../ApiManager/request';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import Modal from '../../components/modal'
import LoaderModal from '../../components/loaderModal';
import { GET } from '../../ApiManager/apiManager';
import { getValue } from '../../helper/storageWrapper';
import GetLocation from 'react-native-get-location';
import HourlyHireEntries from './hourlyHireEntries';
import { moderateScale } from '../../helper/helperFunctions';
import moment from 'moment';
import styles from './style';

export default function HourlyHire(props) {
    const { navigation } = props;
    const { colors } = useTheme();
    const job = navigation.getParam('job');
    const hourlyHireDetails = job.hourlyHireDetails[0];
    const [hourlyHireEntries, setHourlyHireEntries] = useState(hourlyHireDetails.hourlyHireEntries);
    const [startDate, setStartDate] = useState(hourlyHireDetails.jobStartTime);
    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [endDate, setEndtDate] = useState(hourlyHireDetails.jobEndTime);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);
    const [jobReturnTime, setJobReturnTime] = useState(hourlyHireDetails.returnTime);
    const [isJobReturnTimeOpen, setIsJobReturnTimeOpen] = useState(false);
    const [returnCharge, setReturnCharge] = useState(hourlyHireDetails.returnCharge);
    const [hourlyHireDescription, setHourlyHireDescription] = useState(hourlyHireDetails.hourlyDescriptionText);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isFirstTab, setIsFirstTab] = useState(true);
    const [isTabChanged, setIsTabChanged] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const dateTimeFormat = "YYYY-MM-DD HH:mm:ss"

    const SubmitButton = () => <FAB  label={'UPDATE'} style={styles.fab} onPress={() => handleSubmit()} />
    const HourlyHireHeader = () =>
        <View style={[styles.cardTopBar, styles.textStyle]}>
            <Paragraph style={styles.topBarText}>You are entering Hourly Details for Job Id : {job.idJobCustomer}</Paragraph>
        </View>

    useEffect(() => {
        handleHourlyHireEnteries();
        let timerid = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => {
            clearTimeout(timerid);
        };
    }, []);


    const handleHourlyHireEnteries = () => {

        hourlyHireDetails.hourlyHireEntries.forEach((entry) => {
            entry.isStartDateOpen = false; //adding isDateOpen flag in the hourlyHireEntries array for date type fields                       
            entry.isEndDateOpen = false;  // so we can identify for which date field the modal is opened
        });

        setHourlyHireEntries(hourlyHireDetails.hourlyHireEntries);

    };
    const handleDateOpen = (flag, index, isStartDate) => {
        setHourlyHireEntries(current =>
            current.map((obj, i) => {
                if (i === index) {
                    if (isStartDate) return { ...obj, isStartDateOpen: flag };
                    else return { ...obj, isEndDateOpen: flag };
                }
                return obj;
            }),
        );

    };

    const handleChangeValue = (value, index, isStartDate) => {

        setHourlyHireEntries(current =>
            current.map((obj, i) => {
                if (i == index) {
                    if (isStartDate) return { ...obj, startTime: value };
                    else return { ...obj, endTime: value };
                }
                return obj;
            }),
        );

    };


    const handleTabChange = (flag) => {
        setIsTabChanged(flag);
        setIsLoading(true);
        let timerid = setTimeout(() => {
            setIsFirstTab(flag);
            setIsLoading(false);
        }, 100);
    }

    const handleSignOff = () => {
        let customFieldsLength = job.custom_fields_detail.length;
        let moreCustomFieldsLength = job.more_custom_fields_detail.length;

        if (customFieldsLength > 0 || moreCustomFieldsLength > 0) {
            navigation.navigate('CustomFields', { job: job });
        }
        else {
          //  navigation.navigate('HourlyHire', { job: job });
          console.log('Navigate to Sign off');
        }
    }

    const handleSubmit = async () => {
        if (startDate == null || startDate == "") { setErrorMessage('Start date cannot be empty'); setVisible(true); }
        else if (endDate == null || endDate == "") { setErrorMessage('End date cannot be empty'); setVisible(true); }
        else if (returnCharge == 1 && (jobReturnTime == null || jobReturnTime == '')) {
            setErrorMessage('Job return time cannot be emprty'); setVisible(true);
        }
        else {
            setSubmitLoading(true);
            const baseUrl = await getBaseUrl();
            const userId = await getValue('userId');
            let hourlyHireUpdateUrl = baseUrl + saveJobTimeDetail;
            let gpsCoordinate = '';
            await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then((location) => {
                    gpsCoordinate = `${location.latitude},${location.longitude}`;
                })
                .catch((error) => {
                    setVisible(true); setErrorMessage(error)
                });
            let hourlyHireEntriesArray = [];
            hourlyHireEntries.forEach((data, index) => {
                let hourlyHireEntry = {
                    startTime: data.startTime,
                    endTime: data.endTime,
                    location: data.location,
                    description: data.description,
                    quantity: data.quantity,
                };
                hourlyHireEntriesArray.push(hourlyHireEntry);
            });
            let params = {
                idJobCustomer: job.idJobCustomer,
                jobStartTime: startDate,
                jobEndTime: endDate,
                jobReturnCharge: returnCharge,
                gpsCoordinate: gpsCoordinate,
                hourlyHireEntiresArray: JSON.stringify(hourlyHireEntriesArray),
                jobHourlyDescription: hourlyHireDescription,
                driverId: userId,
            }
            if (returnCharge == 1) params['jobReturnTime'] = jobReturnTime;
            let configRequest = { url: hourlyHireUpdateUrl }
            GET(configRequest, params, (response) => {
                setSubmitLoading(false);
                handleSignOff();
            }, (error) => {
                setSubmitLoading(false);
                error = error.internet == undefined ? error : error.internet.msg;
                setErrorMessage(error);
                setVisible(true);
            })
        }
    };

    return (
        <View style={[styles.scene, styles.container]}>
            <Modal isOpen={visible} isClose={() => setVisible(false)} title="Error Fetching Jobs" type="error" message={errorMessage} />
            <LoaderModal isOpen={submitLoading} isClose={() => setSubmitLoading(false)} />
            <Header navigation={navigation} backButton={true} isHourlyHire={true} skip={handleSignOff} />
            {loading ? <ActivityIndicator animating={loading} color={colors.secondary} style={styles.marginTop50} /> :
                <>
                    <View style={styles.flexDirectionRow}>
                        <Button
                            style={[styles.tabButton, { backgroundColor: isTabChanged ? colors.secondary : colors.primary }]}
                            mode="outlined"
                            onPress={() => handleTabChange(true)}>
                            <Text style={[{ color: isTabChanged ? colors.primary : colors.secondary }, styles.textStyle]}>Hourly Hire</Text>

                        </Button>
                        <Button
                            style={[styles.tabButton, { backgroundColor: !isTabChanged ? colors.secondary : colors.primary, marginLeft: 10 }]}
                            mode="outlined"
                            onPress={() => handleTabChange(false)}>
                            <Text style={[{ color: !isTabChanged ? colors.primary : colors.secondary }, styles.textStyle]}>Hourly Hire Entries</Text>
                        </Button>

                    </View>
                    <HourlyHireHeader />
                    {isLoading ? <ActivityIndicator animating={isLoading} color={colors.secondary} style={styles.marginTop50} /> :

                        isFirstTab ?
                            <>
                                <Card style={[styles.card, styles.marginTop20]}>
                                    <Card.Content>
                                        <View style={[styles.flexDirectionRow]}>
                                            <View style={styles.flexStyle}>
                                                <Text style={styles.label}>Start Time </Text>
                                                <DatePicker
                                                    mode="datetime"
                                                    modal
                                                    open={isStartDateOpen}
                                                    is24hourSource={true}
                                                    maximumDate={endDate == "" ? "" : new Date(moment(endDate))}
                                                    date={startDate == "" ? new Date() : new Date(moment(startDate))}
                                                    onCancel={() => setIsStartDateOpen(false)}
                                                    onConfirm={(value) => {
                                                        setIsStartDateOpen(false)
                                                        let date = moment(value).format(dateTimeFormat).toString();
                                                        setStartDate(date);
                                                    }}
                                                />
                                                <TextInput
                                                    mode="outlined"
                                                    value={startDate}
                                                    editable={false}
                                                    right={<TextInput.Icon size={moderateScale(17)} name="calendar" color={colors.primary} onPress={() => setIsStartDateOpen(true)} />}
                                                    theme={{ colors: { text: 'black' } }}
                                                    style={styles.textInput}
                                                />
                                            </View>
                                            <View style={[styles.flexStyle, styles.marginLeft]}>
                                                <Text style={styles.label}>End Time </Text>
                                                <DatePicker
                                                    mode="datetime"
                                                    modal
                                                    open={isEndDateOpen}
                                                    is24hourSource={true}
                                                    minimumDate={startDate == "" ? "" : new Date(moment(startDate))}
                                                    date={endDate == "" ? new Date() : new Date(moment(endDate))}
                                                    onCancel={() => setIsEndDateOpen(false)}
                                                    onConfirm={(value) => {
                                                        setIsEndDateOpen(false)
                                                        let date = moment(value).format(dateTimeFormat).toString();
                                                        setEndtDate(date);
                                                    }}
                                                />
                                                <TextInput
                                                    mode="outlined"
                                                    value={endDate}
                                                    editable={false}
                                                    style={styles.textInput}
                                                    right={<TextInput.Icon name="calendar" size={moderateScale(17)} color={colors.primary} onPress={() => setIsEndDateOpen(true)} />}
                                                    theme={{ colors: { text: 'black' } }}
                                                />
                                            </View>
                                        </View>
                                        <View style={[styles.flexDirectionRow]}>
                                            <View style={styles.flexStyle}>
                                                <Text style={[styles.label, styles.marginBottom10]}>Return Charge </Text>
                                                <View style={styles.Picker} >
                                                    <Picker
                                                        selectedValue={returnCharge}
                                                        onValueChange={(text) => setReturnCharge(text)}

                                                    >
                                                        <Picker.Item label="Yes" value="1" />
                                                        <Picker.Item label="No" value="0" />
                                                    </Picker>
                                                </View>
                                            </View>
                                            {returnCharge == 1 ?
                                                <View style={[styles.flexStyle, styles.marginLeft]}>
                                                    <Text style={[styles.label, styles.marginBottom10]}>Job Return Time </Text>
                                                    <DatePicker
                                                        mode="date"
                                                        modal
                                                        open={isJobReturnTimeOpen}
                                                        is24hourSource={true}
                                                        date={jobReturnTime == "" ? new Date() : new Date(moment(jobReturnTime))}
                                                        onCancel={() => setIsJobReturnTimeOpen(false)}
                                                        onConfirm={(value) => {
                                                            setIsJobReturnTimeOpen(false)
                                                            let date = moment(value).format(dateTimeFormat).toString();
                                                            setJobReturnTime(date);
                                                        }}
                                                    />

                                                    <TextInput
                                                        mode="outlined"
                                                        value={jobReturnTime}
                                                        editable={false}
                                                        right={<TextInput.Icon name="calendar" size={moderateScale(17)} color={colors.primary} onPress={() => setIsJobReturnTimeOpen(true)} />}
                                                        theme={{ colors: { text: 'black' } }}
                                                        style={[styles.textInput, styles.marginTop8]}

                                                    />
                                                </View> : <></>}
                                        </View>
                                        <Text style={styles.label}>Hourly Description </Text>
                                        <TextInput
                                            mode="outlined"
                                            value={hourlyHireDescription}
                                            onChangeText={(text) => setHourlyHireDescription(text)}
                                            multiline={true}
                                            numberOfLines={5}
                                            style={styles.textStyle}
                                        />

                                    </Card.Content>
                                </Card>
                            </> :
                            <HourlyHireEntries
                                hourlyHireEntries={hourlyHireEntries}
                                handleDateOpen={handleDateOpen}
                                handleChangeValue={handleChangeValue}
                                setHourlyHireEntries={setHourlyHireEntries}
                                dateTimeFormat={dateTimeFormat}
                            />
                    }
                </>
            }
            <SubmitButton />
        </View>


    );
}
