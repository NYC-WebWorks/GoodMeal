import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import mealServices from "@/src/services/mealServices";
import { TCategory, TMeal, TMealArea } from "@/src/types/meal";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const [mealOfDay, setMealOfDay] = useState<TMeal>();
  const [mealAreas, setMealAreas] = useState<TMealArea[]>();
  const [categories, setCategories] = useState<TCategory[]>();
  const [selectedArea, setSelectedArea] = useState("");

  const onPressMealOfDay = () => {
    //
  };

  const onPressMealAreaItem = (item: TMealArea) => () => {
    setSelectedArea(item.strArea);
  };

  const onPressCategoryItem = (item: TCategory) => () => {
    //
  };

  const renderMealAreaItem: ListRenderItem<TMealArea> = ({ item }) => {
    const isSelected = selectedArea == item.strArea;
    return (
      <Pressable
        className={`rounded-full px-6 py-3 ${
          isSelected ? "bg-[#70b9be]" : "bg-gray-300"
        }`}
        onPress={onPressMealAreaItem(item)}
      >
        <Text className={`text-lg ${isSelected ? "text-white" : "text-black"}`}>
          {item.strArea}
        </Text>
      </Pressable>
    );
  };

  const renderCategoryItem: ListRenderItem<TCategory> = ({ item }) => {
    return (
      <Pressable
        className="bg-white dark:bg-black rounded-3xl w-60 shadow-[5] py-10 border-2 border-gray-200"
        onPress={onPressCategoryItem(item)}
      >
        <Image
          source={{ uri: item.strCategoryThumb }}
          alt={item.strCategoryDescription}
          className="h-40"
          contentFit="contain"
        />
        <Text className="text-lg px-5">{item.strCategory}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const ret = await mealServices.getRandomMeal();
      setMealOfDay(ret.meals[0]);

      const ret2 = await mealServices.getAllAreas();
      setMealAreas(ret2.meals);

      const ret3 = await mealServices.getAllCategories();
      setCategories(ret3.categories);
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView>
        <View className="flex-row items-center rounded-lg mx-4 my-3 gap-3 px-2 border-2 border-gray-200">
          <Ionicons name="search-outline" size={24} color="black" />
          <TextInput className="h-10 text-lg" placeholder="Search" />
        </View>
        <View className="px-5 gap-3">
          <Text className="text-black dark:text-white text-2xl font-bold">
            Meal of the Day
          </Text>
          {mealOfDay && (
            <Pressable
              className="p-4 rounded-xl w-3/4 aspect-[5/3]"
              onPress={onPressMealOfDay}
            >
              <Image
                source={require("@/src/assets/images/CardBack.svg")}
                className="absolute bottom-0 top-0 left-0 right-0"
                contentFit="fill"
              />
              <View className="flex-row flex-1">
                <Text className="flex-1 text-white font-bold text-2xl self-end">
                  {mealOfDay.strMeal}
                </Text>
                <Image
                  source={{ uri: mealOfDay.strMealThumb }}
                  alt={mealOfDay.strMeal}
                  className="size-24 rounded-3xl"
                  contentFit="fill"
                />
              </View>
              <View className="flex-row justify-between mt-2 items-center">
                <View className="flex-row gap-2 items-center">
                  <View className="size-7 rounded-full bg-gray-400 border-gray-300 border-2" />
                  <Text className="text-xl text-gray-200">
                    {mealOfDay.strCategory}
                  </Text>
                </View>
                <Text className="text-xl text-gray-200">
                  {mealOfDay.strArea}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
        <View className="px-4 mt-5">
          <Text className="text-black dark:text-white text-2xl font-bold">
            Areas
          </Text>
          <Pressable>
            <Text className="self-end text-lg font-bold text-[#70b9be]">
              See All
            </Text>
          </Pressable>
        </View>
        {mealAreas && (
          <FlatList
            contentContainerClassName="gap-2 p-4"
            data={mealAreas}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            renderItem={renderMealAreaItem}
          />
        )}
        <View className="px-4 mt-5">
          <Text className="text-black dark:text-white text-2xl font-bold">
            Categories
          </Text>
          <Pressable>
            <Text className="self-end text-lg font-bold text-[#70b9be]">
              See All
            </Text>
          </Pressable>
        </View>
        {categories && (
          <FlatList
            contentContainerClassName="gap-4 p-4"
            data={categories}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            renderItem={renderCategoryItem}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
