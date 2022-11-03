import AsyncStorage from '@react-native-community/async-storage';

export async function setValue(key, value) {

    try {
        let jsonOfItem = await AsyncStorage.setItem(key, value);
        return "true";
    } catch (error) {
        console.warn('error while saving: ' + error);
        return "false";
    }
}
export async function getValue(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return "";
    }
}
export async function removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
    }
}
export async function clearValues() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
    }
}