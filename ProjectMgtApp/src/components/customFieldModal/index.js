import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Modal,
  Portal,
  Button,
  Card,
  Divider,
  useTheme,
  Text,
  ActivityIndicator
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "./style";


export default (CustomFieldModal = props => {
  const { isClose, numberOfSelectedFields, handleSubmit, loading } = props;
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={() => setVisible(isClose(false))}
        contentContainerStyle={styles.container}>
        <Card>
          <Card.Content>
            <View style={styles.flexDirection}>
              <Text style={styles.boldFont}>Custom Fields Update</Text>
              <Icon name="times" style={styles.marginLeftAuto} size={20} color={colors.primary} onPress={() => setVisible(isClose(false))} />
            </View>
            <Divider style={styles.marginTop} />
            {
              numberOfSelectedFields() > 0 ?
                <>
                  <Text style={styles.marginTop}> You have selected {numberOfSelectedFields()} field to be updated</Text>
                  {loading ? <ActivityIndicator animating={loading} color={colors.primary} style={styles.marginTop} /> : <></>}
                  <View style={styles.flexDirection}>
                    <Button style={styles.searchButton}>
                      <Text style={styles.buttonText}> Skip </Text>
                    </Button>
                    <Button onPress={() => handleSubmit()} style={[styles.searchButton, styles.textMarginLeft]}>
                      <Text style={styles.buttonText}> Update </Text>
                    </Button>
                  </View>
                </>
                :
                <Text style={styles.marginTop}>No Field Choosen, Please Select a Field to be Updated</Text>
            }
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
});
