import React, { useState } from 'react';
import { Card, Text, Divider } from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "./style";
import { moderateScale} from '../../helper/helperFunctions'

export default (SmallCard = props => {
    const { cardName, icon, value } = props;

    return (
        <Card style={[styles.flexStyle, styles.MarginRight]}>
            <Card.Content>
                <Text style={styles.textStyle}>{value}</Text>
                <Divider />
                <View style={styles.MarginTop}>
                    <Icon style={styles.iconStyle} name={icon} size={moderateScale(10)} color={'#236090'} />
                    <Text style={styles.nameStyle}>{cardName}</Text>
                </View>

            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );
});
