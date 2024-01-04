import { InitialState, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatListScreen } from "@app/chatList/ChatListScreen";
import { ChatDetailScreen } from "@app/chatDetail/ChatDetailScreen";
import { UserOrGroupDetailScreen } from "@app/userOrGroupDetail/UserOrGroupDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const SCREEN_OPTION = {
  headerShown: false,
};

const Stack = createStackNavigator<Navigation.RootStackParams>();

export const MainNavigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("navigationState");
        const state = savedState ? JSON.parse(savedState) : undefined;

        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);
  const persistNavigationState = async (state: InitialState | undefined) => {
    try {
      await AsyncStorage.setItem("navigationState", JSON.stringify(state));
    } catch (e) {
      // Handle AsyncStorage error
    }
  };

  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer initialState={initialState} onStateChange={persistNavigationState}>
      <Stack.Navigator initialRouteName="ChatListScreen" screenOptions={SCREEN_OPTION}>
        <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
        <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
        <Stack.Screen name="UserOrGroupDetailScreen" component={UserOrGroupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
