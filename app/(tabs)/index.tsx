import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import { fetchMovies } from '@/services/api'
import useFetch from '@/hooks/useFetch'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import SearchBar from '@/components/general/SearchBar'
import { useRouter } from 'expo-router'

export default function index() {
  const { data, loading, error } = useFetch(() => fetchMovies(''))
  const router = useRouter();

  console.log("what is data ", data);

  return (
    <View className='flex-1 bg-primary'>

      <Image 
        source={images.bg}
        className='absolute w-full z-0'
        resizeMode='cover'
      />

      <ScrollView 
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >

        <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

        <View>
          <SearchBar 
            onPress={() => router.push('/search')}
            placeholder="Search for a movie"
          />

          <>
            <Text className='text-lg text-white font-bold mt-5 mb-3'>
              Lates Movies
            </Text>

            <FlatList 
              data={data}
              renderItem={({ item }) => (
                <View className='bg-white rounded-lg p-4 mb-3'>
                  <Text className='text-black font-bold'>{item.title}</Text>
                  <Text className='text-gray-600'>{item.release_date}</Text>
                </View>
              )}
            />
          </>
        </View>
      </ScrollView>
    </View>
  )
} 