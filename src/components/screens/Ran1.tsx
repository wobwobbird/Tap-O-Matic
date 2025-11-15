
import { Text, View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import screenStyles from "src/styles/screenStyles";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Ran1() {
    const [textP1, onChangeTextP1] = useState('');
    const [textP2, onChangeTextP2] = useState('');
    const [numberP1, onChangeNumberP1] = useState('');
    const [numberP2, onChangeNumberP2] = useState('');

    return (
        // <View style={screenStyles.container}>
        <LinearGradient 
            colors={['#667eea', '#764ba2']}
            style={style.pageContainer}
        >
            {/* <Text>Hello, World</Text> */}
            <Text style={style.title} >Random Number Generator: 1-10</Text>
            <Text>Choose a number between 1 & 10</Text>
            <Text>{textP1 === "" ? "Player 1" : "Player 1: " + textP1 + " | " + numberP1}</Text>
            <View style={style.playerInput}>
                <TextInput 
                    style={style.input} 
                    onChangeText={onChangeTextP1}
                    value={textP1}
                    placeholder="Enter p1 name"
                ></TextInput>
                <TextInput 
                    style={style.input} 
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
                            onChangeNumberP1(numericValue)
                        }
                    }}
                    value={numberP1}
                    placeholder="Enter p1 number"
                    keyboardType="numeric"
                ></TextInput>

            </View>
            <Text>{textP2 === "" ? "Player 2" : "Player 2: " + textP2 + " | " + numberP2}</Text>
            <View style={style.playerInput}>
                <TextInput 
                    style={style.input} 
                    onChangeText={onChangeTextP2}
                    value={textP2}
                    placeholder="Choose number"
                ></TextInput>
                <TextInput 
                    style={style.input} 
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
                            onChangeNumberP2(numericValue)
                        }
                    }}
                    value={numberP2}
                    placeholder="Choose number"
                    keyboardType="numeric"
                ></TextInput>
            </View>
            <View style={style.playerInfo}>
                <Text style={style.display} >{"Player 1: " + textP1 + " | " + numberP1}</Text>
                <Text style={style.display} >{"Player 2: " + textP2 + " | " + numberP2}</Text>
            </View>
            <Text>Press the button to start the game</Text>
        {/* </View> */}
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 10,
        
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: 800,

    },
    input: {
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        backgroundColor: "green,",
        borderRadius: 12,
    },
    playerInput: {
        // flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        // backgroundColor: "green",
        height: "auto",
        gap: 10,
    },
    playerInfo: {
        backgroundColor: "pink",
        fontSize: 20,
        marginHorizontal: 10,
        gap: 10,

        // justifyContent: "center",
        
    },
    display: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 600,

    }
})

    // let num;
    // let Martine = 4;
    // let Guy = 6;
    // let MartinePoints = 0;
    // let GuyPoints = 0;
    // let TotalPoints = 0;

    // do {
    //     num = Math.floor(Math.random() * 10);

    //     if (num === Martine) {
    //         MartinePoints++;
    //         TotalPoints++;
    //     }
    //     if (num === Guy) {
    //         GuyPoints++;
    //         TotalPoints++;
    //     }



    // } while (TotalPoints < 1000000000 );


    // console.log(`Martine points: ${MartinePoints}`);

    // console.log(`Guy points:  ${GuyPoints}`);

    // if (MartinePoints > GuyPoints) {
    //     console.log(`Martine is the winner with ${MartinePoints}`);
    // } else {
    //     console.log(`Guy is the winner with ${GuyPoints}`);
    // }

    // console.log("Game Ends");

