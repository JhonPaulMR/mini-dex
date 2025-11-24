// Learn more https://docs.expo.dev/guides/testing-with-jest/

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  useLocalSearchParams: jest.fn(() => ({})),
  useFocusEffect: jest.fn((callback) => callback()),
  Link: 'Link',
  Tabs: 'Tabs',
  Stack: 'Stack',
}));

// Mock action sheet
jest.mock('@expo/react-native-action-sheet', () => ({
  useActionSheet: jest.fn(() => ({
    showActionSheetWithOptions: jest.fn(),
  })),
  ActionSheetProvider: ({ children }) => children,
}));

// Mock expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

// Mock expo-asset
jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: jest.fn(),
  },
}));
