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

    const selectionBox = (click: any, clickLocation: any, icon: string) => {
        return (
            <Pressable 
                    style={style.selectionBox}
                    onPress={() => click(clickLocation)}
            >
                {/* <LinearGradient colors={['#667eea', '#764ba2']} > */}
                    <View style={style.logo} >
                        <Ionicons name={icon as any} size={50} color="#007AFF" />
                        
                    </View>
                    <View style={style.descripton} >
                        {/* <Text style={style.tapcount} >{kasiaTaps}</Text>
                        <Text style={style.tapcount} >{localShowKasiaTab.toString()}</Text> */}
                    </View>

                {/* </LinearGradient> */}
            </Pressable>

        )
    }

    return (
        <View style={screenStyles.container} >
            
            <ScrollView>
                <View style={style.robotHolder} >{robotArray}</View>
                <View style={style.title} >
                    <Text
                        style={style.titleText}
                    >Tap 'O' Matic</Text>
                </View>
                <View style={style.robotHolder} >{robotArray}</View>
                {/* <Ionicons name="logo-ionitron" size={50} color="#007AFF" style={style.robot} /> */}
                <Text style={style.genText} >This is a collection of random number generators</Text>
                {selectionBox(handleNavClick, "Ran1", "aperture-outline" )}
                {selectionBox(handleNavClick, "Ran2", "american-football-outline")}
                {selectionBox(handleNavClick, "Ran3", "barbell-outline")}
                {selectionBox(handleNavClick, "Ran4", "cash-outline")}
                <Pressable 
                    style={style.selectionBox}
                    onPress={() => handleSelectionBoxPress()}
                >
                    <View style={style.logo} >
                        <Ionicons name="people-circle-outline" size={50} color="#007AFF" />
                        
                    </View>
                    <View style={style.descripton} >
                        <Text style={style.tapcount} >{kasiaTaps === 0 ? "Tap ;)" : kasiaTaps}</Text>
                    </View>

                </Pressable>
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
    selectionBox: {
        backgroundColor: "grey",
        // backgroundColor: "white",
        marginVertical: 10,
        marginHorizontal: 20,
        height: 80,
        borderRadius: 20,
        flexDirection: "row",
        // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
        // iOS shadow
        borderWidth: 5,
        // outlineColor: "green,"
        // borderBottomWidth: 5,
        // iOS shadow
        shadowColor: '#000',
        // shadowOffset: { width: 10, height: -3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android shadow
        elevation: 5,
      

        // shadowColor: '#010',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.05,
        // shadowRadius: 2,
        // // Android shadow
        // elevation: 2,

    },
    logo: {
        width: 60,
        // backgroundColor: "grey",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    descripton: {
        flex: 1,
        // backgroundColor: "blue",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"

    },
    tapcount: {
        textAlign: 'center',
        fontSize: 30,

    }
})