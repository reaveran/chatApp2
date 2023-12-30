import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatListScreen } from "@app/chatList/ChatListScreen";
import { ChatDetailScreen } from "@app/chatDetail/ChatDetailScreen";
import { UserOrGroupDetailScreen } from "@app/userOrGroupDetail/UserOrGroupDetail";

const SCREEN_OPTION = {
  headerShown: false,
};

const Stack = createStackNavigator<Navigation.RootStackParams>();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatListScreen" screenOptions={SCREEN_OPTION}>
        <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
        <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
        <Stack.Screen name="UserOrGroupDetailScreen" component={UserOrGroupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
