import React from "react";
import { Button, Center, Flex, Heading } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./Pages/Home";
import Scan from "./Pages/Scan";

type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Content = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation, back }) => {
            return (
              <Flex
                w={"100%"}
                h={"100"}
                bgColor={"dark.100"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                pb={3}
                shadow={10}
              >
                <Heading color={"primary.500"} size={"2xl"}>
                  Usher
                </Heading>
                {back ? (
                  <Button onTouchEnd={navigation.goBack}>Back</Button>
                ) : null}
              </Flex>
            );
          },
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Scan" component={Scan} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
