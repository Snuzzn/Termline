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
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import EditableTask from "./EditableTask";
import React from "react";
import { MyContext } from "./context";
import AddModal from "./AddModal";
import { Item } from "react-contexify";
import { uniq } from "lodash";

var _ = require("lodash");

export default function AddOneDialog({ index, isOpen, setIsOpen }) {
  const { onClose } = useDisclosure();

  const [task, setTask] = React.useState("");
  const [link, setLink] = React.useState("");

  const [value, setValue] = React.useState("");
  const { scheduleData, setScheduleData, courses } =
    React.useContext(MyContext);

  const addTask = (e) => {
    e.preventDefault();
    let copy = scheduleData.map((inner) => inner.slice());
    const [x, y] = index.split(",");
    if (link != "") copy[x][y].push({ text: task, code: value, link: link });
    else copy[x][y].push({ text: task, code: value });
    setScheduleData(copy);

    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    setTask("");
    closeModal();
  };

  const closeModal = () => {
    onClose();
    setIsOpen(false);
  };

  return (
    <>
      <AddModal
        task={task}
        setTask={setTask}
        value={value}
        setValue={setValue}
        addTask={addTask}
        isOpen={isOpen}
        closeModal={closeModal}
        link={link}
        setLink={setLink}
      />
    </>
  );
}
