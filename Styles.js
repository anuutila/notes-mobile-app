import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    scrollView: {
        //padding: 15,
        backgroundColor: 'green',
        flex:1,
        //flexDirection: "column",
    },
    /*parentView: {
        padding: 15,
        backgroundColor: 'red',
        flex:1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: 'center'
    },*/
    noteView: {
        backgroundColor: 'red',
        flex: 3
        //justifyContent: "flex-end",
    },
    buttonView: {
        backgroundColor: 'blue',
        flex: 5
    }    

});

export default styles;