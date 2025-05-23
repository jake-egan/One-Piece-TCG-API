import { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Image, Text, View, Alert, Dimensions, SafeAreaView } from 'react-native';
import { openPack } from '../../components/openpack';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/base';
import Carousel from 'react-native-reanimated-carousel';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';
const { width, height } = Dimensions.get('window');

const Home = () => {
  const { t } = useTranslation();
    const emptyData = [];
  const [packData, setPackData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Romance-Dawn');
  const [items, setItems] = useState([
    {label: t('packs.op01name'), value: 'Romance-Dawn'},
    {label: t('packs.op02name'), value: 'Paramount-War'},
  ]);


  const handlePress = async () => {
    try {
      const data = await openPack(value); 
      setPackData(data);
    } catch (error) {
      Alert.alert(t('packs.failed'));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Card key={item}>
        <Card.Image 
          style={styles.image}
          source={{ uri: `https://onepieceapp-a9due3h2fgfgcdfy.uksouth-01.azurewebsites.net/images/packs/${item.set_name}/${item.id}.PNG` }}
        />
      </Card>
    </View>
  );

  //sets pack to empty so Packdata if statement is triggered
  const reopen = () => {
    setPackData(emptyData);
  };

  return (
    <SafeAreaView style={styles.fullContainer}>
          <View style={styles.container}>
            {packData.length > 0 ? (
              <>
                <Carousel
                  loop={false}
                  width={width}
                  height={450}
                  autoPlay={false}
                  data={packData}
                  scrollAnimationDuration={500}
                  renderItem={renderItem}
                />
                <Button 
                  title={t('packs.openAnother')}
                  onPress={reopen} 
                  containerStyle={styles.buttonContainer}
                  buttonStyle={styles.button}
                />
              </>
            ) : (
              <View style={styles.dropdownContainer}>
                <DropDownPicker
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
                <Pressable
                  onPress={handlePress}
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.pressable]}
                >
                  <Image 
                    style={styles.Packaging}
                    source={value !== "Romance-Dawn" 
                      ? require('../../assets/Images/Packs/OP-02.png') 
                      : require('../../assets/Images/Packs/OP-01.png')} 
                  />
                </Pressable>
              </View>
            )}
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    fullContainer: {
      flex: 1,
      backgroundColor: '#fffff',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    Packaging: {
      width: 300,
      height: 750,
      borderRadius: 10,
    },
    image: {
      width: 300,
      height: 450,
      borderRadius: 10,
    },
    carouselItem: {
      borderRadius: 10,
      height: 450,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    dropdownContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 10,
    },
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
    pressable: {
      marginTop: 0,
    }
  });


export default Home