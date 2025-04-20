import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface TrendingCardProps {
    movieId: number
    title: string
    posterUrl: string
    index: number
}

export default function TrendingCard({ movieId, title, posterUrl, index }: TrendingCardProps) {
  return (
    <Link href={`/movie/${movieId}`} asChild>
        <TouchableOpacity className='w-32 relative pl-5'>

        </TouchableOpacity>
    </Link>
  )
}