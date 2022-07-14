import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";

const Column = ({ column, tasks, innerRef }) => {
  return (
    <Box
      margin="space20"
      innerRef={innerRef}
      width="320px"
      display="flex"
      flexDirection="column"
    >
      <Box
        position="sticky"
        top="0"
        backgroundColor={column.id}
        padding="space40"
        // borderWidth="borderWidth10"
        // borderColor={column.id}
        // borderStyle="solid"
        borderTopLeftRadius="borderRadius20"
        borderTopRightRadius="borderRadius20"
      >
        <Text as="h3" fontSize="fontSize50" lineHeight="lineHeight60">
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
            backgroundColor={`${column.id}Weak`}
            // borderWidth="borderWidth10"
            // borderTopWidth="borderWidth0"
            // borderColor={column.id}
            // borderStyle="solid"
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
};

export { Column };
