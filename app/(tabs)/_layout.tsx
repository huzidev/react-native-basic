import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import TabIcon from '@/components/layout/TabIcon'
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
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: styles.tabBar,
      }}
    >
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

const styles = StyleSheet.create({
  tabBarItem: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#0F0D23",
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 36,
    height: 52,
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0F0D23",
  },
});