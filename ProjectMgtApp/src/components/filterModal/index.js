import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Modal,
  Portal,
  Button,
  Card,
  Title,
  TextInput,
  Divider,
  useTheme,
  Text,
  TouchableRipple
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import styles from "./style";

export default (FilterModal = props => {
  const { handleSearch, isClose } = props;
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [projectReference, setProjectReference] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const dateFormat = 'YYYY-MM-DD';

  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={() => {
          setVisible(isClose(projectId, projectReference, startDate, endDate));
        }}
        contentContainerStyle={styles.container}>
        <Card>
          <Card.Content>
            <Title>Filter Projects</Title>
            <Divider style={styles.marginTop} />
            <TextInput
              mode="outlined"
              outlineColor="grey"
              label="Project Id"
              onChangeText={text => setProjectId(text)}
              value= {projectId}
              right={
                projectId=='' ? (
                  ''
                ) : (
                  <TextInput.Icon
                    name="close-circle"
                    color={colors.primary}
                    onPress={() => {
                      setProjectId(0)
                    }}
                  />
                )
                }
              style={styles.marginTop}
            />
            <TextInput
              mode="outlined"
              outlineColor="grey"
              label="Project Reference"
              onChangeText={text => setProjectReference(text)}
              value= {projectReference}
              right={
                projectReference=='' ? (
                  ''
                ) : (
                  <TextInput.Icon
                    name="close-circle"
                    color={colors.primary}
                    onPress={() => {
                      setProjectReference('')
                    }}
                  />
                )
                }
            />
            <View style={styles.flexDirection}>
            <DatePicker
                modal
                mode= {'date'}
                open={showStartDate}
                date={new Date()}
                onConfirm={(date) => {
                  setShowStartDate(false)
                  setStartDate(moment(date).format(dateFormat).toString())
                }}
                onCancel={() => {
                  setShowStartDate(false)
                }}
              />
              <TouchableRipple
                onPress={() => setShowStartDate(true)}
                style={styles.flexStyle}
              >
                <TextInput
                  mode="outlined"
                  outlineColor="grey"
                  disbaled={true}
                  label="Start Date"
                  editable={false}
                  value= {startDate}
                  right={
                    startDate=='' ? (
                      ''
                    ) : (
                      <TextInput.Icon
                        name="close-circle"
                        color={colors.primary}
                        onPress={() => {
                          setStartDate('')
                        }}
                      />
                    )
                    }
                />
              </TouchableRipple>
              <DatePicker
                modal
                open={showEndDate}
                date={new Date()}
                onConfirm={(date) => {
                  setShowEndDate(false)
                  setEndDate(moment(date).format(dateFormat).toString())
                }}
                onCancel={() => {
                  setShowEndDate(false)
                }}
              />
              <TouchableRipple
                onPress={() => setShowEndDate(true)}
                style={[styles.flexStyle, styles.textMarginLeft]}
              >
                <TextInput
                  mode="outlined"
                  outlineColor="grey"
                  disbaled={true}
                  label="End Date"
                  editable={false}
                  value= {endDate}
                  right={
                    endDate=='' ? (
                      ''
                    ) : (
                      <TextInput.Icon
                        name="close-circle"
                        color={colors.primary}
                        onPress={() => {
                          setEndDate('')
                        }}
                      />
                    )
                    }
                />

              </TouchableRipple>
            </View>
            <Button
              onPress={() => {
                handleSearch(projectId, projectReference, startDate, endDate);
              }}
              style={styles.searchButton}
            >
              <Text style={{ color: colors.secondary }}>
                Search
              </Text>
            </Button>

          </Card.Content>
          <Card.Actions>

          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
});
