import { Alert, StyleSheet, Pressable, View, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatGrid } from 'react-native-super-grid';
import { all_cards } from '../../components/allcards';
import { discovered_cards } from '../../components/discoveredcards';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/base';

const Discovered = () => {
    const [displayImage, setDisplayImage] = useState(1); 
    const [cardView, setCardView] = useState([])
    const [open, setOpen] = useState(false);
    const [packData, setPackData] = useState([]);
    const [discoveredpackData, setDiscoveredpackData] = useState([]);
    const [value, setValue] = useState('Romance-Dawn');
    const [items, setItems] = useState([
        { label: 'Romance Dawn OP01', value: 'Romance-Dawn' },
        { label: 'Paramount War OP02', value: 'Paramount-War' },
    ]);


    const updateCardview = (item) => {
        setCardView(item)
    }


    const allcards = async () => {
        try {
            const data = await all_cards(value);
            setPackData(data);
            const discoveredData = await discovered_cards(value);
            setDiscoveredpackData(discoveredData);
        } catch (error) {
            Alert.alert('Failed to open pack');
        }
    };

    useFocusEffect(
        useCallback(() => {
            allcards(); 
        }, [value]) 
    );

    const discovered = (cardid) => {
        for (let x of discoveredpackData) {
            if (x.cardId === cardid) {
                return true;
            }
        }
        return false;
    };

    return (
        <View style={styles.cards}>
            {displayImage === 1 ? (
                    <>
                        <FlatGrid
                            data={packData}
                            renderItem={({ item }) =>
                                discovered(item.id) ? (
                                            <Pressable
                                                onPress={() => {
                                                setDisplayImage(0);
                                                updateCardview(item);}}
                                                
                                                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                                                <Image
                                                    key={item.id}
                                                    style={styles.image}
                                                    source={{ uri: `http://192.168.1.57:5000/images/packs/${item.set_name}/${item.id}.PNG` }}                                                    
                                                
                                                resizeMode="contain"/>
                                            </Pressable>
                                            ) : (
                                                <>
                                                <Image
                                                    key={item.id}
                                                    style={[styles.image, { opacity: 0.2 }]}
                                                    source={{ uri: `http://192.168.1.57:5000/images/packs/${item.set_name}/${item.id}.PNG` }}
                                                    resizeMode="contain"
                                                />
                                                </>
                                            )
                                        }
                                    />
                                    <DropDownPicker
                                        style={styles.dropdownContainer}
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        theme="LIGHT"
                                        multiple={false}
                                        mode="BADGE"
                                        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                                    />
                                </>
            ) : (
                <>
                                    <Image
                                        key={cardView.id}
                                        style={styles.image}
                                        source={{ uri: `http://192.168.1.57:5000/images/packs/${cardView.set_name}/${cardView.id}.PNG` }}
                                      resizeMode="contain"/>
                                        <Button 
                                        title="Back"
                                         onPress={() => {
                                        setDisplayImage(1);}}
                                        containerStyle={styles.buttonContainer}
                                        buttonStyle={styles.button}/>
                </>
            )}
        </View>
    );
};

export default Discovered;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        width: '60%',
      },
      button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
      },
    cards: {
        paddingTop: 25,
        flex: 1,
        marginHorizontal: "auto",
        width: '100%',
    },
    dropdownContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
});
