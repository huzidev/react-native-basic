import { View, Text } from "react-native";
import React from "react";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

export default function MovieInfo({ label, value }: MovieInfoProps) {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 text-sm font-normal">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
}
