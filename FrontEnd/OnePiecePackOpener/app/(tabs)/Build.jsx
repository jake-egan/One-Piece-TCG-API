import React from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

export default function App() {
  const carouselItems = [
    { title: "Item 1", text: "Text 1" },
    { title: "Item 2", text: "Text 2" },
    { title: "Item 3", text: "Text 3" },
    { title: "Item 4", text: "Text 4" },
    { title: "Item 5", text: "Text 5" },
  ];

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50 }}>
      <Carousel
        loop
        width={width}
        height={300}
        autoPlay={false}
        data={carouselItems}
        scrollAnimationDuration={500}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
