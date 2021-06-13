import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Divider,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  IconButton,
  ButtonGroup,
  Spacer,
  RadioGroup,
  Radio,
  HStack,
  FormControl,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import EditableTask from "./EditableTask";
import React from "react";
import { MyContext } from "./context";
import { uniq } from "lodash";
import useSound from "use-sound";
import crispClick from "../sounds/crispClick.mp3";
import checkOff from "../sounds/checkOff.mp3";
var _ = require("lodash");

export default function EditDialog({ cells, setCellsToEdit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let listWithoutIndex = [];
  cells.forEach((cell) => {
    listWithoutIndex.push({ text: cell.text, code: cell.code });
  });
  let unique = [..._.uniqWith(listWithoutIndex, _.isEqual)];
  unique = unique.filter((element) => element.text != undefined);
  const [playCheckOff] = useSound(checkOff);
  const closeModal = () => {
    setCellsToEdit([]);
    onClose();
    playCheckOff();
  };

  const [playCrispClick] = useSound(crispClick);

  return (
    <>
      <Button
        mr="-px"
        onClick={() => {
          onOpen();
          playCrispClick();
        }}
        size="sm"
      >
        Edit
      </Button>
      <Modal size="md" isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Tasks</ModalHeader>
          <ModalCloseButton />
          {unique.length > 0 && (
            <ModalBody>
              {unique.map((item) => (
                <div key={item.text + item.code}>
                  <EditableTask
                    text={item.text}
                    code={item.code}
                    cells={cells}
                  />
                </div>
              ))}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
