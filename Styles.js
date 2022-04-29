import { StyleSheet } from "react-native"
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const styles = StyleSheet.create({
    scrollView: {
        padding: 10,
        backgroundColor: 'darkgrey',
        flex:1,
    },
    noteView: {
        minHeight: 200,
        backgroundColor: 'azure',
        marginBottom: 20,
        padding: 20,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: "space-around"
    }

});

export default styles;