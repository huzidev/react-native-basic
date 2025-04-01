import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { fetchMovies } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/general/SearchBar";
import { useRouter } from "expo-router";
import MovieCard from "@/components/movie/MovieCard";

export default function index() {
  const { data, loading, error } = useFetch(() => fetchMovies(""));
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Error : {error?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Lates Movies
              </Text>

              <FlatList
                data={data}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
