import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View } from "react-native";


export default function Ran2() {
    return (
        <LinearGradient 
            colors={['#ff9a56', '#ff6a88']}
            style={style.pageContainer}
        >
            <Text>Hello, World 3</Text>
            <View  >
                <Text style={style.taps} >Under Construction...</Text>
            </View>

        </LinearGradient>

    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    taps: {
        fontSize: 30,
        textAlign: "center",

        // writingDirection: "rtl",
    },

})