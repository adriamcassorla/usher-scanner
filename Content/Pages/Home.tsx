import { Flex, VStack, FormControl, Input, Button } from "native-base";
import KeyboardSpacer from "react-native-keyboard-spacer";
import React, { useState } from "react";
import { NavigationRouteContext } from "@react-navigation/native";
import { validateShow } from "../../Services/api";

const Home = ({ navigation }) => {
  const [formData, setData] = useState({ id: "" });
  const [errors, setErrors] = useState({ id: "" });
  const [show, setShow] = useState<Show | null>(null);

  const validate = async () => {
    if (!formData.id) {
      setErrors({ ...errors, id: "Show ID is required" });
      return false;
    }
    if (formData.id.length < 36) {
      setErrors({ ...errors, id: "ID must be 36 characters long" });
      return false;
    }
    const show = await validateShow(formData.id);
    if (typeof show === "string") {
      setErrors({ ...errors, id: show });
      return false;
    }
    if (show.id === formData.id) {
      setShow(show);
      navigation.navigate("Scan", { show: show });
      return true;
    }
    setErrors({ ...errors, id: "Internal error, please, try again later." });
    return false;
  };

  const onSubmit = async () => {
    await validate();
  };

  return (
    <Flex
      w="100%"
      h="100%"
      justifyContent={"flex-end"}
      alignItems={"center"}
      bgColor={"dark.50"}
    >
      <VStack
        flex={1}
        w="90%"
        h={"80%"}
        mx="3"
        maxW="330px"
        mb={100}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <FormControl isInvalid={"id" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
              color: "light.300",
              fontSize: "3xl",
            }}
          >
            Welcome to Usher!
          </FormControl.Label>
          <Input
            bg="transparent"
            borderColor="transparent"
            borderBottomColor="light.400"
            size="xl"
            placeholder="Show ID:"
            onChangeText={(value) => setData({ ...formData, id: value })}
          />
          {"id" in errors ? (
            <FormControl.ErrorMessage>{errors.id}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Please, enter a valid Show
            </FormControl.HelperText>
          )}
        </FormControl>
        <Button
          onPress={onSubmit}
          mt={16}
          size="lg"
          w={"50%"}
          colorScheme="primary"
        >
          Submit
        </Button>
      </VStack>
      <KeyboardSpacer topSpacing={-100} />
    </Flex>
  );
};

export default Home;
