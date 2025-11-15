import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View } from "react-native";


export default function Ran2() {
    return (
        <LinearGradient 
            colors={['#43e97b', '#38f9d7']}
            style={style.pageContainer}
        >
            <Text>Hello, World 4</Text>
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
    },

})