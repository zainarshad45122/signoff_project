import React, { useState } from 'react';
import { Modal, Portal, Card, Title, Divider, List } from 'react-native-paper';
import styles from './style';

export default (VehicleTrackerModal = props => {
  const { isClose, vehicleData } = props;
  const [visible, setVisible] = useState(false);
  
  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={() => {
          setVisible(isClose);
        }}
        contentContainerStyle={styles.container}>
        <Card>
          <Card.Content>
            <Title>Vehicle and Job Details</Title>
            <Divider/>
            <List.Section>
              <List.Accordion
                title="Vehicle Inforamion"
                left={props => <List.Icon {...props} icon="format-list-bulleted" color={'#236090'} />}
              >
                  <List.Item title="Vehicle Name" description={vehicleData.vehicleName} />
                  <List.Item title="Vehicle Rego" description={vehicleData.truckRego} />
                  <List.Item title="Vehicle Capacity" description={vehicleData.vehicleCapacity} />
              </List.Accordion>
            </List.Section>
            <List.Section>
              <List.Accordion
                title="Job Inforamion"
                left={props => <List.Icon {...props} icon="format-list-bulleted" color={'#236090'} />}
              >
                  <List.Item title="Job Id" description={vehicleData.jobId} />
                  <List.Item title="Job Reference" description={vehicleData.jobReference} />
                  <List.Item title="Client Name" description={vehicleData.client} />
                  <List.Item title="Job Weight" description={vehicleData.jobTotalWeight} />
                  <List.Item title="Date" description={vehicleData.jobDate} />
              </List.Accordion>
            </List.Section>
          </Card.Content>
          <Card.Actions>

          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
});
