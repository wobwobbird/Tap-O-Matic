import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useState } from "react";


export default function Ran2() {
    const [p1Name, onChangeP1Name] = useState('');
    const [p2Name, onChangeP2Name] = useState('');


    return (
        <LinearGradient 
            colors={['#ff9a56', '#ff6a88']}
            style={style.pageContainer}
        >
            <Text style={style.title} >Random Number Generator: 21</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>The closest to 21 wins</Text>
                <Text style={style.howToText}>When it's your turn, either generate a random number between 1-9, or hold</Text>r
                <Text style={style.howToText}>Go over 21, and you automatically lose</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        // onPress={resetGen}
                    >Click here to reset</Text>
                    
                </Pressable>

            </View>
            <View style={style.playerInfo}>
                    <Text style={style.display} >{"Player 1 | " + p1Name}</Text>
                    <Text style={style.display} >{"Player 2 | " + p2Name}</Text>
            </View>

        </LinearGradient>

    )
}
// CLOSEST TO 21 wins

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 10,
        // justifyContent: "center",
        // alignItems: "center"
    },
    taps: {
        fontSize: 30,
        textAlign: "center",

        // writingDirection: "rtl",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: 800,

    },
    howTo: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        gap: 5,
        padding: 5,

    },
    howToText: {
        fontSize: 18,
    },
    howToTextReset: {
        fontSize: 18,
        fontWeight: 600,
    },
    playerInfo: {
        // backgroundColor: "pink",
        fontSize: 20,
        marginHorizontal: 10,
        gap: 10,

        // justifyContent: "center",
        
    },
    display: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,

    },



})