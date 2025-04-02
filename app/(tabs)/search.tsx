import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/movie/MovieCard';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/general/SearchBar';

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
    }, 500);

    return () => clearTimeout(timeout)
  }, [searchQuery]);

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
          !loading && !error && !data?.length ? (
            <View className="mt-10 px-5">
              <Text className="text-xl text-white font-bold px-5 my-3">
                No results found for "{searchQuery}"
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}