import { Alert, StyleSheet, Pressable, View, Image,Text } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatGrid } from 'react-native-super-grid';
import { all_cards } from '../../components/allcards';
import { discovered_cards } from '../../components/discoveredcards';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { delete_card } from '../../components/deletecard';
import {useTranslation} from 'react-i18next';

const Discovered = () => {
    const { t } = useTranslation();
    const [displayImage, setDisplayImage] = useState(1); 
    const [cardView, setCardView] = useState([])
    const [open, setOpen] = useState(false);
    const [packData, setPackData] = useState([]);
    const [discoveredpackData, setDiscoveredpackData] = useState([]);
    const [value, setValue] = useState('Romance-Dawn');
    const [items, setItems] = useState([
        { label: t('packs.op01name'), value: 'Romance-Dawn' },
        { label: t('packs.op02name'), value: 'Paramount-War' },
    ]);

    //all for cardview to be assigned
    const updateCardview = (item) => {
        setCardView(item)
    }

    //gets all the cards and discovered cards
    const allcards = async () => {
        try {
            const data = await all_cards(value);
            setPackData(data);
            const discoveredData = await discovered_cards(value);
            setDiscoveredpackData(discoveredData);
        } catch (error) {
            Alert.alert(t('discovered.failureDiscover'));
        }
    };

    //calls delete card
    const deletecard = async (cardId) => {
        try {
            await delete_card(cardId);
            setDisplayImage(1)
        } catch (error) {
            Alert.alert(t('discovered.failureDelete'));
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
                                        renderItem={({ item }) => {
                                            const isDiscovered = discovered(item.id);
                                            const imageUri = `https://onepieceapp-a9due3h2fgfgcdfy.uksouth-01.azurewebsites.net/images/packs/${item.set_name}/${item.id}.PNG`;

                                            return (
                                                <Pressable
                                                    onPress={() => {
                                                        if (isDiscovered) {
                                                            setDisplayImage(0);
                                                            updateCardview(item);
                                                        }
                                                    }}
                                                    disabled={!isDiscovered}
                                                    style={({ pressed }) => [
                                                        { opacity: isDiscovered ? (pressed ? 0.5 : 1) : 0.2 }
                                                    ]}
                                                >
                                                    <Image
                                                        key={item.id}
                                                        style={styles.image}
                                                        source={{ uri: imageUri }}
                                                        resizeMode="contain"
                                                    />
                                                </Pressable>
                                            );
                                        }}
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
                                    />
                                </>
            ) : (
                <>
                                    <Image
                                        key={cardView.id}
                                        style={styles.image}
                                        source={{ uri: `https://onepieceapp-a9due3h2fgfgcdfy.uksouth-01.azurewebsites.net/images/packs/${cardView.set_name}/${cardView.id}.PNG` }}
                                      resizeMode="contain"/>
                                        <Text>Card Rarity : {cardView.rarity}</Text>
                                        <Button 
                                        title={t('discovered.back')}
                                         onPress={() => {
                                        setDisplayImage(1);}}
                                        containerStyle={styles.buttonContainer}
                                        buttonStyle={styles.button}/>
                                        <Button 
                                        title={t('discovered.deleteDiscovery')}
                                         onPress={() => {
                                        
                                       
                                        //allcards called to the cards are updated
                                        Alert.alert(t('discovered.confirm'), t('discovered.proceed'), [
                                            {
                                              style: 'destructive',
                                              text: t('discovered.delete'),
                                              onPress: () => { deletecard(cardView.id),allcards();},
                                            },
                                            {
                                              style: 'cancel',
                                              text: t('discovered.cancel'),
                                              onPress: () => {},
                                            },
                                          ])
                                        }}
                                        containerStyle={styles.buttonContainer}
                                        buttonStyle={[styles.button, { backgroundColor: 'red' }]} 
                                        />
                                        
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
        alignSelf: 'center', 
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
        justifyContent: 'center', 
        alignItems: 'center', 
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
        marginBottom: 20, 
    },
});
