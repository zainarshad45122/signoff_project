import React, { useState } from 'react';
import {
  Modal,
  Portal,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import styles from "./style";

export default (Message = props => {
  const [visible, setVisible] = useState(false);

  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={() => {
          setVisible(props.isClose);
        }}
        contentContainerStyle={styles.container}>
        <Card>
          <Card.Content>
            <Title style={[props.type === 'success' ? styles.success : styles.error]}>{props.title}</Title>
            <Divider />
            <Paragraph style={{ marginTop: 12 }}>
              {props.message}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => {
                setVisible(props.isClose);
              }}>
              Ok
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
});
