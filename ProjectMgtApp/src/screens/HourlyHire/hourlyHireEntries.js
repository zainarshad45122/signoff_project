
import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, TextInput, Text, useTheme} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { timeDifference } from '../../helper/helperFunctions'
import { moderateScale } from '../../helper/helperFunctions';
import moment from 'moment';
import styles from './style';


export default HourlyHireEntries = (props) => {
    const { colors } = useTheme();
    const { hourlyHireEntries, handleDateOpen, setHourlyHireEntries, handleChangeValue, dateTimeFormat } = props
    return (
       
            <FlatList
                data={hourlyHireEntries}
                keyExtractor={(item, i) => i.toString()}
                removeClippedSubviews={false}
                style={styles.container}
                renderItem={(item) => {
                    let data = item.item
                    let i = item.index
                    return (
                        <Card style={styles.card} key={i}>
                            <Card.Content>
                                <View style={[styles.flexDirectionRow]}>
                                    <View style={styles.flexStyle}>
                                        <Text style={styles.label}>Start Time </Text>
                                        <DatePicker
                                            mode="datetime"
                                            modal
                                            open={data.isStartDateOpen}
                                            is24hourSource={true}
                                            date={data.startTime == "" ? new Date() : new Date(moment(data.startTime))}
                                            onCancel={() => handleDateOpen(false, i, true)}
                                            onConfirm={(value) => {
                                                handleDateOpen(false, i, true)
                                                let date = moment(value).format(dateTimeFormat).toString();
                                                handleChangeValue(date, i, true);
                                            }}
                                        />
                                        <TextInput
                                            mode="outlined"
                                            value={data.startTime}
                                            editable={false}
                                            right={<TextInput.Icon name="calendar" size={ moderateScale(17)} color={colors.primary}
                                                onPress={() => handleDateOpen(true, i, true)} />}
                                            theme={{ colors: { text: 'black' } }}
                                            style={styles.textInput}
                                        />
                                    </View>
                                    <View style={[styles.flexStyle, styles.marginLeft]}>
                                        <Text style={[styles.label]}>End Time </Text>
                                        <DatePicker
                                            mode="datetime"
                                            modal
                                            open={data.isEndDateOpen}
                                            is24hourSource={true}
                                            date={data.endTime == "" ? new Date() : new Date(moment(data.endTime))}
                                            onCancel={() => handleDateOpen(false, i, false)}
                                            onConfirm={(value) => {
                                                handleDateOpen(false, i, false)
                                                let date = moment(value).format(dateTimeFormat).toString()
                                                handleChangeValue(date, i, false);
                                            }}
                                        />
                                        <TextInput
                                            mode="outlined"
                                            value={data.endTime}
                                            editable={false}
                                            right={<TextInput.Icon name="calendar" size={ moderateScale(17)} color={colors.primary}
                                                onPress={() => handleDateOpen(true, i, false)} />}
                                            theme={{ colors: { text: 'black' } }}
                                            style={styles.textInput}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.flexDirectionRow]}>
                                    <View style={styles.flexStyle}>
                                        <Text style={styles.label}>Total Time {`(HH:MM:SS)`}  </Text>
                                        <TextInput
                                            mode="outlined"
                                            value={timeDifference(data.startTime, data.endTime)}
                                            editable={false} 
                                            right={<TextInput.Icon name="calendar-clock" size={ moderateScale(17)} color={colors.primary} disabled />}
                                            theme={{ colors: { text: 'black' } }}
                                            style={styles.textStyle}
                                        />
                                    </View>
                                    <View style={[styles.flexStyle, styles.marginLeft]}>
                                        <Text style={[styles.label]}>Quantity </Text>
                                        <TextInput
                                            keyboardType={"numeric"}
                                            mode="outlined"
                                            value={data.quantity}
                                            style={styles.textStyle}
                                            onChangeText={(text) => {
                                                setHourlyHireEntries(current =>
                                                    current.map((obj, index) => {
                                                        if (i == index) {
                                                            return { ...obj, quantity: text };
                                                        }
                                                        return obj;
                                                    }),
                                                )
                                            }}
                                        />
                                    </View>
                                </View>

                                <Text style={[styles.label]}>Location </Text>
                                <TextInput
                                    mode="outlined"
                                    value={data.location}
                                    style={styles.textStyle}
                                    onChangeText={(text) => {
                                        setHourlyHireEntries(current =>
                                            current.map((obj, index) => {
                                                if (i == index) {
                                                    return { ...obj, location: text };
                                                }
                                                return obj;
                                            }),
                                        )
                                    }}
                                />

                                <Text style={[styles.label]}>Hourly Description </Text>

                                <TextInput
                                    mode="outlined"
                                    multiline={true}
                                    numberOfLines={5}
                                    value={data.description}
                                    style={styles.textStyle}
                                    onChangeText={(text) => {
                                        setHourlyHireEntries(current =>
                                            current.map((obj, index) => {
                                                if (i == index) {
                                                    return { ...obj, description: text };
                                                }
                                                return obj;
                                            }),
                                        )
                                    }}
                                />
                            </Card.Content>
                        </Card>

                    );
                }
                }
            />


    );
}