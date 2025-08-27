import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
interface ClothingItem {
  id: number;
  image: string;
  x: number;
  y: number;
  type?: "pants" | "shoes" | "skirts" | "shirt" ;
  gender: "m" | "f" | "unisex";
}

const DraggableClothingItem = ({ item }: { item: ClothingItem }) => {
  const translateX = useSharedValue(item?.x);
  const translateY = useSharedValue(item?.y);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX + item.x;
      translateY.value = e.translationY + item.y;
    })
    .onEnd(() => {
      item.x = translateX.value;
      item.y = translateY.value;
    });
  const animateStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    position: "absolute",
    zIndex: item.type === "shirt"  ? 20 : 10,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animateStyle}>
        <Image
          resizeMode="contain"
          style={{ width: 240, height: item?.type == "shoes" ? 180 : 240 }}
          source={{ uri: item?.image }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const DesignRoomScreen = () => {
  const router = useRoute();
  const { selectedItems, date, savedOutfits } = router.params as {
    selectedItems: ClothingItem[];
    date: string;
    savedOutfits: { [key: string]: any[] };
  };
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  useEffect(() => {
    const initialClothes = selectedItems?.map((item) => {
      const xPosition = width / 2 - 120;
      let yPosition;
      const shirtItem = selectedItems.find((i) => i.type == "shirt");
      const pantsItem = selectedItems.find((i) => i.type == "pants");
      const shoesItem = selectedItems.find((i) => i.type == "shoes");
      if (item?.type == "shirt" ) {
        yPosition = height / 2 - 240 - 100;
      } else if (item?.type == "pants"||item?.type == "skirts") {
        yPosition = shirtItem ? height / 2 - 100 : height / 2;
      } else if (item?.type == "shoes" ) {
        yPosition = pantsItem || shirtItem ? height / 2 + 100 : height / 2 + 60;
      } else {
        yPosition = height / 2;
      }
      return { ...item, x: xPosition, y: yPosition };
    });
    setClothes(initialClothes);
  }, [selectedItems]);
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-white text-lg">{date}</Text>
        <TouchableOpacity className="bg-gray-700 p-2 rounded">
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>
      <View>
        {clothes?.map((item) => (
          <DraggableClothingItem key={item?.id} item={item} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DesignRoomScreen;
