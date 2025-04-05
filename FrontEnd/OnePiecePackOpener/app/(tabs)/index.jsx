import { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Image, Text, View, Alert, ScrollView } from 'react-native';
import { openPack } from '@/components/openpack'; 
import { Card } from '@rneui/themed';
import { Button } from '@rneui/base';

export default function App() {
  const emptyData = [] // used to set data to empty
  const [packData, setPackData] = useState([]);

  const handlePress = async () => {
    try {
      const data = await openPack();
      setPackData(data);
    } catch (error) {
      Alert.alert('Failed to open pack');
    }
  };

  // used for resetting the useState
  const reopen = () => {
    setPackData(emptyData)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        
          {packData.length > 0 ? (
  <>
    {packData.map((u, i) => (
      <Card key={i}>
        <Card.Image 
          style={styles.image}
          source={{ uri: `http://192.168.1.57:5000/images/packs/${u.set_name}/${u.id}.PNG` }}
        />
      </Card>
    ))}
    
    <Button title="Open Another" onPress={reopen} />
  </>
) : (
  <Pressable
    onPress={handlePress}
    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
  >
    <Image 
      style={styles.image} 
      source={require('@/assets/images/Packs/OP-01.png')} 
    />
  </Pressable>
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
