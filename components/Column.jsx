import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Heading } from "@twilio-paste/heading";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";

const Column = ({ column, tasks, innerRef }) => (
  <Box
    borderWidth="borderWidth10"
    borderColor="colorBorder"
    borderStyle="solid"
    margin="space20"
    innerRef={innerRef}
    width="320px"
    display="flex"
    flexDirection="column"
  >
    <Box
      position="sticky"
      top="0"
      backgroundColor="colorBackgroundBody"
      padding="space40"
      borderBottomStyle="solid"
      borderBottomWidth="borderWidth10"
      borderBottomColor="colorBorder"
    >
      <Text as="h3" fontSize="fontSize60" lineHeight="lineHeight60">
        {column.title}
      </Text>
    </Box>
    <Droppable droppableId={column.id}>
      {(provided) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
          flex="1"
          padding="space40"
        >
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
