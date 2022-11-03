import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../components/header';
import MoreCustomFields from './moreCustomFields'
import { Card, Checkbox, List, TextInput, Button, ActivityIndicator, Text, Paragraph, useTheme } from 'react-native-paper';
import { getBaseUrl, updateJobCustomFields } from '../../ApiManager/request';
import Modal from '../../components/modal'
import CustomFieldModal from '../../components/customFieldModal'
import { GET } from '../../ApiManager/apiManager';
import styles from './style';


export default function index(props) {
    const { navigation } = props;
    const { colors } = useTheme();
    const job = navigation.getParam('job');
    const [customFields, setCustomFields] = useState([]);
    const [moreCustomFields, setMoreCustomFields] = useState([]);
    const [openCustomFieldModal, setOpenCustomFieldModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        handleCustomFieldsSelection();
        let timerid = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => {
            clearTimeout(timerid);
        };
    }, []);

    const handleCustomFieldsSelection = () => {

        job.custom_fields_detail.forEach((customField) => { //adding isSelected flag in the custom fields array, so we can identify which field is selected for update
            customField.isSelected = false;
        });

        job.more_custom_fields_detail.forEach((moreCustomField) => {
            moreCustomField.isSelected = false;
            if (moreCustomField.type == '2' || moreCustomField.type == '3') { //adding isDateOpen flag in the more custom fields array for date type fields
                moreCustomField.isDateOpen = false;                           // so we can identify for which date field the modal is opened
            }
        });
      
        setCustomFields(job.custom_fields_detail);
        setMoreCustomFields(job.more_custom_fields_detail);
    };



    const handleFieldsSelection = (index, isMoreCustomField) => {

        let jobCustomFields = [];
        if (isMoreCustomField) jobCustomFields = [...moreCustomFields]
        else jobCustomFields = [...customFields]
        jobCustomFields[index].isSelected = !(jobCustomFields[index].isSelected);
        isMoreCustomField ? setMoreCustomFields(jobCustomFields) : setCustomFields(jobCustomFields);

    };


    const handleSelectAll = (isAllSelected) => {

        let jobCustomFields = [];
        jobCustomFields = [...customFields]
        jobCustomFields.forEach((customField) => {
            customField.isSelected = isAllSelected;

        });

        let moreJobCustomFields = [];
        moreJobCustomFields = [...moreCustomFields]
        moreJobCustomFields.forEach((moreCustomField) => {
            moreCustomField.isSelected = isAllSelected;

        });

        setCustomFields(jobCustomFields);
        setMoreCustomFields(moreJobCustomFields);

    };



    const handleDateOpen = (index, value) => {
        let moreJobCustomFields = [];
        moreJobCustomFields = [...moreCustomFields]
        moreJobCustomFields[index].isDateOpen = value;
        setMoreCustomFields(moreJobCustomFields);
    };

    const handleChangeValue = (value, index, isMoreCustomField) => {
        let jobCustomFields = [];
        if (isMoreCustomField) jobCustomFields = [...moreCustomFields]
        else jobCustomFields = [...customFields]
        jobCustomFields[index].Value = value;
        isMoreCustomField ? setMoreCustomFields([...jobCustomFields]) : setCustomFields([...jobCustomFields]);

    };
    const handleNumberOfSelectedFields = () => {
        let numberOfSelectedFields = 0
        customFields.forEach((customField) => {
            if (customField.isSelected) numberOfSelectedFields++
        });
        moreCustomFields.forEach((moreCustomField) => {
            if (moreCustomField.isSelected) numberOfSelectedFields++
        });
        return numberOfSelectedFields;
    };


    const handleSubmit = async () => {

        setIsLoading(true);
        const baseUrl = await getBaseUrl();
        let customFieldUpdateUrl = baseUrl + updateJobCustomFields;

        let pickupAddressId = job.Supplier_LocationId;
        let deliveryAddressId = job.Customer_LocationId;

        let selectedCustomFields = customFields.filter((customField) => {  // Getting all the custom selected fields for update
            return customField.isSelected == true;
        });

        let selectedMoreCustomFields = moreCustomFields.filter((moreCustomField) => { // Getting all the more custom fields selected for update
            return moreCustomField.isSelected == true; 
        });

        let fieldsDetail = { idJobCustomer: job.idJobCustomer };

        selectedCustomFields.forEach((customField) => { // Creating object of every selected custom field to update
            let id = customField.customFieldId;
            let value = customField.Value;
            fieldsDetail[id] = value;
        });

        let moreCustomFieldsDetail = [];

        selectedMoreCustomFields.forEach((moreCustomField) => { // Creating object of every more selected custom field to update
            let value = {
                customFieldId: moreCustomField.id,
                value: moreCustomField.Value,
                fieldType: moreCustomField.fieldType,
                name: moreCustomField.Name,
            };
            moreCustomFieldsDetail.push(value);
        });

        fieldsDetail['moreCustomFields'] = moreCustomFieldsDetail;
        let updatedFields = [fieldsDetail];
        updatedFields = JSON.stringify(updatedFields)

        let params = { updatedFields: updatedFields, pickupAddressId: pickupAddressId, deliveryAddressId: deliveryAddressId }
        let configRequest = { url: customFieldUpdateUrl }

        GET(configRequest, params, (response) => {
            setIsLoading(false);
            setOpenCustomFieldModal(false);
        }, (error) => {
            error = error.internet == undefined ? error : error.internet.msg;
            setErrorMessage(error);
            setVisible(true);
            setOpenCustomFieldModal(false);
            navigation.navigate('SignOff', { job: job });
        })
    };



    return (
        <View style={styles.container}>
               <Header navigation={navigation} backButton={true} isCustomField={true} skip={()=> navigation.navigate('SignOff', { job: job })}/>
            {loading ? <ActivityIndicator animating={loading} color={colors.secondary} style={styles.marginTop60} /> :
                <>
                    <Modal isOpen={visible} isClose={() => setVisible(false)} title="Error Submitting Custom Fields" type="error" message={errorMessage} />
                    <CustomFieldModal
                        isOpen={openCustomFieldModal}
                        isClose={() => setOpenCustomFieldModal(false)}
                        loading={isLoading}
                        numberOfSelectedFields={handleNumberOfSelectedFields}
                        handleSubmit={handleSubmit}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollStyle}>
                        <Card style={styles.card}>
                            <View style={[styles.flexDirectionRow, styles.cardTopBar]}>
                                <Paragraph style={styles.colorWhite}>Job Id : {job.idJobCustomer}</Paragraph>
                                <Paragraph style={[styles.marginLeftAuto, styles.colorWhite]}>Date : {job.Job_Date}</Paragraph>
                            </View>
                            <Card.Content>
                                {
                                    customFields.length > 0 ?
                                        <View>
                                            <Text style={styles.textHeading}>Custom Fields</Text>
                                            {customFields.map((customField, index) => {
                                                return (
                                                    <>
                                                        <Text style={styles.customFieldLabel}>Name : {customField.Name}</Text>
                                                        <View style={styles.flexDirectionRow}>
                                                            <View style={styles.checkBoxStyle}>
                                                                {console.log('CF inside view', customField)}
                                                                <Checkbox
                                                                    status={customField.isSelected ? 'checked' : 'unchecked'}
                                                                    onPress={() => handleFieldsSelection(index, false)}
                                                                />
                                                            </View>
                                                            <TextInput
                                                                mode="outlined"
                                                                outlineColor="grey"
                                                                value={customField.Value}
                                                                style={[styles.flexStyle, styles.textInput, customField.isSelected ? styles.disabledInput : '']}
                                                                disabled={customField.isSelected}
                                                                onChangeText={(text) => handleChangeValue(text, index, false)}

                                                            />
                                                        </View>
                                                    </>
                                                )
                                            })}
                                        </View> : <></>
                                }

                                {
                                    moreCustomFields.length > 0 ?
                                        <List.Section>
                                            <Text style={styles.textHeading}>More Custom Fields</Text>
                                            {moreCustomFields.map((moreCustomField, index) => {
                                                return (
                                                    <>
                                                        <Text style={styles.customFieldLabel}>Name : {moreCustomField.Name}</Text>
                                                        <View style={styles.flexDirectionRow}>
                                                            <View style={styles.checkBoxStyle}>
                                                                <Checkbox
                                                                    status={moreCustomField.isSelected ? 'checked' : 'unchecked'}
                                                                    onPress={() => handleFieldsSelection(index, true)}
                                                                />
                                                            </View>
                                                            <View style={styles.flexStyle}>
                                                                <MoreCustomFields
                                                                    moreCustomField={moreCustomField}
                                                                    handleDateOpen={handleDateOpen}
                                                                    handleChangeValue={handleChangeValue}
                                                                    index={index}
                                                                />
                                                            </View>
                                                        </View>
                                                    </>
                                                )
                                            })}
                                        </List.Section> : <></>
                                }
                            </Card.Content>
                        </Card>
                    </ScrollView>

                    <View style={[styles.bottomButtonsView]}>
                        <Button style={[styles.flexStyle, styles.bottomButtons]} mode="contained" onPress={() => handleSelectAll(true)}>
                            <Text style={[styles.textStyle]}>Select All</Text>
                        </Button>
                        <Button style={[styles.flexStyle, styles.bottomButtons]} mode="contained" onPress={() => handleSelectAll(false)}>
                            <Text style={styles.textStyle}>Clear All</Text>
                        </Button>
                        <Button style={[styles.flexStyle, styles.submitButton]} mode="contained" onPress={() => setOpenCustomFieldModal(true)}>
                            <Text style={styles.submitButontext}>Submit</Text>
                        </Button>
                    </View>
                </>
            }
        </View>
    );
}
