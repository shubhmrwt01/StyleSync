import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      "https://i.pinimg.com/736x/2e/3d/d1/2e3dd14ac81b207ee6d86bc99ef576eb.jpg",
    screen: "AIChat",
  },
  {
    title: "AI Outfit Maker",
    image:
      "https://i.pinimg.com/736x/50/83/0e/50830e372ee844c1f429b8ef89e26fd1.jpg",
    screen: "AIOutfit",
  },
  {
    title: "AI Try On",
    image:
      "https://i.pinimg.com/736x/c2/78/95/c2789530a2dc8c9dbfd4aa5e2e70d608.jpg",
    screen: "AITryOn",
  },
  {
    title: "Color Analysis",
    image:
      "https://i.pinimg.com/736x/84/bf/ce/84bfce1e46977d50631c4ef2f72f83b1.jpg",
    screen: "ColorAnalysis",
  },
];

// const popularItems = [
//   {
//     username: "Trisha Wushres",
//     profile: "https://randomuser.me/api/portraits/women/1.jpg",
//     image:
//       "https://res.cloudinary.com/db1ccefar/image/upload/v1753859289/skirt3_oanqxj.png",
//     itemName: "Floral Skirt",
//   },
//   {
//     username: "Anna Cris",
//     profile: "https://randomuser.me/api/portraits/women/2.jpg",
//     image:
//       "https://res.cloudinary.com/db1ccefar/image/upload/v1753975629/Untitled_design_3_syip4x.png",
//     itemName: "Mens Jeans",
//   },
//   {
//     username: "Isabella",
//     profile: "https://randomuser.me/api/portraits/women/3.jpg",
//     image:
//       "https://res.cloudinary.com/db1ccefar/image/upload/v1753975802/Untitled_design_11_p7t2us.png",
//     itemName: "Shoes",
//   },
// ];

const initialStories = [
  {
    username: "Your OOTD",
    avatar: "https://picsum.photos/100/100?random=8",
    isOwn: true,
    viewed: false,
  },
  {
    username: "_trishwushres",
    avatar: "https://picsum.photos/100/100?random=10",
    isOwn: false,
    viewed: false,
  },
  {
    username: "myglam",
    avatar: "https://picsum.photos/100/100?random=11",
    isOwn: false,
    viewed: false,
  },
  {
    username: "stylist",
    avatar: "https://picsum.photos/100/100?random=12",
    isOwn: false,
    viewed: false,
  },
];
const popularItems = [
  {
    id: "1",
    image: "",
    itemName: "",
    userName: "",
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
        label: today.clone().add(i, "days").format("ddd,Do MMM"),
        outfit: i == 1,
      });
    }
    return dates;
  };
  const dates = generateDates();
  console.log("dates", dates);
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
              <View className="mr-3">
                <Pressable
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
              className="w-[40%] h-36 mb-4 rounded-2xl shadow-md overflow-hidden"
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 pl-4">
          {popularItems.map((item, idx) => (
            <View key={idx} className="w-36 mr-4">
              <Image
                className="h-44 w-36 rounded-lg"
                source={{ uri: item?.image }}
              />
              <View className="flex-row items-center mt-2">
                <Image
                  className="h-6 w-6 rounded-full"
                  source={{ uri: item?.profile }}
                />
                <Text className="text-xs font-medium">{item?.userName}</Text>
              </View>
              <Text className="text-xs text-gray-500 mt-1">{item?.itemName}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
