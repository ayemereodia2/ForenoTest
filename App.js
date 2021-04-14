import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { UserProvider, withAuth } from "./context/auth";
import routes from "./utils/routes";
import { RootSiblingParent } from "react-native-root-siblings";
import "./utils/firebase";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Router = (props) => {
  useEffect(() => {
  }, []);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {props.auth.isSignedIn
        ? routes.protected.map(({ title, component: Component, options }) => (
            <Stack.Screen
              key={title}
              name={title}
              component={withAuth(Component)}
            />
          ))
        : routes.public.map(({ title, component: Component, options }) => (
            <Stack.Screen
              key={title}
              name={title}
              component={withAuth(Component)}
            />
          ))}
    </Stack.Navigator>
  );
};

const RouterWithAuth = withAuth(Router);

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <UserProvider>
          <RouterWithAuth />
        </UserProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
