import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Heading } from "@twilio-paste/heading";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ id, index, title, description, innerRef }) => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <Box
        backgroundColor="colorBackgroundBody"
        borderWidth="borderWidth10"
        borderColor="colorBorder"
        borderStyle="solid"
        padding="space40"
        marginBottom="space40"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Heading as="h3" variant="heading30">
          {title}
        </Heading>
        <Text as="p">{description}</Text>
      </Box>
    )}
  </Draggable>
);

export { Card };
