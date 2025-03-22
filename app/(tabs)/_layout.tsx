import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import TabIcon from '@/app/components/layout/TabIcon'
import { icons } from '@/constants/icons'

const tabs = [
  {
    name: 'index',
    title: 'Home',
    icon: icons.home,
  },
  {
    name: 'search',
    title: 'Search',
    icon: icons.search,
  },
  {
    name: 'save',
    title: 'Save',
    icon: icons.save,
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: icons.person,
  },
]

export default function TabsLayout() {
  return (
    <Tabs>
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icon} title={title} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}