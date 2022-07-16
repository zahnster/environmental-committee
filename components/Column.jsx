import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";

const Column = ({ column, tasks }) => {
  return (
    <Box margin="space20" width="320px" display="flex" flexDirection="column">
      <Box
        position="sticky"
        top="0"
        backgroundColor={column.id}
        padding="space40"
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
          >
            {tasks.map((task, index) => {
              return (
                <Card
                  key={task.id}
                  index={index}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  parOverlap={task.parOverlap}
                />
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export { Column };
