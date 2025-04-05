import { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Image, Text, View, Alert, ScrollView } from 'react-native';
import { openPack } from '@/components/openpack'; 
import { Card } from '@rneui/themed';

export default function App() {
  const [packData, setPackData] = useState([]);

  const handlePress = async () => {
    try {
      const data = await openPack();
      setPackData(data);
    } catch (error) {
      Alert.alert('Failed to open pack');
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => {
            return { opacity: pressed ? 0.5 : 1 };
          }}
        >
          <Image style={styles.image} source={require('@/assets/images/Packs/OP-01.png')} />
        </Pressable>
        
          {packData.length > 0 ? (
            packData.map((u, i) => (
              <Card>
                <Card.Image style={styles.image}source={{ uri: `http://192.168.1.57:5000/images/packs/${u.set_name}/${u.id}.PNG` }}/>
              </Card>
            ))
          ) : (
            <Text>No cards available</Text> 
          )}
        
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 450, 
  },
  user: {
    padding: 10,
  },
  name: {
    fontSize: 18,
  }
});
