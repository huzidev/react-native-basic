import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/movie/MovieCard';

export default function search() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data, 
    loading,
    error,
    refetch
  } = useFetch(() => fetchMovies(searchQuery), false); // default auto-fetch is false only run when user searches

  return (
    <View className='flex-1 bg-primary'>
      <Image 
        source={images.bg}
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList 
        data={data} 
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}

      />
    </View>
  )
}