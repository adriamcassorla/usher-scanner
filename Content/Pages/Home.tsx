import { Flex, VStack, FormControl, Input, Button } from "native-base";
import KeyboardSpacer from "react-native-keyboard-spacer";
import React from "react";

const Home = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <Flex w="100%" h="100%" alignItems={"center"} bgColor={"dark.50"}>
      <VStack
        flex={1}
        w="90%"
        mx="3"
        maxW="330px"
        mb={100}
        justifyContent={"center"}
      >
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Name
          </FormControl.Label>
          <Input
            placeholder="John"
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          {"name" in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Submit
        </Button>
      </VStack>
      <KeyboardSpacer />
    </Flex>
  );
};

export default Home;
