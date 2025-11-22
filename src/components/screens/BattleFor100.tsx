
import { Text, View } from "react-native";
import { StyleSheet, TextInput, ScrollView } from "react-native";
import screenStyles from "src/styles/screenStyles";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import Slider from '@react-native-community/slider';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function BattleFor100() {
    // Set up
    const [players, setPlayers] = useState<Array<{ name: string; number: string }>>([ { name: '', number: ''}]); // players[index].number

    // const [p1Name, onChangeP1Name] = useState('');
    // const [p2Name, onChangeP2Name] = useState('');
    // const [p1Number, onChangep1Number] = useState('');
    // const [p2Number, onChangeP2Number] = useState('');
    const [usedNumbers, setUsedNumbers] = useState<Set<string>>(new Set());
    const [saveCheckAllowed, setSaveCheckAllowed] = useState(false);

    const [playerInfoSaved, setPlayerInfoSaved] = useState(false);
    const [startGame, setStartGame] = useState(false);
    // Game starting
    const [p1Points, setP1Points] = useState(0);
    const [p2Points, setP2Points] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamePlaying, setGamePlaying] = useState(false);

    const generateNumber = async (p1: number, p2: number) => {
        const p1Num = Number(p1); // Ensure it's a number
        const p2Num = Number(p2); // Ensure it's a number
        let localP1Points = 0;
        let localP2Points = 0;
        let localGamesPlayed = 0;

        setGamePlaying(true);
        
        do {
            let num = Math.floor(Math.random() * 9) + 1;
            
            if (p1Num === num) {
                localP1Points++;
                setP1Points(localP1Points);
            }
            if (p2Num === num) {
                localP2Points++;
                setP2Points(localP2Points);
            }
            
            localGamesPlayed++;
            setGamesPlayed(localGamesPlayed);            
            // console.log("P1 Points", localP1Points);
            // console.log("P2 Points", localP2Points);
            // console.log("Random number:", num);
            // console.log("Games played: ", localGamesPlayed);
            await new Promise(resolve => setTimeout(resolve, 10));
            
        } while (localP1Points + localP2Points < 100);
        
        setGamePlaying(false);

    }

    function resetGen() {
        // onChangeP1Name('');
        // onChangeP2Name('');
        // onChangep1Number('');
        // onChangeP2Number('');
        setUsedNumbers(new Set());
        setPlayerInfoSaved(false);
        setStartGame(false);
        setP1Points(0);
        setP2Points(0);
        setGamesPlayed(0);
        setGamePlaying(false);    
    }

    const playerSelect = (index: number) => {
        return (
            <View key={index} style={style.nameInput}>
                <TextInput
                    style={style.nameInputName}
                    placeholder="Name"
                    onChangeText={(text) => {
                        const updatedPlayers = [...players];
                        updatedPlayers[index] = { ...updatedPlayers[index], name: text};
                        setPlayers(updatedPlayers);
                    }}
                    value={players[index]?.name || ""}
                ></TextInput>
                <TextInput
                    style={style.nameInputNumber}
                    placeholder="Number"
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        const updatedPlayers = [...players];
                        updatedPlayers[index] = { ...updatedPlayers[index], number: numericValue};
                        setPlayers(updatedPlayers);
                    }}
                    value={players[index]?.number || ""}
                    keyboardType="numeric"
                ></TextInput>
            </View>
        )
    }

    const checkSaveCanClick = () => {
        for (let i = 0; i < players.length; i++) {

            const playerNumber = parseInt(players[i].number) || 0;
            if (players[i].name === '') {
                setSaveCheckAllowed(false);
                return;                
            }
            if (playerNumber === 0 || players[i].number === '') {
                setSaveCheckAllowed(false);
                return;                
            }
            if (playerNumber) {
                for(let j = 0; j < players.length; j++) {
                    if (i !== j) {
                        const otherPlayerNumbers = parseInt(players[j].number) || 0;
                        if (otherPlayerNumbers === playerNumber && otherPlayerNumbers !== 0) {
                            setSaveCheckAllowed(false);
                            return;            
                        }
                    }
                }
            }
            setSaveCheckAllowed(true);
        }
    }

    useEffect(() => {
        checkSaveCanClick();
    }, [players])

    const playerList = (player: {name: string, number: string}) => {
        return (
            <>
                <Text style={style.playerListIndividualText}>{player.name}</Text>
                <Text style={style.playerListIndividualText}>{player.number}</Text>
            </>
        )
    }

    const gameRaceIndividual = (index: number) => {
        <View key={index}>
            <Text style={style.scoreText1}>{`${players[index].name} number: `}</Text>
            <Slider
                style={style.slider}
                minimumValue={0}
                maximumValue={70}
                step={1}
                value={p1Points}
                minimumTrackTintColor='rgba(27, 234, 253, 0.83)'
                maximumTrackTintColor="#000000"
            
            />
        </View>

    };

    return (
        // <View style={screenStyles.container}>
        <LinearGradient 
            colors={['#667eea', '#764ba2']}
            style={style.pageContainer}
        >
            <Text style={style.title} >Battle For 100</Text>
            <ScrollView>
                <View style={style.scrollPageContainer}>
                    <View style={style.howTo}>
                        <Text style={style.howToText}>Choose a number each between 1 & 9</Text>
                        <Text style={style.howToText}>Each turn a random number is closen, if it matches your number you get a point</Text>
                        <Text style={style.howToText}>It will play until 100 total points are given</Text>
                        <Text style={style.howToText}>Who will win?</Text>
                        <Pressable>
                            <Text 
                                style={style.howToTextReset}
                                onPress={resetGen}
                            >Click here to reset</Text>
                            
                        </Pressable>

                    </View>
                    {/* <View style={style.playerInfo}>
                            <Text style={style.display} >{p1Name === "" && p1Number === "" ? "Player 1" : `Player 1 ${p1Name} | Number : ${p1Number}`}</Text>
                            <Text style={style.display} >{p2Name === "" && p2Number === "" ? "Player 2" : `Player 2 ${p2Name} | Number : ${p2Number}`}</Text>
                    </View> */}



                    {!playerInfoSaved && (
                        <View style={style.namePanel}>

                            <Text>Enter player names</Text>
                            {players.map((_, index) => playerSelect(index))}
                            <View style={style.namePanelAddRemove}>
                                <Pressable 
                                    style={style.namePanelAddPlayer}
                                    onPress={() => {
                                        setPlayers([...players, {name: '', number: ''}]);
                                    }}
                                >
                                    <Ionicons name="add-circle" size={20} color='rgba(0, 0, 0, 0.29)' ></Ionicons>
                                    <Text style={style.namePanelAddPlayerText}>Add player</Text>
                                </Pressable>
                                {players.length > 0 && (
                                    <Pressable 
                                    style={style.namePanelAddPlayer}
                                    onPress={() => {
                                        setPlayers(players.slice(0, -1));
                                    }}
                                    >
                                        <Text style={style.namePanelAddPlayerText}>Remove player</Text>
                                        <Ionicons name="remove-circle" size={20} color='rgba(0, 0, 0, 0.29)' ></Ionicons>
                                    </Pressable>
                                )}
                            </View>
                            
                            <Pressable 
                                onPress={saveCheckAllowed ? () => setPlayerInfoSaved(true) : undefined}
                            >
                                <Text style={[style.nameSaveButton, saveCheckAllowed && {backgroundColor: 'rgba(0, 148, 32, 0.83)' }]}>Save & Continue</Text>
                                {/* <Text style={[style.nameSaveButton]}>Save & Continue</Text> */}
                            </Pressable>
                            {/* <Text>{saveCheckAllowed}</Text> */}

                            {/* <Text>Press the start when you've entered the info</Text>
                            <Pressable 
                                style={style.button}
                                onPress={() => {
                                    if (p1Name !== '' && p2Name !== '' && p1Number !== '' && p2Number !== '') {
                                        setPlayerInfoSaved(true);
                                    }
                                }}
                            >
                                <Text>Save starting info</Text>
                            </Pressable> */}

                        </View>
                    )}


                    {/* {!playerInfoSaved ? (
                        <View style={style.startScreen}>
                            <Text>Choose a number between 1 & 10</Text>
                            <Text>Player 1</Text>
                            <View style={style.playerInput}>
                                <TextInput 
                                    style={style.input} 
                                    onChangeText={onChangeP1Name}
                                    value={p1Name}
                                    placeholder="Name"
                                ></TextInput>
                                <TextInput 
                                    style={style.input} 
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^1-9]/g, '').slice(0, 1);
                                        
                                        if (numericValue !== '' && usedNumbers.has(numericValue)) {
                                            return; 
                                        }

                                        if (numericValue !== '') {
                                            Keyboard.dismiss();
                                        }
                                        
                                        if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
                                            if (p1Number) {
                                                setUsedNumbers(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.delete(p1Number);
                                                    return newSet;
                                                });
                                            }
                                            
                                            onChangep1Number(numericValue);
                                            
                                            if (numericValue !== '') {
                                                setUsedNumbers(prev => new Set(prev).add(numericValue));
                                            }
                                        }
                                    }}
                                                    value={p1Number}
                                    placeholder="Number"
                                    keyboardType="numeric"
                                ></TextInput>

                            </View>
                            <Text>Player 2</Text>
                            <View style={style.playerInput}>
                                <TextInput 
                                    style={style.input} 
                                    onChangeText={onChangeP2Name}
                                    value={p2Name}
                                    placeholder="Name"
                                ></TextInput>
                                <TextInput 
                                    style={style.input} 
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^1-9]/g, '').slice(0, 1);
                                        
                                        if (numericValue !== '' && usedNumbers.has(numericValue)) {
                                            return;
                                        }

                                        if (numericValue !== '') {
                                            Keyboard.dismiss();
                                        }
                                        
                                        if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
                                            if (p2Number) {
                                                setUsedNumbers(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.delete(p2Number);
                                                    return newSet;
                                                });
                                            }
                                            
                                            onChangeP2Number(numericValue);
                                            
                                            if (numericValue !== '') {
                                                setUsedNumbers(prev => new Set(prev).add(numericValue));
                                            }
                                        }
                                    }}
                                    value={p2Number}
                                    placeholder="Number"
                                    keyboardType="numeric"
                                ></TextInput>
                            </View>
                            <Text>Press the start when you've entered the info</Text>
                            <Pressable 
                                style={style.button}
                                onPress={() => {
                                    if (p1Name !== '' && p2Name !== '' && p1Number !== '' && p2Number !== '') {
                                        setPlayerInfoSaved(true);
                                    }
                                }}
                            >
                                <Text>Save starting info</Text>
                            </Pressable>

                        </View>
                    ) : (
                        <>
                        
                        </>
                        
                        
                        )} */}
                    {playerInfoSaved && (
                        <>
                        
                            <Pressable 
                                style={style.button}
                                onPress={() => {
                                    // if (gamePlaying === true) return;
                                    setStartGame(true);
                                    // generateNumber(Number(p1Number), Number(p2Number));
                                }}
                            >
                                <Text>{p1Points + p2Points !== 100 ? "Start Game" : "Play Again"}</Text>
                            </Pressable>
                            <View style={style.playerListWrapper}>
                                {players.map((player, index) => (
                                    <View style={style.playerListIndividual} key={index}>
                                        {playerList(player)}
                                    </View>
                                ))}
                            </View>
                            {players.map((_, index) => gameRaceIndividual(index))}


                            {/* <View >
                                <Text style={style.scoreText1}>{`${p1Name} points: ${p1Points}`}</Text>
                                <Slider
                                    style={style.slider}
                                    minimumValue={0}
                                    maximumValue={70}
                                    step={1}
                                    value={p1Points}
                                    minimumTrackTintColor='rgba(27, 234, 253, 0.83)'
                                    maximumTrackTintColor="#000000"
                                
                                />
                                <Text style={style.scoreText1}>{`${p2Name} points: ${p2Points}`}</Text>
                                <Slider
                                    style={style.slider}
                                    minimumValue={0}
                                    maximumValue={70}
                                    step={1}
                                    value={p2Points}
                                    minimumTrackTintColor='rgba(27, 234, 253, 0.83)'
                                    maximumTrackTintColor="#000000"
                                
                                />
                                <Text style={style.scoreText1}>{`Games Played: ${gamesPlayed}`}</Text>                
                            </View> */}
                        </>
                    )}
                    {playerInfoSaved && p1Points + p2Points === 100 && (
                        <View style={style.scoreHolder}>
                            <Text style={style.scoreText2}>Congratulations!</Text>
                            {p1Points > p2Points ? (
                                <Text style={style.scoreText2} >{`${p1Name} is the Winner!!!`}</Text>
                            ) : (
                                <Text style={style.scoreText2} >{`${p2Name} is the Winner!!!`}</Text>
                            )}
                            {p1Points === p2Points && (
                                <Text style={style.scoreText2} >{`Its a tie! This was very unlikely!`}</Text>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>

        {/* </View> */}
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
    scrollPageContainer: {
        gap: 10,
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

    namePanel: {
        gap: 10,
    },
    nameInput: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    nameInputName: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        padding: 10,
    },
    nameInputNumber: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        padding: 10,
        width: 100,
    },
    nameInputSaveButton: {
        width: 50,
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        justifyContent: "center",
        alignItems: "center",
    },
    namePanelAddRemove: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    namePanelAddPlayer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    namePanelAddPlayerText: {
        color: 'rgba(0, 0, 0, 0.40)',
        fontWeight: 700,
    },
    nameSaveButton: {
        backgroundColor: 'rgba(175, 175, 175, 0.83)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 15,
    },


    playerListWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: "center",
        
    },
    playerListIndividual: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        gap: 5,
        padding: 8,
    },
    playerListIndividualText: {
        // width: 120,
        textAlign: "center",
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 600,
    },


    startScreen: {
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderWidth: 2,
        padding: 10,
        flex: 1,
        borderRadius: 12,
    },
    playerInput: {
        flexDirection: "row",
        paddingHorizontal: 10,
        height: "auto",
        gap: 10,
    },
    playerInfo: {
        fontSize: 20,
        marginHorizontal: 10,
        gap: 10,
    },
    display: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,
    },
    button: {
        backgroundColor: 'rgba(27, 234, 253, 0.64)',
        height: 40,
        width: 300,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "auto",
    },
    scoreHolder: {
        gap: 10,
    },
    slider: {
        height: 40,
    },
    scoreText1: {
        fontSize: 20,
        gap: 10,
    },
    scoreText2: {
        fontSize: 20,
        fontWeight: 800,
        gap: 10,
        textAlign: "center",
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

