import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

import { Flex, Heading } from "@chakra-ui/react";

function Loading(loading) {
  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {/* <BounceLoader color="#319795" loading={true} size="10em" /> */}
      <BounceLoader color="#319795" loading={loading} size="10em" />
      <Heading mt="1em" size="3xl">
        Termline
      </Heading>
    </Flex>
  );
}

export default Loading;
