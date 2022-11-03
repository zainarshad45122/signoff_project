import React, { useState } from 'react';
import { Modal, Portal, Card, ActivityIndicator, useTheme } from 'react-native-paper';
import styles from "./style";
export default (LoaderModal = props => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const {isOpen, isClose } = props;

  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={() => {
          setVisible(isClose);
        }}
        contentContainerStyle={styles.container}>
        <Card>
          <Card.Content>
          { <ActivityIndicator animating={true} color={colors.primary}  /> }
          </Card.Content>     
        </Card>
      </Modal>
    </Portal>
  );
});
