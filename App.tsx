import React from "react";
import { NativeBaseProvider } from "native-base";
import {Content} from './Content'
import theme from './Styles/theme'

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};
export default function App() {
  return (
  <NativeBaseProvider theme={theme}>
    <Content/>
  </NativeBaseProvider>)
}
