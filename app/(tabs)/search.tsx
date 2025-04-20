import SearchBar from '@/components/general/SearchBar';
import MovieCard from '@/components/movie/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

export default function search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies(searchQuery), false); // default auto-fetch is false only run when user searches

  // Debounced search effect so we don't call the API on every keystroke
  // This will wait for 500ms after the user stops typing before calling the API
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeout)
  }, [searchQuery]);


  useEffect(() => {
    if (!!data?.length && data?.[0]) {
      updateSearchCount(searchQuery, data[0]);
    }
  }, [data])

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={data}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={(v: string) => setSearchQuery(v)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && !!data?.length && (
              <Text className="text-xl text-white font-bold px-5 my-3">
                Search results for "{searchQuery}"
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5">
              <Text className="text-xl text-white font-bold px-5 my-3">
                {searchQuery.trim()
                  ? `No results found for "${searchQuery}"`
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}