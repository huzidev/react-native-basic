import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { fetchMovies } from '@/services/api'
import useFetch from '@/hooks/useFetch'
import { icons } from '@/constants/icons'

export default function index() {
  const { data, loading, error } = useFetch(() => fetchMovies(''))

  return (
    <View className='flex-1 bg-primary'>
      <ScrollView 
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >

        <Image source={icons.logo} />

      </ScrollView>
    </View>
  )
} 