import { Stack } from 'expo-router';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Colors from '../constants/Colors';

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.dark.background },
          headerTintColor: Colors.dark.text,
          headerTitleStyle: { color: Colors.dark.text, fontWeight: '600' },
          contentStyle: { backgroundColor: Colors.dark.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            title: 'Pokémon Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </ActionSheetProvider>
  );
}