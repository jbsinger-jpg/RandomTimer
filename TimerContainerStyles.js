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
        margin: 10,
        borderWidth: 3,
        borderColor: 'black',
    },
    bottomLeftContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 15,
        flexDirection: 'row',
    }
});

export const options = {
    // Uncomment backgroundColor: 'white', fontSize: 0, and color: 'white' when testing hidden timer functionality
    container: {
        backgroundColor: '#FF0000',
        // backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        // color: 'white',
        marginLeft: 7,
    },
};