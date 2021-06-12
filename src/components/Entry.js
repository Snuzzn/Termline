import { Tag, Button } from "@chakra-ui/react";
import React from "react";

export default function Entry({ text, color, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Tag
        my="0.5em"
        mr="0.5em"
        size="md"
        key="sm"
        variant="solid"
        colorScheme={color}
        _hover={{ filter: "brightness(110%)" }}
      >
        {text}
      </Tag>
    </a>
  );
}
