import { Tag, Button } from "@chakra-ui/react";
import React from "react";
import hoverPop from "../sounds/hoverPop.mp3";
import useSound from "use-sound";

export default function Entry({ text, color, link }) {
  const [play, { stop }] = useSound(hoverPop);

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
        onMouseEnter={() => {
          if (link) {
            play();
          }
        }}
      >
        {text}
      </Tag>
    </a>
  );
}
