import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
const { width, height } = Dimensions.get("window");
const features = [
  {
    title: "AI Suggestions",
    image:
      "https://image.made-in-china.com/202f0j00MaTqJAIWkdzF/Latest-Design-Elegant-Classic-Two-Piece-Pants-Set-Women-Long-Sleeve-Ladies-Shirt-and-Pants-Suit.webp",
    screen: "AIChat",
  },
  {
    title: "AI Outfit Maker",
    image:
      "https://rukminim2.flixcart.com/image/704/844/xif0q/ethnic-set/q/t/j/xl-sp-combo-dearise-original-imagpgvqqhrqehas.jpeg?q=90&crop=false",
    screen: "AIOutfit",
  },
  {
    title: "AI Try On",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWABl246VZtcOazL8-W9IBqonzgZnocSjZg&s",
    screen: "AITryOn",
  },
  {
    title: "Color Analysis",
    image:
      "https://cdn.shopify.com/s/files/1/0423/3576/4634/files/White_Shirt_Olive_Green_Pant_Combination.webp",
    screen: "ColorAnalysis",
  },
];

const popularItems = [
  {
    username: "Trisha Wushres",
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdktM9CiQKJvkjG1u_U9bHvqW6kzPCBwsR0w&s",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSpWucTCUdb_O3ogbXlQlyM9RcYkwpMM4dA&s",
    itemName: "Floral Skirt",
  },
  {
    username: "Logan Cris",
    profile: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    image:
      "https://image.hm.com/assets/hm/8b/ea/8bea8bac07ed75596e5597f6d2997f07cfd81fac.jpg",
    itemName: "Mens Jeans",
  },
  {
    username: "Isabella",
    profile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBmYWNlfGVufDB8fDB8fHww",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXi4XW7-xjcji7RTTD87f-jI8eMhnBofRKJw&s",
    itemName: "Shoes",
  },
];

const initialStories = [
  {
    username: "Your OOTD",
    avatar: "https://www.pacegallery.com/media/images/16_9-2.width-2000.png",
    isOwn: true,
    viewed: false,
  },
  {
    username: "_trishwushres",
    avatar: "https://images.squarespace-cdn.com/content/v1/6150da9bc04b0a138b3c0600/1634528500503-V7KPRTKGCRB73IY6IKB9/Stone-Circle.jpg",
    isOwn: false,
    viewed: false,
  },
  {
    username: "myglam",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGawC4ToKE3wCtMfBzuBq4RI-x9m-Ir-Iww&s",
    isOwn: false,
    viewed: false,
  },
  {
    username: "stylist",
    avatar: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000033063/44ba47ef81db5012172d90726c825ef28792fd73621a68235fdb0114be9e761f",
    isOwn: false,
    viewed: false,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [stories, setStories] = useState(initialStories);
  const [showStory, setShowStory] = useState(false);
  const [currentStory, setCurrentStory] = useState<{
    username: string;
    avatar: string;
    duration: number;
  } | null>(null);
  const generateDates = () => {
    const today = moment().startOf("day");
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      dates.push({
        label: today.clone().add(i, "days").format("ddd, Do MMM"),
        outfit: i == 1,
      });
    }
    return dates;
  };
  const dates = generateDates();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white">
        <View className="flex-row items-center justify-between px-4 pt-4">
          <Text className="text-3xl font-bold">Fits</Text>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="bg-black px-4 py-1 rounded-full">
              <Text className="text-white font-semibold text-sm">Upgrade</Text>
            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Ionicons name="search-outline" size={24} color="black" />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 pl-4"
        >
          {stories?.map((story, idx) => (
            <Pressable key={idx} className="mr-4 items-center">
              <View
                className={`w-16 h-16 rounded-full  items-center justify-center relative ${
                  story.viewed
                    ? "border-2  border-gray-200"
                    : "border-2  border-purple-200"
                }`}
              >
                <Image
                  className="w-16 h-16 rounded-full"
                   source={{ uri: story.avatar }}
                />
                {story.isOwn && (
                  <View className="absolute bottom-0 right-0 bg-black rounded-full w-5 h-5 items-center justify-center ">
                    <Text className="text-white text-xs">+</Text>
                  </View>
                )}
              </View>
              <Text className="text-xs mt-1">{story?.username}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between mt-6 px-4">
          <Text className="text-[20px] font-semibold">Your week</Text>
          <Text className="text-gray-500 ">Planner</Text>
        </View>
        <ScrollView
          className="mt-4 pl-4"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {dates?.map((day, idx) => {
            const today = moment().format("ddd, Do MMM");
            const outfit =
              savedOutfits[day.label] ||
              (day.label == today && savedOutfits[today]
                ? savedOutfits[today]
                : null);
            return (
              <View key={idx} className="mr-3">
                <Pressable 
                onPress={()=>{
                  navigation.navigate("AddOutfit", {
                    date:day.label,
                    savedOutfits
                  });
                }}
                  className={`w-24 h-40 rounded-xl items-center justify-center overflow-hidden shadow-medium ${
                    outfit ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {!outfit && (
                    <View className="h-full w-full flex items-center justify-center">
                      <Text className="text-3xl  text-gray-400">+</Text>
                    </View>
                  )}
                  {outfit && <View></View>}
                </Pressable>
                <Text className="text-xs text-center mt-1 text-gray-700">
                  {day.label}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View className="flex-row  flex-wrap justify-between px-4 mt-6">
          {features.map((feature, idx) => (
            <Pressable
              style={{
                backgroundColor: ["#FFF1F2", "#EFF6FF", "#F0FFF4", "#FFFBEB"][
                  idx % 4
                ],
                elevation: 3,
              }}
              key={idx}
              className="w-[46%] h-36 mb-4 rounded-2xl shadow-md overflow-hidden"
            >
              <View className="p-3">
                <Text className="font-bold text-[16px] text-gray-800 ">
                  {feature.title}
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                  {idx == 0
                    ? "Try outfit virtually"
                    : idx == 1
                      ? "AI created new looks"
                      : idx == 2
                        ? "Instant try on"
                        : "Find best colors"}
                </Text>
              </View>
              <Image
                style={{ transform: [{ rotate: "12deg" }], opacity: 0.9 }}
                className="w-20 h-20 absolute bottom-[-3] right-[-1] rounded-lg"    
                source={{ uri: feature.image }}
              />
            </Pressable>
          ))}
        </View>
        <View className="flex-row items-center justify-between mt-6 px-4">
          <Text className="text-lg font-semibold">Popular this week</Text>
          <Text className="text-gray-500">More </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 pl-4"
        >
          {popularItems.map((item, idx) => (
            <View key={idx} className="w-36 mr-4 ">
              <Image
                className="h-44 w-36 rounded-lg "
                source={{ uri: item.image }}
              />
              <View className="flex-row items-center mt-2 ">
                <Image
                  className="h-6 w-6 rounded-full"
                  source={{ uri: item.profile }}
                />
                <Text className="text-xs font-medium ml-2">{item?.username}</Text>
              </View>
              <Text className="text-xs text-gray-500 mt-1 ml-4">
                {item?.itemName}
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
