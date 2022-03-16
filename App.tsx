import React from "react";
import { NativeBaseProvider } from "native-base";

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};
export default function App() {
  return <NativeBaseProvider></NativeBaseProvider>;
}
