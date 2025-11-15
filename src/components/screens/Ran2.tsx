import { Text, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useState, useRef } from "react";


export default function Ran2() {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [isCoinSelected, setIsCoinSelected] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipResult, setFlipResult] = useState<string | null>(null);
    
    const flipAnimation = useRef(new Animated.Value(0)).current;

    function resetStates() {
        setSelectedCoin('');
        setIsCoinSelected(false);
        setFlipResult(null);
        flipAnimation.setValue(0);
    }

    function selectHeads() {
        // console.log("Heads pressed")
        setSelectedCoin("Heads");
        
    }
    
    function selectTails() {
        // console.log("Tails pressed")
        setSelectedCoin("Tails");

    }

    function flipCoin() {
        if (isFlipping) return;
        
        setIsFlipping(true);
        setFlipResult(null);
        flipAnimation.setValue(0);
        
        // Random result
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        
        // Animate the flip (multiple rotations)
        Animated.timing(flipAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            setFlipResult(result);
            setIsFlipping(false);
            // Check if user won
            if (result === selectedCoin) {
                console.log("You won!");
            } else {
                console.log("You lost!");
            }
        });
    }

    return (
        <LinearGradient 
            colors={['#4facfe', '#00f2fe']}
            style={style.pageContainer}
        >
            {/* <Text>Hello, World 2</Text> */}
            <Text style={style.title} >Coin Flip</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>Select heads or tails</Text>
                <Text style={style.howToText}>Flip the coin and see if you won</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        onPress={resetStates}
                        // onPress={resetGen}
                    >Click here to reset</Text>
                    
                </Pressable>

                {/* <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        onPress={resetGen}
                    >Click here to reset</Text>
                    
                </Pressable> */}

            </View>
            <View style={style.coinSelection}>
                <Pressable
                    style={[style.coin, selectedCoin === "Heads" && { backgroundColor: 'rgba(38, 217, 10, 0.96)' }]}
                    onPress={() => isCoinSelected === false && selectHeads()}
                >
                    <Text style={style.coinText}>Heads</Text>
                </Pressable>
                <Pressable
                    style={[style.coin, selectedCoin === "Tails" && { backgroundColor: 'rgba(38, 217, 10, 0.96)' }]}
                    onPress={() => isCoinSelected === false && selectTails()}
                >
                    <Text style={style.coinText}>Tails</Text>
                </Pressable>
            </View>
            {isCoinSelected === false && (
                <Pressable 
                    style={style.button}
                    onPress={() => {
                        setIsCoinSelected(true);
                    }}
                >
                    <Text>{"Select coin side"}</Text>
                </Pressable>
            )}
            {isCoinSelected === true && (
                <View style={style.flipCoinWrapper}>
                    <Pressable
                        style={[style.flipCoin]}
                        onPress={flipCoin}
                        disabled={isFlipping}
                    >
                        <Animated.View
                            style={[
                                style.flipCoin,
                                {
                                    transform: [
                                        {
                                            rotateY: flipAnimation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg']
                                            })
                                        }
                                    ]
                                }
                            ]}
                        >
                            <Text style={style.coinText}>
                                {flipResult || (isFlipping ? "Spinning..." : "Click to flip")}
                            </Text>
                        </Animated.View>
                    </Pressable>
                </View>
            )}
            {flipResult && (
                <View style={style.resultTextContainer}>
                    <Text style={style.resultText}>Result: {flipResult}</Text>
                    {selectedCoin === flipResult ? (
                        <Text style={style.resultText}>You won. Great Work!</Text>
                    ) : (
                        <Text style={style.resultText}>Too bad, butter luck next time!</Text>
                    )}

                </View>
            ) }

        </LinearGradient>

    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 20,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: 800,

    },
    howTo: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.24)',
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
    coinSelection: {
        height: 144,
        // width: 300,
        // borderRadius: 8,
        // borderWidth: 2,
        // borderColor: "grey",
        flexDirection: "row",
        justifyContent: "space-evenly"

    },
    coin: {
        height: 140,
        width: 140,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgb(25, 187, 0)',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(38, 217, 10, 0.5)',
    },
    coinText: {
        fontSize: 40,
    },
    button: {
        backgroundColor: 'rgba(47, 255, 15, 0.5)',
        height: 40,
        width: 300,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "auto",
        borderWidth: 2,
        borderColor: 'rgb(25, 187, 0)',

    },
    
    flipCoinWrapper: {
        height: 200,
        // width: 300,
        // borderRadius: 8,
        // borderWidth: 2,
        // borderColor: "grey",
        flexDirection: "row",
        justifyContent: "space-evenly"

    },

    flipCoin: {
        height: 198,
        width: 198,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgba(25, 187, 0))',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(38, 217, 10, 0.96)',
    },
    resultTextContainer: {
        marginTop: 20,
        gap: 20,
    },
    resultText: {
        fontSize: 20,
        fontWeight: 800,
        // marginHorizontal: 10,
        gap: 10,
        // backgroundColor: "green",
        textAlign: "center",
    }


})