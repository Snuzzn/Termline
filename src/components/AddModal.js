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
  RadioGroup,
  Radio,
  FormControl,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import EditableTask from "./EditableTask";
import React from "react";
import { MyContext } from "./context";
import { uniq } from "lodash";
var _ = require("lodash");

export default function AddModal({
  task,
  setTask,
  value,
  setValue,
  link,
  setLink,
  addTask,
  onOpen,
  isOpen,
  closeModal,
}) {
  const handleChange = (event) => setTask(event.target.value);
  const { courses } = React.useContext(MyContext);
  const initialFoc = React.useRef();
  return (
    <Modal
      initialFocusRef={initialFoc}
      size="md"
      isOpen={isOpen}
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={addTask}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Task</FormLabel>
              <Input
                ref={initialFoc}
                placeholder="Assignment 9pm"
                value={task}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt="1em">
              <FormLabel>Course</FormLabel>
              <RadioGroup onChange={setValue}>
                <Stack>
                  {Object.keys(courses).map((key) => (
                    <Radio
                      mr="0.5em"
                      value={key}
                      colorScheme={courses[key]}
                      _hover={{ cursor: "pointer" }}
                      key={key}
                    >
                      {key}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mt="1em">
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="www.assignment-specification.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
