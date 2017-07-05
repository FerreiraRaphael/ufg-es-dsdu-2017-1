import { Constants } from "expo";
import { Platform } from 'react-native';

export default {
    container: {
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        marginBottom: 5,
    },
}