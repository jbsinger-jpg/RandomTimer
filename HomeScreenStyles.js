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
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'monospace',
        fontWeight: 'bold'
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
    containerColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 20,
    }
});