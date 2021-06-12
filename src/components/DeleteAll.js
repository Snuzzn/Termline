import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { MyContext } from "./context";
import generateTable from "./generateTable";

export default function DeleteAll() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setScheduleData } = React.useContext(MyContext);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const handleGlobalDelete = () => {
    localStorage.removeItem("scheduleData");
    const arr = generateTable();
    setScheduleData(arr);
    onClose();
  };
  return (
    <>
      <Button
        size="sm"
        mr="1em"
        colorScheme="red"
        onClick={() => setIsOpen(true)}
      >
        Delete all
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete All Tasks
            </AlertDialogHeader>

            <AlertDialogBody>
              This will remove ALL of your tasks (including unchecked). You
              can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleGlobalDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
