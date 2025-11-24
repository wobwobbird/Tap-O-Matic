
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
    const [players, setPlayers] = useState<Array<{ name: string; number: string }>>([ { name: '', number: ''}]); // players[index].number
    const [playerPoints, setPlayerPoints] = useState<number[]>([]);
    const [saveCheckAllowed, setSaveCheckAllowed] = useState<boolean>(false);
    const [playerInfoSaved, setPlayerInfoSaved] = useState<boolean>(false);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamePlaying, setGamePlaying] = useState<boolean>(false);
    const [winnerName, setWinnerName] = useState('');
    
    function resetGame() {
        setPlayers([ { name: '', number: ''}]);
        setPlayerPoints([]);
        setSaveCheckAllowed(false);
        setPlayerInfoSaved(false);
        setGamesPlayed(0);
        setGamePlaying(false);  
        setWinnerName('');  
    }

    const generateNumber = async () => {
        setGamePlaying(true);
        setWinnerName('');
        setPlayerPoints(new Array(players.length).fill(0));
        let localGamesPlayed = 0;
        let localPlayerPoints = new Array(players.length).fill(0);

        do {
            
            let num = Math.floor(Math.random() * 9) + 1;

            players.forEach((item, index) => {
                const playerNumber = parseInt(item.number) || 0;
                if (num === playerNumber) {
                    localPlayerPoints[index]++;
                    setPlayerPoints([...localPlayerPoints]);
                }
            });     
            localGamesPlayed++;
            setGamesPlayed(localGamesPlayed);            
            // console.log("Games played: ", localGamesPlayed);
            await new Promise(resolve => setTimeout(resolve, 10));
            
        } while (!localPlayerPoints.some(points => points >= 50));
        const winnerIndex = localPlayerPoints.findIndex(points => points >= 50);

        setWinnerName(players[winnerIndex].name);
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
            if (playerNumber === 0 || players[i].number === '' || playerNumber > 9) {
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
        return (
            <View key={index} style={style.gameRaceIndividualSpace}>
                <Text style={style.gameRaceIndividualScoreText}>{`${players[index].name} score: ${playerPoints[index]}`}</Text>
                <Slider
                    style={style.slider}
                    minimumValue={0}
                    maximumValue={50}
                    step={1}
                    value={playerPoints[index]}
                    minimumTrackTintColor='rgba(27, 234, 253, 0.83)'
                    maximumTrackTintColor="#000000"
                />
            </View>
        )
    };

    return (
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
                                onPress={resetGame}
                            >Click here to reset</Text>
                            
                        </Pressable>
                    </View>
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
                            </Pressable>
                        </View>
                    )}

                    {playerInfoSaved && (
                        <View style={style.raceCourse}>
                        
                            <Pressable 
                                style={[style.playButton, gamePlaying && { backgroundColor: 'rgba(27, 234, 253, 0.32)' }]}
                                onPress={() => {
                                    generateNumber();
                                }}
                                disabled={gamePlaying}
                            >
                                <Text style={style.scoreTextGamesPlayed} >{winnerName === '' ? "Start Game" : "Play Again"}</Text>
                            </Pressable>
                            <Text style={style.scoreTextGamesPlayed}>{`Games Played: ${gamesPlayed}`}</Text>                
                            {players.map((_, index) => gameRaceIndividual(index))}

                        </View>
                    )}
                    {winnerName !== '' && (
                        <View style={style.scoreHolder}>
                            <Text style={style.winnerText}>Congratulations!</Text>
                            <Text style={style.winnerText} >{`${winnerName} is the Winner!!!`}</Text>
                        </View>

                    )}
                </View>
            </ScrollView>
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
    playerListIndividualText: {
        textAlign: "center",
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 600,
    },
    // Game started
    raceCourse: {
        marginVertical: 20,
        gap: 10,
    },
    playButton: {
        backgroundColor: 'rgba(27, 234, 253, 0.64)',
        padding: 5,
        width: 200,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "auto",
    },
    scoreHolder: {
        gap: 10,
    },
    scoreTextGamesPlayed: {
        fontSize: 16,
        fontWeight: 500,
    },
    gameRaceIndividualSpace: {
        backgroundColor: 'rgba(27, 234, 253, 0.12)',
        borderRadius: 16,
        paddingHorizontal: 10,
    },
    gameRaceIndividualScoreText: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 500,
    },
    slider: {
        height: 40,
    },
    winnerText: {
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

