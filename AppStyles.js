import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        marginTop: 10,
    },
    timerButtonPressedText: {
        fontSize: 15,
        marginTop: 10,
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        borderWidth: 3,
        borderColor: 'black'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "stretch",
        width: "100%",
        alignItems: "center",
    },
});