import {
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import Entry from "./Entry";
import React from "react";
import { MyContext } from "./context";
import crumple from "../sounds/crumple.mp3";
import useSound from "use-sound";
import editClick from "../sounds/editClick.mp3";

var _ = require("lodash");

export default function EditableTask({ text, code, cells }) {
  const { scheduleData, setScheduleData } = React.useContext(MyContext);
  const [value, setValue] = React.useState(text);
  const [prev, setPrev] = React.useState(text);

  const [playCrumple] = useSound(crumple);
  const [playEditClick] = useSound(editClick);

  const handleEdit = () => {
    let copy = scheduleData.map((inner) => inner.slice());
    cells.forEach((cell) => {
      if (cell.text == text && cell.code == code) {
        const [x, y] = cell.index.split(",");
        copy[x][y].forEach((element) => {
          if (element.text == prev && cell.code == code) {
            element.text = value;
            setPrev(value);
          }
        });
      }
      setScheduleData(copy);
    });
    playEditClick();
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
  };
  const handleDelete = () => {
    let copy = scheduleData.map((inner) => inner.slice());

    const removedList = cells.filter(
      (item) => item.text === text && item.code === code
    );
    removedList.forEach((element) => {
      const [x, y] = element.index.split(",");

      copy[x][y].forEach((element, index) => {
        if (element.text == text && element.code == code) {
          copy[x][y].splice(index, 1);
        }
      });
    });
    setScheduleData(copy);
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));

    var removed = _.remove(cells, function (element) {
      return (
        (element.text === text && element.code === code) ||
        element.text == undefined
      );
    });
    playCrumple();
  };

  const handleChange = (event) => setValue(event);
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<AiOutlineCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<AiOutlineClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <>
        <IconButton
          ml="1em"
          size="sm"
          icon={<MdEdit />}
          {...getEditButtonProps()}
        />
        <IconButton
          ml="0.5em"
          size="sm"
          icon={<MdDelete />}
          onClick={handleDelete}
        />
      </>
    );
  }

  return (
    <Editable
      value={value}
      onChange={handleChange}
      onSubmit={handleEdit}
      defaultValue={text}
      fontSize="lg"
      isPreviewFocusable={false}
    >
      <EditablePreview mb="0.5em" />
      <EditableInput mb="0.5em" />
      <EditableControls />
    </Editable>
  );
}
