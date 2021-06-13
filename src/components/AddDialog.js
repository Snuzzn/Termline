import { IconButton, useDisclosure } from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import EditableTask from "./EditableTask";
import React from "react";
import { MyContext } from "./context";
import AddModal from "./AddModal";
import { uniq } from "lodash";
import useSound from "use-sound";
import crispClick from "../sounds/crispClick.mp3";
import plup from "../sounds/plup.mp3";
var _ = require("lodash");

export default function AddDialog({ cells, setCellsToEdit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [task, setTask] = React.useState("");
  const [link, setLink] = React.useState("");
  const [value, setValue] = React.useState("");
  const { scheduleData, setScheduleData, courses } =
    React.useContext(MyContext);

  const [playPlup] = useSound(plup);
  const [playCrispClick] = useSound(crispClick);
  const addTask = (e) => {
    e.preventDefault();
    let copy = scheduleData.map((inner) => inner.slice());

    const uniqIndices = [...new Set(cells.map((cell) => cell.index))];

    uniqIndices.forEach((cell) => {
      const [x, y] = cell.split(",");
      if (link != "") {
        copy[x][y].push({
          text: task,
          code: value,
          link: link,
        });
      } else {
        copy[x][y].push({
          text: task,
          code: value,
        });
      }
    });
    setScheduleData(copy);

    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    setTask("");
    closeModal();
    playPlup();
  };

  const closeModal = () => {
    setCellsToEdit([]);
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={() => {
          onOpen();
          playCrispClick();
        }}
        icon={<MdAdd />}
        size="sm"
      >
        Add
      </IconButton>
      <AddModal
        task={task}
        setTask={setTask}
        value={value}
        setValue={setValue}
        addTask={addTask}
        onOpen={onOpen}
        isOpen={isOpen}
        closeModal={closeModal}
        link={link}
        setLink={setLink}
      />
    </>
  );
}
