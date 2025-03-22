import { images } from "@/constants/images";
import { ImageBackground, Image, Text, View } from "react-native";

export default function TabIcon({ focused, icon, title }: any) {
  return (
    focused ? (
        <ImageBackground 
            source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
            <Image source={icon} tintColor="#151312" className="size-5" />
            <Text>{title}</Text>
        </ImageBackground>
        ) : (
        <View>
            <Image source={icon} />
        </View>
    )
  );
}
