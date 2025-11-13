import { View, Text, StyleSheet, FlatList } from "react-native";
import screenStyles from "src/styles/screenStyles";
import { useState, useCallback, useEffect } from "react";
import { useStateContext } from "src/context/StateContext";

export default function KasiaScreen() {
    const [data, setData] = useState(kasiaText);
    const [showKasia, setShowKasia] = useState(false);
    
    // Define colors for each set
    const colors = ['#FFE5E5', '#E5F3FF', '#E5FFE5', '#FFF5E5', '#F0E5FF'];
    
    const loadMore = useCallback(() => {
        // Add another copy of the array when reaching the end
        setData(prev => [...prev, ...kasiaText]);
    }, []);

    const { showKasiaTab } = useStateContext();
    
    return (
        <View style={screenStyles.container}>
            {!showKasiaTab ? (
                <Text>Where are the taps?</Text>
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        // Calculate which set this item belongs to (0, 1, 2, etc.)
                        const setIndex = Math.floor(index / kasiaText.length);
                        // Cycle through colors using modulo
                        const backgroundColor = colors[setIndex % colors.length];
                        
                        return (
                            <View style={[styles.textarea, { backgroundColor }]}>
                                <Text key={index} style={styles.text}>{item}</Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>            
    )
}

const kasiaText = ["I Love BABY KASIA", "I Love SISTER KASIA", "I Love MOTHER KASIA"]


const styles = StyleSheet.create({
    textarea: {
        // margin: 100,
        padding: 10,
        width: '100%',
        // alignSelf: 'stretch',
        // height: 200,
        // backgroundColor: "blue",
        gap: 30,

      },
      text: {
        fontSize: 26,
        textAlign: "center",

      },
      box: {
    
      },
})