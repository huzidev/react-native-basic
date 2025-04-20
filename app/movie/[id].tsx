import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetch from '@/hooks/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data, loading, error } = useFetch(() => fetchMovieDetails(id as string));

  if (loading) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

      </ScrollView>
    </View>
  );
}