import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Text, useTheme, AnimatedFAB, ProgressBar, List } from 'react-native-paper';
import Header from '../../components/header';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PieChart from '../../components/pieChart';
import SmallCard from '../../components/smallCard';

export default function index(props, animateFrom) {
    const { navigation } = props;
    const [project, setProject] = useState(props.navigation.getParam('project'));
    const [customerLatitude, setCustomerLatitude] = useState(0);
    const [customerLongitude, setCustomerLongitude] = useState(0);
    const { colors } = useTheme();
    const fabStyle = { [animateFrom]: 15000 };

    useEffect(() => {
        if (project.customerGPSCoordinates != '' && project.customerGPSCoordinates != null) {
            let coordArray = project.customerGPSCoordinates.split(',');
            setCustomerLatitude(coordArray[0]);
            setCustomerLongitude(coordArray[1]);
        }
    }, []);

    const RightContent = props => <AnimatedFAB
        icon={'map-marker'}
        label={'Location'}
        extended={true}
        onPress={() => { navigation.navigate('VehicleTracker', { customerLatitude: customerLatitude, customerLongitude: customerLongitude, projectId: project.project_id }) }}
        visible={true}
        animateFrom={'right'}
        style={[styles.fab, fabStyle]}
        color={colors.secondary}
    />

    return (
        <View style={styles.container}>
            <Header navigation={navigation} backButton={true} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={styles.scrollStyle}>
                <Card style={styles.card}>
                <Title style={[styles.titleStyle, styles.padding]}>{`Project Title : ${project.ProjectName}`}</Title>
                <Card.Title style={styles.marginTop} subtitle={`Project Id : ${project.project_id}`} right={RightContent} />
                    <Card.Title style={styles.marginTop30} subtitle={`Project Reference : ${project.project_reference}`}/>
                    <Card.Content>
                        <View style={styles.flexDirectionRow}>
                            <View style={[styles.flexStyle]}><PieChart total={project.totalWeight} allocated={project.allocatedWeight} loaded={project.noOfLoadedTruck} delivered={project.deliveredWeight} /></View>
                            <View style={styles.flexStyle}>
                            <Title style={styles.titleStyle}>Total Weight : {project.totalWeight}T</Title>
                                <View style={[styles.cardContent, styles.textMarginTop]}>
                                    <Icon name="stop" size={20} color='#0f293e' />
                                    <Text style={styles.textMarginLeft}>Allocated : {project.allocatedWeight}T</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Icon name="stop" size={20} color='#194467' />
                                    <Text style={styles.textMarginLeft}>Loaded : {project.noOfLoadedTruck}T</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Icon name="stop" size={20} color='#236090' />
                                    <Text style={styles.textMarginLeft}>Delivered : {project.deliveredWeight}T</Text>
                                </View>
                            </View>
                        </View>
                        <Title style={styles.subTitleStyle}>Project Progress</Title>
                        <Text style={styles.textStyle}>Start Date : {project.projectStartDate}</Text>
                        <ProgressBar progress={0.5} color={'#236090'} />
                        <Text style={[styles.marginLeftAuto, styles.textStyle]}>End Date : {project.ProjectCloseDate}</Text>
                        <View style={styles.smallCardView}>
                            <SmallCard cardName={'On Road Vehicles'} value={project.noOfLoadedTruck} icon={'truck'} />
                            <SmallCard cardName={'On Road Quantity'} value={`${parseFloat(project.onRoadWeight).toFixed(2)}T`} icon={'road'} />
                            <SmallCard cardName={'Loaded Quantity'} value={`${parseFloat(project.deliveredWeight + project.onRoadWeight).toFixed(2)}T`} icon={'trailer'} />
                        </View>
                        <View style={styles.smallCardView}>
                            <SmallCard cardName={'Allocated Quantity'} value={`${parseFloat(project.allocatedWeight).toFixed(2)}T`} icon={'truck'} />
                            <SmallCard cardName={'Waiting Time'} value={project.jobWaitingToUnload} icon={'user-clock'} />
                            <SmallCard cardName={'Time on Site'} value={project.jobOnSiteTime} icon={'user-clock'} />
                        </View>

                        <List.Section>
                            <List.Accordion
                                title="Project Information"
                                titleStyle={styles.listtextStyle}
                                left={props => <List.Icon {...props} size={5} icon="format-list-bulleted" color={'#236090'} />}
                            >
                                <>
                                    <List.Item titleStyle={styles.listtextStyle} title="Client Name" description={project.client_name} />
                                    <List.Item titleStyle={styles.listtextStyle} title="Customer Company" description={project.customerCompany} />
                                    <List.Item titleStyle={styles.listtextStyle} title="Customer Address" description={project.customerAddress} />
                                    <List.Item titleStyle={styles.listtextStyle} title="Supplier Company" description={project.supplierCompany} />
                                    <List.Item titleStyle={styles.listtextStyle} title="Supplier Address" description={project.supplierAddress} />
                                </>
                            </List.Accordion>
                            <List.Accordion
                                title="Item Description"
                                titleStyle={styles.listtextStyle}
                                left={props => <List.Icon {...props} icon="format-list-bulleted" color={'#236090'} />}
                            >
                                {project.itemJson.map((item, i) => {
                                    return (
                                        <>
                                            <List.Item key={i} titleStyle={styles.listtextStyle} title='Item Name' description={item.itemName} />
                                            <List.Item key={i + 1} titleStyle={styles.listtextStyle} title='Item Weight' description={item.itemWeight} />
                                            <List.Item key={i + 2} titleStyle={styles.listtextStyle} title='Item Unit' description={item.itemUnit} />
                                        </>
                                    )
                                })}
                            </List.Accordion>
                            {
                                project.custom_fields_detail.length > 0 ?
                                    <List.Accordion
                                        title="Custom Fields"
                                        titleStyle={styles.listtextStyle}
                                        left={props => <List.Icon {...props} icon="format-list-bulleted" color={'#236090'} />}
                                    >
                                        {project.custom_fields_detail.map((customField, i) => {
                                            return (
                                                <>
                                                    <List.Item key={i} titleStyle={styles.listtextStyle} title={`Name : ${customField.Name}`} description={`Value : ${customField.Value}`} />
                                                </>
                                            )
                                        })}
                                    </List.Accordion> : <></>
                            }
                            {
                                project.more_custom_fields_detail.length > 0 ?
                                    <List.Accordion
                                        title="More Custom Fields"
                                        titleStyle={styles.listtextStyle}
                                        left={props => <List.Icon {...props} icon="format-list-bulleted" color={'#600080'} />}
                                    >
                                        {project.more_custom_fields_detail.map((customField, i) => {
                                            return (
                                                <>
                                                    <List.Item key={i} titleStyle={styles.listtextStyle} title={`Name : ${customField.Name}`} description={`Value : ${customField.Value}`} />
                                                </>
                                            )
                                        })}
                                    </List.Accordion> : <></>
                            }

                        </List.Section>
                    </Card.Content>

                </Card>
            </ScrollView>
        </View>
    );
}
