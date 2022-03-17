import { Flex, VStack, FormControl, Input } from "native-base";
import React from "react";

const Home = () => {
  const [formData, setData] = React.useState({});
  return (
    <Flex h={"100%"} w={"100%"} bgColor={"dark.50"}>
      <VStack width="90%" mx="3" maxW="300px">
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              bold: true,
              color: "light.50",
              fontSize: "3xl",
              mb: "-10",
            }}
          >
            Welcome!
          </FormControl.Label>
          <FormControl.HelperText
            _text={{
              mb: "5",
              fontSize: "sm",
            }}
          >
            Show ID should contain 16 characters.
          </FormControl.HelperText>
          <Input
            placeholder="Show ID:"
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: "sm",
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </Flex>
  );
};

export default Home;
