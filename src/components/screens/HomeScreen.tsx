import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import screenStyles from "src/styles/screenStyles";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useStateContext } from 'src/context/StateContext';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {

    const [kasiaTaps, setKasiaTaps] = useState(0);
    const { setShowKasiaTab } = useStateContext();
    const navigation = useNavigation<any>();
    
    const robot = (key: number) => {
        return (
            <Ionicons 
                key={key}
                name="logo-ionitron"
                size={50}
                color="#007AFF"
                style={style.robot}
            />
        )
    }   

    const robotArray = [robot(0), robot(1), robot(2), robot(3), robot(4), robot(5), robot(6), robot(7)]

    const handleSelectionBoxPress = () => {
        setKasiaTaps(prev => {
            const newValue = prev + 1;
            if (newValue >= 5) {
                setShowKasiaTab(true)
            }
            return newValue;
        });
    }

    const handleNavClick = (tab: any) => {
        navigation.navigate(tab);
        console.log("clicked");
    }

    const boxNames = [
        "Battle For 100",
        "Coin Flip",
        "Closest To 31",
        "The Selector",
        "The Three Kasias"
    ]

    const boxDescriptions = [
        "Select 1-9, battle it out over 100 points ",
        "Heads or Tails. Can you win",
        "Are close do you dare to go",
        "Who selects wins. Select a range and number. The rest is history ",
        "Tap tap tap...",
    ]
    const boxColour = [
        ['#667eea', '#764ba2'],
        ['#4facfe', '#00f2fe'],
        ['#ff9a56', '#ff6a88'],
        ['#43e97b', '#38f9d7'],
    ]

    const selectionBox = (click: any, clickLocation: any, icon: string, descriptionTitle: string, descriptonText: string, theBoxColour: any) => {
        return (
            <Pressable 
                        style={style.outerSelectionBox}
                        onPress={() => click(clickLocation)}
            >
                <LinearGradient colors={[theBoxColour[0], theBoxColour[1]]} style={style.selectionBox} >
                        <View style={style.logo} >
                            <Ionicons name={icon as any} size={40} color="rgb(0, 0, 0)" />
                        </View>
                        <View style={style.descripton} >
                            <Text style={style.descriptionBoxTitle}>{descriptionTitle}</Text>
                            <Text style={style.descriptionBoxText} >{descriptonText}</Text>
                        </View>
                </LinearGradient>
            </Pressable>
        )
    }

    return (
        <View style={screenStyles.container} >
            
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={style.robotHolder} >{robotArray}</View>
                <View style={style.title} >
                    <Text
                        style={style.titleText}
                    >Tap 'O' Matic</Text>
                </View>
                <View style={style.robotHolder} >{robotArray}</View>
                <Text style={style.genText} >A collection of random number generators</Text>
                {selectionBox(handleNavClick, "Battle For 100", "options-outline", boxNames[0], boxDescriptions[0], boxColour[0] )}
                {selectionBox(handleNavClick, "Closest To 31", "push-outline", boxNames[1], boxDescriptions[2], boxColour[2]  )}
                {selectionBox(handleNavClick, "Coin Flip", "logo-bitcoin", boxNames[2], boxDescriptions[1], boxColour[1]  )}
                {selectionBox(handleNavClick, "The Selector", "cash-outline", boxNames[3], boxDescriptions[3], boxColour[3] )}
                <Pressable 
                    style={style.outerSelectionBox}
                    onPress={() => handleSelectionBoxPress()}
                >
                    <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={style.selectionBox} >
                        <View style={style.logo} >
                            <Ionicons name="people-circle-outline" size={50} color="rgb(0, 0, 0)" />
                        </View>
                        <View style={style.descripton} >
                            <Text style={style.descriptionBoxTitle}>{boxNames[4]}</Text>
                            <Text style={style.descriptionBoxText} >{kasiaTaps === 0 ? boxDescriptions[4] : kasiaTaps}</Text>
                        </View>

                    </LinearGradient>
                </Pressable>

            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    title: {
        backgroundColor: "#007AFF",
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
    },
    titleText: {
        fontSize: 50,
        color: 'white',
        textAlign: 'center',
    },
    genText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 400,
        backgroundColor: "#007AFF",
        color: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    robotHolder: {
        flexDirection: "row",
    },
    robot: {
        marginTop: 10,
        marginBottom: 10,
    },
    outerSelectionBox: {
        backgroundColor: "grey",
        // backgroundColor: "white",
        marginVertical: 10,
        marginHorizontal: 20,
        height: 80,
        borderRadius: 20,
        // flexDirection: "row",
        borderWidth: 0,
    
        // iOS shadow
        // shadowColor: '#000',
        // // shadowOffset: { width: 10, height: -3 },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // // Android shadow
        // elevation: 5,

        // iOS shadow
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android shadow
        elevation: 5,
    },
    selectionBox: {
        // backgroundColor: "grey",
        // backgroundColor: "white",
        // marginVertical: 10,
        // marginHorizontal: 20,
        // height: 80,
        borderRadius: 20,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        // borderWidth: 5,


    },
    logo: {
        width: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
    },
    descripton: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 5,
        marginRight: 20,
        // backgroundColor: "green",
        gap: 3,
        // paddingTop: 5,
    },
    descriptionBoxTitle: {
        fontSize: 20,
        fontWeight: 600,
        // color: "white",
        color: "black",
        // textShadowColor: "rgba(0, 0, 0, 1)",
        // textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    descriptionBoxText: {
        fontSize: 18,
        fontWeight: 400,
        // color: "white",
        color: "black",
        textAlign: "center",
        // textShadowColor: "rgba(0, 0, 0, 1)",
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 2,
    }
})