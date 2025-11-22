import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import SegmentedControl from "react-native-segmented-control-2";

export default function ClosestTo21() {
    const [p1Name, onChangeP1Name] = useState('');
    const [p2Name, onChangeP2Name] = useState('');
    const [playersNamed, setPlayersNamed] = useState(false);
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);
    const [p1SelectedIndex, setP1SelectedIndex] = useState(0);
    const [p2SelectedIndex, setP2SelectedIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [p1TurnHappening, setP1TurnHappening] = useState(false);
    const [p2TurnHappening, setP2TurnHappening] = useState(false);
    const [p1TurnTaken, setP1TurnTaken] = useState(false);
    const [p2TurnTaken, setP2TurnTaken] = useState(false);
    const [p1RandomNumber, setP1RandomNumber] = useState(0);
    const [p2RandomNumber, setP2RandomNumber] = useState(0);
    const [winnerName, setWinnerName] = useState('');

    function resetGame() {
        onChangeP1Name('');
        onChangeP2Name('');
        setPlayersNamed(false);
        setP1Score(0);
        setP2Score(0);
        setP1SelectedIndex(0);
        setP2SelectedIndex(0);
        setGameOver(false);
        setP1TurnTaken(false);
        setP2TurnTaken(false);
        setP1RandomNumber(0);
        setP2RandomNumber(0);
        setP1TurnHappening(false);
        setP2TurnHappening(false);
        setWinnerName('');
    }
    
    function handlePlayAgain() {
        setP1Score(0);
        setP2Score(0);
        setP1SelectedIndex(0);
        setP2SelectedIndex(0);
        setGameOver(false);
        setP1TurnTaken(false);
        setP2TurnTaken(false);
        setP1RandomNumber(0);
        setP2RandomNumber(0);
        setP1TurnHappening(false);
        setP2TurnHappening(false);
        setWinnerName('');
    }
    
    const calculateWinner = (score1: number, score2: number) => {
        if (score1 > 21) {
            setWinnerName(p2Name);
            return;
        }
        if (score2 > 21) {
            setWinnerName(p1Name);
            return;
        }
        if (score1 === score2) {
            setWinnerName(p1Name + " and " + p2Name);
            return;
        }
        if (score1 > score2) {
            setWinnerName(p1Name);
            return;
        } else {
            setWinnerName(p2Name);
            return;
        }
    }

    const generateNumber = async (time: number) => {
        let num = await new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * 9) + 1);
            }, time); //300
        });
        return num;
    }
    
    async function takeTurn(player: number) {
        let finalNumber = 0;
        if (player === 1) {
            if (p1SelectedIndex === 1) {
                setP1TurnTaken(true);
                return;
            }
            setP1TurnHappening(true);
            setP1TurnTaken(true);

            finalNumber = Math.floor(Math.random() * 9) + 1;
            setP1RandomNumber(finalNumber);
            finalNumber = await generateNumber(300);
            setP1RandomNumber(finalNumber);
            finalNumber = await generateNumber(350);
            setP1RandomNumber(finalNumber);
            finalNumber = await generateNumber(300);
            setP1RandomNumber(finalNumber);
            finalNumber = await generateNumber(300);
            setP1RandomNumber(finalNumber);
            finalNumber = await generateNumber(500);
            setP1RandomNumber(finalNumber);

            const newScore = p1Score + finalNumber;
            setP1Score(newScore);
            setP1TurnHappening(false);
            
            if (newScore > 21) {
                calculateWinner(newScore, p2Score);
                setGameOver(true);
            }
        }

        if (player === 2) {
            if (p2SelectedIndex === 1) {
                setP2TurnTaken(true);
                return;
            }
            setP2TurnHappening(true);
            setP2TurnTaken(true);
            
            finalNumber = Math.floor(Math.random() * 9) + 1;
            setP2RandomNumber(finalNumber);
            finalNumber = await generateNumber(300);
            setP2RandomNumber(finalNumber);
            finalNumber = await generateNumber(350);
            setP2RandomNumber(finalNumber);
            finalNumber = await generateNumber(250);
            setP2RandomNumber(finalNumber);
            finalNumber = await generateNumber(300);
            setP2RandomNumber(finalNumber);
            finalNumber = await generateNumber(500);
            setP2RandomNumber(finalNumber);

            const newScore = p2Score + finalNumber;
            setP2Score(newScore);
            setP2TurnHappening(false);
            
            if (newScore > 21) {
                setGameOver(true);
                calculateWinner(p1Score, newScore);
            }
        }
        
    }

    const handleNextTurn = () => {
        if (p1SelectedIndex === 1 && p2SelectedIndex === 1) {
            setGameOver(true);
            calculateWinner(p1Score, p2Score);
            return;
        }
        setP1TurnTaken(false);
        setP2TurnTaken(false);
        setP1RandomNumber(0);
        setP2RandomNumber(0);
    }

    return (
        <LinearGradient 
            colors={['#ff9a56', '#ff6a88']}
            style={style.pageContainer}
        >
            <Text style={style.title} >Closest To 21</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>The closest to 21 wins</Text>
                <Text style={style.howToText}>When it's your turn, either go, or hold</Text>
                <Text style={style.howToText}>If you go it generates a random number between 1-9, and adds it to your total</Text>
                <Text style={style.howToText}>Go over 21, and you automatically lose</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        onPress={resetGame}
                    >Click here to reset</Text>
                </Pressable>
            </View>
            {!playersNamed && (
                <>
                    <View style={style.playerInfo}>
                            <Text style={style.display} >{p1Name === "" ? "Player 1" : `Player 1 | ${p1Name}`}</Text>
                            <Text style={style.display} >{p2Name === "" ? "Player 2" : `Player 2 | ${p2Name}`}</Text>
                    </View>
                    <View style={style.playerInput}>
                        <View style={style.playerInputHolder}>
                            <Text>Player 1</Text>
                            <TextInput
                                onChangeText={onChangeP1Name}
                                value={p1Name}
                                placeholder="Enter p1 name"          
                                style={style.input}          
                            />
                        </View>
                        <View style={style.playerInputHolder}>
                            <Text>Player 2</Text>
                            <TextInput
                                onChangeText={onChangeP2Name}
                                value={p2Name}
                                placeholder="Enter p2 name"                    
                                style={style.input}          
                            />
                        </View>
                        <Pressable
                            style={[style.saveButton, p1Name !== '' && p2Name !== '' && { backgroundColor: 'rgba(246, 246, 5, 0.8)'}]}
                            onPress={() => {
                                if (p1Name !== "" && p2Name !== "") {
                                    setPlayersNamed(true)}
                            }}
                        ><Text style={style.gameRow4Text}>Save Players</Text></Pressable>
                    </View>
                </>
            )}
            {playersNamed && !gameOver && (
                <View style={style.game}>
                    <View style={style.gameRow1}>
                        <Text style={style.gameRow1Text}>{p1Name}</Text>
                        <Text style={style.gameRow1Text}>{p2Name}</Text>
                    </View>
                    <View style={style.gameRow1}>
                        <SegmentedControl
                            tabs={["Roll", "Pass"]}
                            style={style.gameRow3Button}
                            onChange={(index: number) => !p1TurnTaken && setP1SelectedIndex(index)}
                            value={p1SelectedIndex}
                            activeTabColor="rgba(255, 154, 86, 1)"
                            activeTextColor="rgb(255, 255, 255)"
                        />
                        <SegmentedControl
                            tabs={["Roll", "Pass"]}
                            style={style.gameRow3Button}
                            onChange={(index: number) => !p2TurnTaken && setP2SelectedIndex(index)}
                            value={p2SelectedIndex}
                            activeTabColor="rgba(255, 154, 86, 1)"
                            activeTextColor="rgb(255, 255, 255)"
                        />
                    </View>
                    <View style={style.gameRow1}>
                        <Pressable
                            style={[style.gameRow4Button, p1TurnTaken && {backgroundColor: "pink"}]}
                            onPress={() => !p1TurnTaken && takeTurn(1)}
                        >
                            <Text style={style.gameRow4Text}>{p1SelectedIndex === 0 ? "Click to roll" : "Click to pass"}</Text>
                        </Pressable>
                        <Pressable
                            style={[style.gameRow4Button, p2TurnTaken && {backgroundColor: "pink"}]}
                            onPress={() => !p2TurnTaken && takeTurn(2)}
                        >
                            <Text style={style.gameRow4Text}>{p2SelectedIndex === 0 ? "Click to roll" : "Click to pass"}</Text>
                        </Pressable>
                    </View>
                    <View style={style.gameRow1}>
                        <Text style={style.gameRow1Text}>Rolled: {p1RandomNumber}</Text>
                        <Text style={style.gameRow1Text}>Rolled: {p2RandomNumber}</Text>
                    </View>        
                    <View style={style.gameRow1}>
                        <Text style={style.gameRow1Text}>Score : {p1Score}</Text>
                        <Text style={style.gameRow1Text}>Score : {p2Score}</Text>
                    </View>
                    <View style={style.gameRow1}>
                        <Pressable 
                            style={[style.gameRow6Button, p1TurnTaken && p2TurnTaken && !p1TurnHappening && !p2TurnHappening && { backgroundColor: 'rgba(246, 246, 5, 0.8)'}]}
                            onPress={() => !p1TurnHappening && !p2TurnHappening && handleNextTurn()}
                        >
                            <Text style={style.gameRow5Text}>{(p1TurnTaken && p2TurnTaken && (p1SelectedIndex === 1) && (p2SelectedIndex === 1)) ? "End game" : "Next Turn"}</Text>
                        </Pressable>
                    </View>
                </View>
            )}
            {gameOver && (
                <>
                    <View style={style.scoreHolder}>
                        <Text style={style.scoreText}>{p1Score === p2Score ? "So close" : "Congratulations!"}</Text>
                        <Text style={style.scoreText} >{p1Score === p2Score ? `${winnerName}, its a tie!` : `${winnerName} is the Winner!!!`}</Text>
                    </View>
                    <View style={style.gameRow1}>
                        <Pressable 
                            style={style.playAgainButton}
                            onPress={handlePlayAgain}
                        >
                            <Text style={style.playAgainText}>Play again?</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 20,
    },
    taps: {
        fontSize: 30,
        textAlign: "center",
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
        fontSize: 20,
        marginHorizontal: 10,
        gap: 10,
    },
    display: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,
    },
    playerInput: {
        gap: 20,
    },
    playerInputHolder: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    input: {
        height: 40,
        borderWidth: 2,
        padding: 10,
        flex: 1,
        borderRadius: 12,
        borderColor: 'rgba(0, 0, 0, 0.29)',
    },
    saveButton: {
        backgroundColor: "pink",
        alignSelf: "center",
        width: 200,
        borderRadius: 20,
        height: 30,
        justifyContent: "center",
    },
    game: {
        gap: 20,
    },
    gameRow1: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
    },
    gameRow1Text: {
        width: "40%",
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
    },
    gameRow3Button: {
        backgroundColor: 'rgba(246, 246, 5, 0)',
        borderColor: 'rgba(0, 0, 0, 0.29)',
        borderWidth: 2,
        width: "45%",
    },
    gameRow4Button: {
        backgroundColor: 'rgba(246, 246, 5, 0.8)',
        marginHorizontal: "auto",
        alignSelf: "center",
        height: 30,
        borderRadius: 20,
        justifyContent: "center",
        width: 150,
    },
    gameRow4Text: {
        textAlign: "center",
        fontSize: 20,
    },
    gameRow5Text: {
        textAlign: "center",
        fontSize: 20,
    },
    gameRow6Button: {
        backgroundColor: "pink",
        marginHorizontal: "auto",
        paddingHorizontal: 20,
        alignSelf: "center",
        height: 30,
        borderRadius: 20,
        justifyContent: "center",
        width: 150,
    },
    scoreHolder: {
        gap: 10,

    },
    scoreText: {
        fontSize: 20,
        fontWeight: 800,
        gap: 10,
        textAlign: "center",
    },
    playAgainButton: {
        backgroundColor: 'rgba(246, 246, 5, 0.8)',
        height: 30,
        borderRadius: 20,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    playAgainText: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
    },
})