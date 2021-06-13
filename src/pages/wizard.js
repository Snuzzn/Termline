import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Center,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  IconButton,
  Spacer,
  Button,
  Text,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import AssessmentSchedule from "../components/AssessmentSchedule";
import React from "react";
import { MyContext } from "../components/context";
import { MdAdd } from "react-icons/md";
import Entry from "../components/Entry";
import generateTable from "../components/generateTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiConsoleController } from "react-icons/gi";
import { FiChevronDown } from "react-icons/fi";
import { navigate } from "gatsby";
import { useSpring, animated } from "react-spring";

export default function Wizard() {
  const {
    courses,
    setCourses,
    title,
    setTitle,
    scheduleData,
    startDate,
    setStartDate,
  } = React.useContext(MyContext);
  const [value, setValue] = React.useState("teal");
  const [course, setCourse] = React.useState("");
  const handleCourseChange = (e) => setCourse(e.target.value);
  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourses = { ...courses };
    newCourses[course] = value;
    setCourses(newCourses);
    setCourse("");
  };

  const removeCourse = (course) => {
    const newCourses = { ...courses };
    delete newCourses[course];
    setCourses(newCourses);
  };

  const toast = useToast();
  const handleSubmit = () => {
    if (title == "") {
      toast({
        position: "top",
        title: "No title added.",
        description: "Please create a title for your schedule",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (Object.keys(courses).length === 0) {
      toast({
        position: "top",
        title: "No course added.",
        description: "Please add one or more courses.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    generateTable();
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("startDate", JSON.stringify(startDate.toString()));

    navigate("/");
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref} rightIcon={<FiChevronDown />}>
      {value}
    </Button>
  ));
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  });

  return (
    <animated.div style={props}>
      <main>
        <Flex alignItems="center" justifyContent="center" h="100vh">
          <Box w="35em">
            <Heading size="xl">Create schedule</Heading>
            <Text fontSize="md" mb="1em" color="grey">
              This will overwrite any existing schedule.
            </Text>

            <FormControl mb="1.3em" isRequired>
              <FormLabel fontSize="1.35rem">Schedule Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Term 1"
              />
            </FormControl>
            <form>
              <Flex alignItems="center">
                <FormControl isRequired>
                  <FormLabel fontSize="1.3rem">Add Course</FormLabel>
                </FormControl>

                {/* <Spacer /> */}
                <IconButton
                  size="xs"
                  colorScheme="blue"
                  icon={<MdAdd />}
                  mb="0.5em"
                  type="submit"
                  onClick={handleAddCourse}
                />
              </Flex>
              <FormControl isRequired>
                <Input
                  value={course}
                  onChange={handleCourseChange}
                  type="text"
                  placeholder="COMP1111"
                  mb="0.5em"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Colour</FormLabel>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row" spacing="1em">
                    <Radio value="teal" colorScheme="teal">
                      Teal
                    </Radio>
                    <Radio value="blue" colorScheme="blue">
                      Blue
                    </Radio>
                    <Radio value="pink" colorScheme="pink">
                      Pink
                    </Radio>
                    <Radio value="purple" colorScheme="purple">
                      Purple
                    </Radio>
                    <Radio value="red" colorScheme="red">
                      Red
                    </Radio>
                    <Radio value="gray" colorScheme="gray">
                      Gray
                    </Radio>
                    <Radio value="yellow" colorScheme="yellow">
                      Yellow
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </form>
            {Object.keys(courses).length > 0 && (
              <HStack mt="1em">
                {Object.keys(courses).map((course, index) => (
                  <Tag
                    key={index}
                    variant="solid"
                    colorScheme={courses[course]}
                  >
                    <TagLabel>{course}</TagLabel>
                    <TagCloseButton onClick={() => removeCourse(course)} />
                  </Tag>
                ))}
              </HStack>
            )}

            <FormControl mb="1.3em" mt="1em">
              <FormLabel fontSize="1.35rem">Term Start Date</FormLabel>
              <Text fontSize="sm" mt="-0.5em" mb="1em" color="grey">
                This will be used to highlight the current day in the schedule.
              </Text>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(new Date(date.setHours(0, 0, 0, 0)));
                }}
                customInput={<ExampleCustomInput />}
              />
            </FormControl>

            <Flex>
              <Spacer />
              <Button colorScheme="teal" mt="2em" onClick={handleSubmit}>
                Done
              </Button>
            </Flex>
          </Box>
        </Flex>
      </main>
    </animated.div>
  );
}
