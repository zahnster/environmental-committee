import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Heading } from "@twilio-paste/heading";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ id, index, title, description }) => {
  const descLinks = description
    ? description.replace(
        /(https*:\/\/\S*)/g,
        '<a href="$1" target="_blank">$1</a>'
      )
    : null;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box
          backgroundColor="colorBackgroundBody"
          borderWidth="borderWidth10"
          borderColor="colorBorder"
          borderStyle="solid"
          padding="space40"
          marginBottom="space40"
          wordBreak="break-word"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Heading as="h3" variant="heading40">
            {title}
          </Heading>
          <p dangerouslySetInnerHTML={{ __html: descLinks }} />
        </Box>
      )}
    </Draggable>
  );
};

export { Card };
