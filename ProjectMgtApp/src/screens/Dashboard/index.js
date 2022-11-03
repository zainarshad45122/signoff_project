import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { FAB, Card, Title, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import Header from '../../components/header';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PieChart from '../../components/pieChart';
import { getBaseUrl, getAllProjects } from '../../ApiManager/request';
import { getValue } from '../../helper/storageWrapper';
import { deleteUserData } from '../../helper/helperFunctions';
import Modal from '../../components/modal'
import FilterModal from '../../components/filterModal';
import { GET } from '../../ApiManager/apiManager';

export default function index(props) {
  const { navigation } = props;
  const { colors } = useTheme();
  const [projects, setProjects] = useState([]);
  const [filteredProjcts, setFilteredProjects] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFetching, setisFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    (async () => {
      const baseUrl = await getBaseUrl();
      const userId = await getValue('userId');
      const accessToken = await getValue('aToken');
      let getAllProjectsUrl = baseUrl + getAllProjects;
      let params = { supervisorId: userId, grant_type: 'access_token', access_token: accessToken }
      let configRequest = { url: getAllProjectsUrl }

      GET(configRequest, params, (response) => {
        const responseData = response.data.Detail.project_data;
        setProjects(responseData);
        setisFetching(true);
        setLoading(false)

      }, (error) => {
        setErrorMessage(error);
        setVisible(true);
        setLoading(false);
      })

    })();
  }, []);

  const handleSearch = (projectId, projectReference, startDate, endDate) => {

    let filteredProjects = projects.filter((project) => {
      return project.project_id == projectId || project.project_reference == projectReference || project.projectStartDate == startDate || project.ProjectCloseDate == endDate
    })

    setFilteredProjects(filteredProjects)
    setIsFiltered(true);
    setOpenFilterModal(false);
    if (projectId == 0 && projectReference == '' && startDate == '' && endDate == '') {
      handleFilterModalClose(projectId, projectReference, startDate, endDate);
    }
  };

  const handleLogout = () => {
    deleteUserData();
    props.navigation.navigate('Login')
  };

  const handleFilterModalClose = (projectId, projectReference, startDate, endDate) => {
    if (projectId == 0 && projectReference == '' && startDate == '' && endDate == '') {
      setFilteredProjects([])
      setIsFiltered(false);
    }
    setOpenFilterModal(false);
  };



  return (
    <View style={styles.container}>
      <Modal isOpen={visible} isClose={() => setVisible(false)} title="Error Fetching Projects" type="error" message={errorMessage} />
      <FilterModal isOpen={openFilterModal} isClose={handleFilterModalClose} handleSearch={handleSearch} />
      <Header navigation={navigation} logoutButton={true} handleLogout={handleLogout} isDashboard={true} />
      {loading ? <ActivityIndicator animating={loading} color={colors.secondary} style={styles.marginTop40} /> : <></>}
      {
        Array.isArray(projects) ? projects.length == 0 && !loading ?
          <Text style={styles.textStyle}> No Projects Available </Text>
          :
          <FlatList
            style={styles.flatlistStyle}
            refreshing={isFetching}
            data={isFiltered ? filteredProjcts : projects}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              let project = item.item
              return (
                <TouchableHighlight onPress={() => { props.navigation.navigate('ProjectDetail', { project: project, }) }}>
                  <View style={styles.alignItemsCenter} key={project.project_id}>
                    <Card style={styles.card}>
                    <Title style={[styles.titleStyle, styles.padding]}>{`Project Title : ${project.ProjectName}`}</Title>
                      <Card.Title style={styles.marginTop} subtitle={`Project Id : ${project.project_id}`} />
                      <Card.Content style={{ flexDirection: 'row' }}>
                        <View style={[styles.flexStyle, {marginLeft:-10}]}><PieChart total={project.totalWeight} allocated={project.allocatedWeight} loaded={project.noOfLoadedTruck} delivered={project.deliveredWeight} /></View>
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
                      </Card.Content>
                      <Card.Title style={styles.textMarginTop} subtitle={`Project Reference : ${project.project_reference}`} />
                    </Card>
                  </View>
                </TouchableHighlight>
              );
            }
            }
          />
          : 
          <Text style={styles.textStyle}> No Projects Available </Text>
      }
      <FAB
        icon="magnify"
        style={styles.fab}
        onPress={() => {
          setOpenFilterModal(true)
        }}
      />
    </View>

  );
}
