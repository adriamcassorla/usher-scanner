import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Flex,
  Heading,
  useToast,
  VStack,
  ZStack,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { validateTicket } from "../../Services/api";
import moment from "moment";
import { BlurView } from "expo-blur";

const Scan = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const toast = useToast();

  const { show } = route.params;
  const date = moment.unix(show.date / 1000).fromNow();

  // Get or check camera permission
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async (data: string) => {
    if (!scanned) {
      const ticket = await validateTicket(show.id, data);
      if (ticket === data) {
        toast.show({
          placement: "top",
          status: "success",
          title: "Validation successful",
          duration: 5000,
          mx: 10,
          mt: "50px",
        });
      } else {
        toast.show({
          placement: "top",
          status: "error",
          title: "Validation failed",
          description: ticket,
          duration: 10000,
          mx: 10,
          mt: "50px",
        });
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting access to camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Flex
      w={"full"}
      h={"80%"}
      mt={"10%"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <VStack alignItems={"flex-end"}>
        <Heading color={"light.100"}>{show.event.name}</Heading>
        <Text color={"light.400"} fontSize={"lg"}>
          {date}
        </Text>
      </VStack>
      <ZStack size={96}>
        <BarCodeScanner
          onBarCodeScanned={({ data }) => {
            setScanned(true);
            handleBarCodeScanned(data);
          }}
          style={{ width: "100%", height: "100%" }}
        />
        <BlurView
          style={{ width: "100%", height: "100%", zIndex: 2 }}
          intensity={scanned ? 90 : 0}
          tint={"dark"}
        ></BlurView>
      </ZStack>
      <Button size={"lg"} onPress={() => setScanned(false)}>
        Reset Scanner
      </Button>
    </Flex>
  );
};

export default Scan;
