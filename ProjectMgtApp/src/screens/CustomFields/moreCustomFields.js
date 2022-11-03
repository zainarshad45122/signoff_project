import React from 'react';
import { View } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export default function index(props) {
    const { index, moreCustomField, handleDateOpen, handleChangeValue } = props;
    const { colors } = useTheme();
    const dateFormat = 'YYYY-MM-DD';
    const dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
  
   const handleFieldType = () => {
        let field;
        switch (moreCustomField.fieldType) {
            case '0': // In more custom fields fieldType == 0, it means it's a Text Input Field
                field = (
                    <TextInput
                        mode="outlined"
                        outlineColor="grey"
                        value={moreCustomField.Value}
                        disabled={moreCustomField.isSelected}
                        onChangeText={(text) => handleChangeValue(text, index, true)}
                        style={[styles.flexStyle, styles.textInput, moreCustomField.isSelected ? styles.disabledInput : '']}
                    />
                );
                break;
            case '1': // In more custom fields fieldType == 1, it means it's a Dropdown Field
                field = (
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={moreCustomField.Value}
                            onValueChange={(text) => handleChangeValue(text, index, true)}
                            style= {[styles.textInput, moreCustomField.isSelected ? styles.disabledInput : '']}
                            enabled={!(moreCustomField.isSelected)}
                            itemStyle={{height: 50, transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }]}}
                        >
                            {moreCustomField.dropDownData.map((data, index) => {
                                return (
                                    <Picker.Item style= {[styles.textInput]} label={data} value={data} />
                                )
                            })}
                        </Picker>
                    </View>

                );
                break;
            case '2': // In more custom fields fieldType == 2, it means it's a Date Field
                field = (
                    <>
                        <DatePicker
                            mode="date"
                            modal
                            open={moreCustomField.isDateOpen}
                            is24hourSource={true}
                            date={new Date()}
                            onCancel={() => { handleDateOpen(index, false) }}
                            onConfirm={(value) => {
                                handleDateOpen(index, false)
                                let date = moment(value).format(dateFormat).toString()
                                handleChangeValue(date, index, true)
                            }}
                        />
                            <TextInput
                                mode="outlined"
                                outlineColor="grey"
                                disbaled={true}
                                editable={false}
                                value={moreCustomField.Value}
                                disabled={moreCustomField.isSelected}
                                style={[styles.flexStyle, styles.textInput, moreCustomField.isSelected ? styles.disabledInput : '']}
                                theme={{ colors: { text: 'black' } }}
                                right={ <TextInput.Icon name="calendar" color={colors.primary} 
                                onPress={() => handleDateOpen(index, !moreCustomField.isSelected) }/> }
                            />
                        
                    </>
                );
                break;
            case '3': // In more custom fields fieldType == 3, it means it's a DateTime Field
                field = (
                    <>
                        <DatePicker
                            mode="datetime"
                            modal
                            is24hourSource={true}
                            open={moreCustomField.isDateOpen}
                            date={new Date()}
                            onCancel={() => { handleDateOpen(index, false) }}
                            onConfirm={(value) => {
                                handleDateOpen(index, false)
                                let date = moment(value).format(dateTimeFormat).toString()
                                handleChangeValue(date, index, true)
                            }}
                        />
                          <TextInput
                                mode="outlined"
                                outlineColor="grey"
                                disbaled={true}
                                editable={false}
                                value={moreCustomField.Value}
                                disabled={moreCustomField.isSelected ? true : false}
                                style={[styles.flexStyle, styles.textInput, moreCustomField.isSelected ? styles.disabledInput : '']}
                                theme={{ colors: { text: 'black' } }}
                                right={ <TextInput.Icon name="calendar" color={colors.primary} 
                                onPress={() => handleDateOpen(index, !moreCustomField.isSelected) }/> }
                            />

                    </>
                );
                break;
            case '4': // In more custom fields fieldType == 4, it means it's a Numbers Input Field
                field = (
                    <TextInput
                        mode="outlined"
                        outlineColor="grey"
                        keyboardType="numeric"
                        value={moreCustomField.Value}
                        disabled={moreCustomField.isSelected}
                        onChangeText={(text) => handleChangeValue(text, index, true)}
                        style={[styles.flexStyle, styles.textInput, moreCustomField.isSelected ? styles.disabledInput : '']}

                    />
                );
                break;
            default:
                field = (
                    <TextInput
                        mode="outlined"
                        outlineColor="grey"
                        value={moreCustomField.Value}
                        onChangeText={(text) => handleChangeValue(text, index, true)}
                        disabled={moreCustomField.isSelected}
                        style={[styles.flexStyle, styles.textInput, moreCustomField.isSelected ? styles.disabledInput : '']}
                    />
                );
                break;
        }
        return field;
    };

    return (
        <View>
            {handleFieldType()}
        </View>
    );
}
