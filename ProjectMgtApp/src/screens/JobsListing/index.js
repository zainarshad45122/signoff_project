import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Header from '../../components/header';
import { useTheme, Card, Divider, Paragraph, Text, Button, ActivityIndicator } from 'react-native-paper';
import { getBaseUrl, getSupervisorJobs } from '../../ApiManager/request';
import { getValue } from '../../helper/storageWrapper';
import { GET } from '../../ApiManager/apiManager';
import Modal from '../../components/modal';
import styles from './style';

export default function index(props) {
    const { navigation } = props;
    const { colors } = useTheme();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const baseUrl = await getBaseUrl();
            const userId = await getValue('userId');
            const accessToken = await getValue('aToken');
            let getSupervisorJobsUrl = baseUrl + getSupervisorJobs;

            let params = { supervisorId: userId, grant_type: 'access_token', access_token: accessToken }
            let configRequest = { url: getSupervisorJobsUrl }

            GET(configRequest, params, (response) => {
                const responseData = response.data.Detail.project_data;
                setJobs(responseData)
                setLoading(false)

            }, (error) => {
                error = error.internet == undefined ? error : error.internet.msg;
                setErrorMessage(error);
                setVisible(true);
                setLoading(false)

            })

        })();
    }, []);

    const handleSignOff = (job) => {
        let customFieldsLength = job.custom_fields_detail.length;
        let moreCustomFieldsLength = job.more_custom_fields_detail.length;

        if(job.jobType==4) {
            navigation.navigate('HourlyHire', { job: job });
        }

        else if (customFieldsLength > 0 || moreCustomFieldsLength > 0) {
            navigation.navigate('CustomFields', { job: job });
        }
        else {
            navigation.navigate('SignOff', { job: job });
        }
    };

    return (
        <View style={styles.container}>
            <Modal isOpen={visible} isClose={() => setVisible(false)} title="Error Fetching Jobs" type="error" message={errorMessage} />
            <Header navigation={navigation} backButton={true} />
            {loading ? <ActivityIndicator animating={loading} color={colors.secondary} style={styles.marginTop40} /> : <></>}
            {
                Array.isArray(jobs) ? jobs.length == 0 && !loading ?
                    <Text style={styles.noJobsText}> No Jobs Available </Text>
                    :
                    <FlatList
                        style={styles.flatlistStyle}
                        data={jobs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) => {
                            let job = item.item
                            return (
                                <View style={styles.alignItemsCenter} key={job.idJobCustomer}>
                                    <Card style={styles.card}>
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
                                        <Card.Actions>
                                            <Button style={styles.buttonStyle} mode="contained" onPress={() => { handleSignOff(job) }}>SIGN OFF</Button>
                                        </Card.Actions>
                                    </Card>
                                </View>
                            );
                        }
                        }
                    />
                    :
                    <Text style={styles.noJobsText}> No Jobs Available </Text>
            }
        </View>
    );
}
