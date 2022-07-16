import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Heading } from "@twilio-paste/heading";
import { Flex } from "@twilio-paste/flex";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ id, index, title, description, parOverlap }) => {
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
          backgroundColor="card"
          borderWidth="borderWidth10"
          borderColor="colorBorder"
          borderStyle="solid"
          borderRadius="borderRadius20"
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
          {parOverlap ? (
            <Flex vAlignContent="center">
              <Flex marginRight="space10">
                <span
                  style={{ color: "rgb(14, 124, 58)" }}
                  class="material-symbols-outlined"
                >
                  nature_people
                </span>
              </Flex>
              <Flex grow>
                <Text
                  as="p"
                  fontWeight="fontWeightBold"
                  color="colorTextSuccess"
                >
                  Parks & Rec Overlap
                </Text>
              </Flex>
            </Flex>
          ) : null}
          <p dangerouslySetInnerHTML={{ __html: descLinks }} />
        </Box>
      )}
    </Draggable>
  );
};

export { Card };
