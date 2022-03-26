import React from "react";
import { useToken } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./Pages/Home";
import Scan from "./Pages/Scan";

export type RootStackParamList = {
  Home: undefined;
  Scan: { show: Show };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Content = () => {
  const [primary, background, card, text, notification] = useToken("colors", [
    "primary.600",
    "dark.50",
    "dark.100",
    "light.100",
    "tertiary.500",
  ]);
  const theme = {
    dark: false,
    colors: {
      primary,
      background,
      card,
      text,
      border: "",
      notification,
    },
  };
  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              display: "none",
            },
          }}
        />
        <RootStack.Screen name="Scan" component={Scan} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
