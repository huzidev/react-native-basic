import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>This is movie info page details page</Text>
    </View>
  );
}