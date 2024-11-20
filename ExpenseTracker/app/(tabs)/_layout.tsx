import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from '@/context/UserContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Finances',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cash' : 'cash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: 'Recommendations',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
          />
    <Tabs.Screen
        name="notifications"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'} color={color} />
          ),
        }}
          />
    <Tabs.Screen
        name="settings"
        options={{
          title: 'User',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ApiTestScreen"
              options={{
                  //href: null, //uncomment/comment this line to make this tab appear/disappear
          title: 'API Test',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'flask' : 'flask-outline'} color={color} />
          ),
        }}
       />
       <Tabs.Screen
            name="index"
            options={{
            href: null,
        }}
          />
          <Tabs.Screen
              name="GoalsScreen"
              options={{
                  href: null,
              }}
          />
          <Tabs.Screen
              name="ExpensesScreen"
              options={{
                  href: null,
              }}
          />
          <Tabs.Screen
              name="ProfileScreen"
              options={{
                  href: null,
              }}
          />
    </Tabs>
</UserProvider>
  );
}

//Nates
/*
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="WelcomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="GoalsScreen"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ExpensesScreen"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
*/
