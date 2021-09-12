import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Center,
  Box,
  Tag,
  Heading,
  Flex,
  Spacer,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
  useColorMode,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import Entry from "./Entry";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi";
import { FaFileDownload } from "react-icons/fa";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import EditDialog from "./EditDialog";
import { MyContext } from "./context";
import DeleteAll from "./DeleteAll";
import AddDialog from "./AddDialog";
import { isEmpty } from "lodash";
import useSound from "use-sound";
import bubbleClick from "../sounds/bubbleClick.mp3";
import contextClick from "../sounds/contextClick.mp3";
import switchClick from "../sounds/switchClick.mp3";
import crumple from "../sounds/crumple.mp3";
import crispClick from "../sounds/crispClick.mp3";
import checkOn from "../sounds/checkOn.mp3";
import checkOff from "../sounds/checkOff.mp3";
import { GiStarShuriken, GiNorthStarShuriken } from "react-icons/gi";
import EditOneDialog from "./EditOneDialog";
import AddOneDialog from "./AddOneDialog";
import { Menu, Item, useContextMenu, animation, theme } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { navigate } from "gatsby";
const MENU_ID = "menu-id";
const MENU_ID2 = "menu-id2";

export default function AssessmentSchedule() {
  const [edit, setEdit] = React.useState(false);
  const [cellsToEdit, setCellsToEdit] = React.useState([]);
  const { scheduleData, setScheduleData, courses, title, startDate } =
    React.useContext(MyContext);

  const [playCheckOn] = useSound(checkOn);
  const [playCheckOff] = useSound(checkOff);
  const addCellToEdit = (info, index) => {
    if (cellsToEdit.some((cell) => cell.index == index)) {
      const newList = cellsToEdit.filter((cell) => cell.index != index);
      setCellsToEdit(newList);
      playCheckOff();
    } else {
      let newList = [...cellsToEdit];
      info.forEach((item) => {
        let { text, code } = item;
        newList.push({ index: index, text: text, code: code });
      });
      setCellsToEdit(newList);
      playCheckOn();
    }
  };
  const finishChanges = () => {
    setCellsToEdit([]);
    setEdit(false);
    playButton();
  };
  const checkTick = (index) => {
    if (cellsToEdit.some((cell) => cell.index == index)) {
      return true;
    } else {
      return false;
    }
  };
  const { colorMode, toggleColorMode } = useColorMode();

  const [editAllowed, setEditAllowed] = React.useState(false);
  //   console.log(cellsToEdit);
  React.useEffect(() => {
    if (cellsToEdit.length == 0) {
      setEditAllowed(false);
    }
    for (var element of cellsToEdit) {
      if (element.text) {
        setEditAllowed(true);
        return;
      }
    }
    setEditAllowed(false);
  }, [cellsToEdit.length]);

  var currDate = new Date();
  var firstDate = startDate;
  var daysDiff =
    (currDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24);

  const todayRow = Math.floor(daysDiff / 7);
  const todayColumn = Math.floor(daysDiff % 7);

  const { show } = useContextMenu();

  const [playCrispClick] = useSound(crispClick);

  const [isEditOne, setIsEditOne] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState("");
  const [editTask, setEditTask] = React.useState({});
  function handleEditOne({ props }) {
    const [index, task] = props;
    playCrispClick();
    setIsEditOne(true);
    setEditIndex(index);
    setEditTask(task);
  }

  const [playCrumple] = useSound(crumple);
  function handleDeleteOne({ props }) {
    playCrumple();
    const [index, task] = props;
    let copy = scheduleData.map((inner) => inner.slice());
    const [x, y] = index.split(",");
    copy[x][y].forEach((element, index) => {
      if (element.text == task.text && element.code == task.code) {
        copy[x][y].splice(index, 1);
      }
    });
    setScheduleData(copy);
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
  }

  const [playContextClick] = useSound(contextClick);
  function displayMenu(e, index, task) {
    e.stopPropagation();
    playContextClick();
    show(e, { props: [index, task], id: MENU_ID });
  }
  function displayMenu2(e, index) {
    playContextClick();
    show(e, { props: [index], id: MENU_ID2 });
  }
  const [isAddOne, setIsAddOne] = React.useState(false);
  const [addIndex, setAddIndex] = React.useState("");
  function handleAddOne({ props }) {
    const [index] = props;
    playCrispClick();

    setIsAddOne(true);
    setAddIndex(index);
  }

  const highlight = useColorModeValue("#E8EEFA", "#1B222F");
  const hoverColor = useColorModeValue("#EFF1F6", "#1C2431");

  const [playToggle] = useSound(switchClick);
  const [playButton] = useSound(bubbleClick);
  const toggleClick = () => {
    localStorage.setItem("chakra-ui-color-mode", JSON.stringify(colorMode));

    toggleColorMode();
    playToggle();
  };

  return (
    <Center>
      <Box w="80%" mt="5em" mb="5em">
        <Flex alignItems="center">
          <Heading color={colorMode === "light" && "#101725"} mb="0.5em">
            {title}
          </Heading>
          <Spacer />

          {edit ? (
            <>
              <ButtonGroup isAttached>
                {editAllowed && (
                  <EditDialog
                    cells={cellsToEdit}
                    setCellsToEdit={setCellsToEdit}
                  />
                )}
                {cellsToEdit.length >= 1 && (
                  <AddDialog
                    cells={cellsToEdit}
                    setCellsToEdit={setCellsToEdit}
                  />
                )}
              </ButtonGroup>

              {/* <DeleteAll /> */}
              <Button size="sm" mr="1em" ml="1em" onClick={finishChanges}>
                Finish Changes
              </Button>
            </>
          ) : (
            <>
              {colorMode === "dark" ? (
                <Tooltip label="Toggle Light Mode">
                  <IconButton
                    onClick={toggleClick}
                    size="sm"
                    mr="1em"
                    icon={<IoSunnySharp />}
                  />
                </Tooltip>
              ) : (
                <Tooltip label="Toggle Dark Mode">
                  <IconButton
                    onClick={toggleClick}
                    size="sm"
                    mr="1em"
                    icon={<IoMoon />}
                  />
                </Tooltip>
              )}

              <Tooltip label="Create new schedule">
                <IconButton
                  onClick={() => {
                    playButton();
                    navigate("/wizard");
                  }}
                  size="sm"
                  mr="1em"
                  icon={<HiSparkles />}
                />
              </Tooltip>
              <Tooltip label="Make changes">
                <IconButton
                  onClick={() => {
                    setEdit(true);
                    playButton();
                  }}
                  size="sm"
                  mr="1em"
                  icon={<AiFillEdit />}
                />
              </Tooltip>
            </>
          )}
          {Object.keys(courses).map((code) => (
            <Entry key={code} text={code} color={courses[code]} />
          ))}
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr bg={colorMode === "dark" ? "#101725" : "#859bc3"}>
              <Th color="white">Week</Th>
              <Th color="white">Monday</Th>
              <Th color="white">Tuesday</Th>
              <Th color="white">Wednesday</Th>
              <Th color="white">Thursday</Th>
              <Th color="white">Friday</Th>
              <Th color="white">Saturday</Th>
              <Th color="white">Sunday</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scheduleData.map((row) => (
              <Tr key={scheduleData.indexOf(row) + 1}>
                <Td color={colorMode === "light" && "#101725"}>
                  {scheduleData.indexOf(row) + 1}
                </Td>
                {row.map((cell, index) => (
                  <Td
                    key={index}
                    //     borderWidth={
                    //       todayRow == scheduleData.indexOf(row) &&
                    //       todayColumn == row.indexOf(cell) &&
                    //       "0.15em"
                    //     }
                    onContextMenu={(e) =>
                      displayMenu2(
                        e,
                        scheduleData.indexOf(row) + "," + row.indexOf(cell)
                      )
                    }
                    _hover={{ cursor: "pointer", backgroundColor: hoverColor }}
                    backgroundColor={
                      todayRow == scheduleData.indexOf(row) &&
                      todayColumn == row.indexOf(cell) &&
                      highlight
                    }
                  >
                    <Flex direction="column">
                      {/* {!edit &&
                        todayRow == scheduleData.indexOf(row) &&
                        todayColumn == row.indexOf(cell) && (
                          <Flex alignItems="center" mr="0.5em">
                            <GiStarShuriken />
                          </Flex>
                        )} */}
                      {cell.map((task, index) => (
                        <div
                          key={index}
                          onContextMenu={(e) =>
                            displayMenu(
                              e,
                              scheduleData.indexOf(row) +
                                "," +
                                row.indexOf(cell),
                              task
                            )
                          }
                        >
                          {task.text && (
                            <Entry
                              text={task.text}
                              color={courses[task.code]}
                              link={task.link}
                            />
                          )}
                        </div>
                      ))}

                      {edit && (
                        <Checkbox
                          size="lg"
                          onChange={() =>
                            addCellToEdit(
                              scheduleData[scheduleData.indexOf(row)][
                                row.indexOf(cell)
                              ],
                              scheduleData.indexOf(row) +
                                "," +
                                row.indexOf(cell)
                            )
                          }
                          isChecked={checkTick(
                            scheduleData.indexOf(row) + "," + row.indexOf(cell)
                          )}
                        />
                      )}
                    </Flex>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Week</Th>
              <Th>Monday</Th>
              <Th>Tuesday</Th>
              <Th>Wednesday</Th>
              <Th>Thursday</Th>
              <Th>Friday</Th>
              <Th>Saturday</Th>
              <Th>Sunday</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <Menu
        id={MENU_ID}
        animation={animation.fade}
        theme={colorMode === "dark" ? theme.dark : theme.light}
      >
        <Item onClick={handleEditOne}>Edit</Item>
        <Item onClick={handleDeleteOne}>Remove</Item>
      </Menu>
      <Menu
        id={MENU_ID2}
        theme={colorMode === "dark" ? theme.dark : theme.light}
      >
        <Item onClick={handleAddOne}>Add</Item>
      </Menu>
      {isEditOne && (
        <EditOneDialog
          isOpen={isEditOne}
          setIsOpen={setIsEditOne}
          index={editIndex}
          task={editTask}
        />
      )}
      {isAddOne && (
        <AddOneDialog
          isOpen={isAddOne}
          setIsOpen={setIsAddOne}
          index={addIndex}
        />
      )}
    </Center>
  );
}
