import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import TabIcon from '@/app/components/layout/TabIcon'
import { icons } from '@/constants/icons'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          title: 'index',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          )
        }}
      />
    </Tabs>
  )
}