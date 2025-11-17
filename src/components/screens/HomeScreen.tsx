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

    const boxDescriptions = [
        "Choose a random number between 1 and 9",
        "Coin flip",
        "Closest to 21",
        "Under Construction...",
        "ran5Text",
    ]
    const boxColour = [
        ['#667eea', '#764ba2'],
        ['#4facfe', '#00f2fe'],
        ['#ff9a56', '#ff6a88'],
        ['#43e97b', '#38f9d7'],
    ]

    // const selectionBox = (click: any, icon: number) => {
    //     return (
    //         <Pressable 
    //             style={style.selectionBox}
    //             onPress={() => click}
    //         >
    //             <View style={style.logo} >
    //                 <Ionicons name={icon as any} size={50} color="#007AFF" />
                    
    //             </View>
    //             <View style={style.descripton} >
    //                 <Text style={style.tapcount} >{kasiaTaps}</Text>
    //                 <Text style={style.tapcount} >{localShowKasiaTab.toString()}</Text>
    //             </View>

    //         </Pressable>
    //     )
    // }

    const selectionBox = (click: any, clickLocation: any, icon: string, descriptonText: string, theBoxColour: any) => {
        return (
            <LinearGradient colors={[theBoxColour[0], theBoxColour[1]]} style={style.outerSelectionBox} >
                <Pressable 
                        style={style.selectionBox}
                        onPress={() => click(clickLocation)}
                >
                        <View style={style.logo} >
                            <Ionicons name={icon as any} size={50} color="#ffffff" />
                            
                        </View>
                        <View style={style.descripton} >
                            <Text style={style.descriptionBoxText} >{descriptonText}</Text>
                            {/* <Text style={style.tapcount} >{kasiaTaps}</Text>
                            <Text style={style.tapcount} >{localShowKasiaTab.toString()}</Text> */}
                        </View>

                </Pressable>
            </LinearGradient>

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
                {selectionBox(handleNavClick, "1-9", "aperture-outline", boxDescriptions[0], boxColour[0] )}
                {selectionBox(handleNavClick, "Coin", "logo-bitcoin", boxDescriptions[1], boxColour[1]  )}
                {selectionBox(handleNavClick, "21", "barbell-outline", boxDescriptions[2], boxColour[2]  )}
                {selectionBox(handleNavClick, "Ran4", "cash-outline", boxDescriptions[3], boxColour[3] )}
                <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={style.outerSelectionBox} >
                    <Pressable 
                        style={style.selectionBox}
                        onPress={() => handleSelectionBoxPress()}
                    >
                        <View style={style.logo} >
                            <Ionicons name="people-circle-outline" size={50} color="#FFFFFF" />
                            
                        </View>
                        <View style={style.descripton} >
                            <Text style={style.descriptionBoxText} >{kasiaTaps === 0 ? "Tap ;)" : kasiaTaps}</Text>
                        </View>

                    </Pressable>

                </LinearGradient>
                {/* <View style={style.selectionBox} >

                </View>
                <View style={style.selectionBox} >

                </View>
                <View style={style.selectionBox} >

                </View> */}

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
        backgroundColor: "#007AFF",
        color: 'white',
        paddingTop: 20,
        paddingBottom: 20,
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
        shadowColor: '#000',
        // shadowOffset: { width: 10, height: -3 },
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
        // borderRadius: 20,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        // borderWidth: 5,

        // // iOS shadow
        // shadowColor: '#000',
        // // shadowOffset: { width: 10, height: -3 },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // // Android shadow
        // elevation: 5,

    },
    logo: {
        width: 80,
        // backgroundColor: "grey",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    descripton: {
        flex: 1,
        // backgroundColor: "blue",
        // borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginRight: 10,


    },
    descriptionBoxText: {
        fontSize: 20,
        fontWeight: 600,
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    // tapcount: {
    //     textAlign: 'center',
    //     fontSize: 30,

    // }
})