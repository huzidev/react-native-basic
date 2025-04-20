import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetch from '@/hooks/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(id as string));

  if (loading) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}