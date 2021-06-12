import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Button,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import EditableTask from "./EditableTask";
import React from "react";
import { MyContext } from "./context";
import { uniq } from "lodash";
var _ = require("lodash");

export default function EditOneDialog({ isOpen, setIsOpen, index, task }) {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const { scheduleData, setScheduleData, courses } =
    React.useContext(MyContext);
  const [taskValue, setTaskValue] = React.useState(task.text);
  const [value, setValue] = React.useState(task.code);
  const [link, setLink] = React.useState(task.link ? task.link : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    let copy = scheduleData.map((inner) => inner.slice());
    const [x, y] = index.split(",");
    copy[x][y].forEach((element, index) => {
      if (element.text == task.text && element.code == task.code) {
        element.text = taskValue;
        element.code = value;
        if (link != "") element.link = link;
      }
    });
    setScheduleData(copy);
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    closeModal();
  };

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
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired mb="1em">
              <FormLabel>Task</FormLabel>
              <Input
                ref={initialFoc}
                value={taskValue}
                type="text"
                onChange={(e) => setTaskValue(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Course</FormLabel>
            </FormControl>
            <FormControl isRequired>
              <RadioGroup defaultValue={value} onChange={setValue}>
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
            <Button type="submit">Make Changes</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
