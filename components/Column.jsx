import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/heading";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";

const Column = ({ column, tasks, innerRef }) => (
  <Box
    borderWidth="borderWidth10"
    borderColor="colorBorder"
    borderStyle="solid"
    paddingX="space40"
    paddingTop="space40"
    margin="space10"
    innerRef={innerRef}
    width="320px"
    overflow="scroll"
    display="flex"
    flexDirection="column"
  >
    <Heading as="h3" variant="heading30">
      {column.title}
    </Heading>
    <Droppable droppableId={column.id}>
      {(provided) => (
        <Box {...provided.droppableProps} ref={provided.innerRef} flex="1">
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              id={task.id}
              index={index}
              title={task.title}
              description={task.description}
            />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </Box>
);

export { Column };
