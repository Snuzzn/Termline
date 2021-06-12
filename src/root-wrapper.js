import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { MyProvider, MyContext } from "./components/context";
import { theme } from "./theme";

export const wrapPageElement = ({ element }) => (
  <MyProvider>
    <ChakraProvider theme={theme} resetCSS>
      {element}
    </ChakraProvider>
  </MyProvider>
);
