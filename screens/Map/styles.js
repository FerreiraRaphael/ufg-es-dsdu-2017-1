import { Constants } from "expo";
import { Platform, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

export default {
    container: {
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        height: height - 100 
    },
}