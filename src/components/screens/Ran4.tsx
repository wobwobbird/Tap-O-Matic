import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';




export default function Ran4() {
    const [currentInput, setCurrentInput] = useState('');
    const [playerNames, setPlayerNames] = useState<string[]>([]);


    const playerSelect = () => {
        return (
            <View style={style.nameInput}>
                <TextInput
                    style={style.nameInputBox}
                    placeholder="Enter name"
                    onChangeText={setCurrentInput}
                    value={currentInput}
                    onSubmitEditing={() => {
                        if (currentInput.trim()) {
                            setPlayerNames((prev) => [...prev, currentInput.trim()]);
                            setCurrentInput('');
                        }
                    }}
                ></TextInput>
                <TextInput
                    style={style.nameInputNumber}
                    placeholder="Select Number"
                ></TextInput>
                <Pressable
                    style={style.nameInputSaveButton}
                    // onPress={}
                >
                    <Text>Save</Text>
                </Pressable>
            </View>
        )

    }

    return (
        <LinearGradient 
        colors={['#43e97b', '#38f9d7']}
        style={style.pageContainer}
        >
            {/* <Text>Hello, World 4</Text>
            <View  >
                <Text style={style.taps} >Under Construction...</Text>
            </View> */}
            <Text style={style.title} >The Selector</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>Select a number to play between</Text>
                <Text style={style.howToText}>Choose name and number</Text>
                <Text style={style.howToText}>A random number is generated, if yours is selected you win</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        // onPress={resetGame}
                    >Click here to reset</Text>
                </Pressable>
            </View>
            <View style={style.namePanel}>
                <Text>Select a number to play between</Text>

                <Text>Enter player names</Text>
                {playerSelect()}
                <Pressable 
                    style={style.namePanelAddPlayer}
                    // onPress={}
                >
                    <Ionicons name="add-circle-sharp" size={20} color='rgba(0, 0, 0, 0.29)' ></Ionicons>

                    <Text style={style.namePanelAddPlayerText}>Add another player</Text>
                </Pressable>
            </View>

        </LinearGradient>

    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 10,
        // justifyContent: "center",
        // alignItems: "center"
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
    taps: {
        fontSize: 30,
        textAlign: "center",
    },
    namePanel: {
        gap: 10,
    },
    nameInput: {
        flexDirection: "row",
        // backgroundColor: "red",
        // width: 300,
        justifyContent: "flex-end",
        gap: 10,
        // flex: 1,
    },
    nameInputBox: {
        // height: 30,
        // backgroundColor: "green",
        flex: 1,
        // margin: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        padding: 10,
    },
    nameInputNumber: {
        // width: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        padding: 10,
    },
    nameInputSaveButton: {
        width: 50,
        height: 50,
        // backgroundColor: "blue",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        justifyContent: "center",
        alignItems: "center",
    },
    namePanelAddPlayer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingLeft: 5,
    },
    namePanelAddPlayerText: {
        color: 'rgba(0, 0, 0, 0.40)',
        fontWeight: 700,

    }

})