import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import screenStyles from "src/styles/screenStyles";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen() {

    const [kasiaTaps, setKasiaTaps] = useState(0);
    const [localShowKasiaTab, setLocalShowKasiaTab] = useState(false);

    const route = useRoute();
    const { setShowKasiaTab } = route.params as { setShowKasiaTab: (value: boolean) => void };
    
    const robot = () => {
        return (
            <Ionicons name="logo-ionitron" size={50} color="#007AFF" style={style.robot} />
        )
    }   

    const robotArray = [robot(), robot(), robot(), robot(), robot(), robot(), robot(), robot()]

    const handleSelectionBoxPress = () => {
        setKasiaTaps(prev => {
            const newValue = prev + 1;
            if (newValue >= 5) {
                setShowKasiaTab(true);
                setLocalShowKasiaTab(true);
            }
            return newValue;
        });
    }

    return (
        <View style={screenStyles.container} >
            
            <ScrollView>
                <View style={style.robotHolder} >{robotArray}</View>
                <View style={style.title} >
                    {/* <Text
                        style={style.titleText}
                    >Welcome to</Text> */}
                    <Text
                        style={style.titleText}
                    >Tap 'O' Matic</Text>
                </View>
                <View style={style.robotHolder} >{robotArray}</View>
                {/* <Ionicons name="logo-ionitron" size={50} color="#007AFF" style={style.robot} /> */}
                <Text style={style.genText} >This is a collection of random number generators</Text>
                {!localShowKasiaTab && (<Pressable 
                    style={style.selectionBox}
                    onPress={() => handleSelectionBoxPress()}
                >
                    <View style={style.logo} >
                        <Ionicons name="people-circle-outline" size={50} color="#007AFF" />
                        
                    </View>
                    <View style={style.descripton} >
                        <Text style={style.tapcount} >{kasiaTaps}</Text>
                        <Text style={style.tapcount} >{localShowKasiaTab.toString()}</Text>

                    </View>

                </Pressable>)}
                <View style={style.selectionBox} >

                </View>
                <View style={style.selectionBox} >

                </View>
                <View style={style.selectionBox} >

                </View>

            </ScrollView>


        </View>
    )
}

const style = StyleSheet.create({
    title: {
        // marginTop: 50,
        // marginBottom: 50,
        // backgroundColor: 'yellow',
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
        marginVertical: 10,
        marginHorizontal: 20,
        height: 80,
        borderRadius: 20,
        flexDirection: "row",
    },
    logo: {
        width: 60,
        backgroundColor: "grey",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    descripton: {
        flex: 1,
        backgroundColor: "blue",
        borderRadius: 20,
    },
    tapcount: {
        textAlign: 'center',
        textAlignVertical: "center",
        // height: "auto",
        // width: "auto",
        fontSize: 30,

    }
})

