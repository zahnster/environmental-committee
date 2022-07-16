import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@twilio-paste/box";
import { Button } from "@twilio-paste/button";
import { HelpText } from "@twilio-paste/help-text";
import { Input } from "@twilio-paste/input";
import { Label } from "@twilio-paste/label";
import { Text } from "@twilio-paste/text";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../../components/Column";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const url = process.env.SERVER_URL;
  const res = await fetch(`${url}/api/getAirtableRecords/${id}`);
  const data = await res.json();

  return {
    props: {
      url,
      data,
    },
  };
}

const IndexPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { url } = props;
  const [data, setData] = useState(props.data);
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [showError, setShowError] = useState(false);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // return if dragged somewhere irrelevant, or order didn't change
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // handles same-column resorting
    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    // moving from one col to another
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);

    // get column title
    const rank = data.columns[destination.droppableId].title;

    // send POST request to update Airtable
    await fetch(`${url}/api/updateAirtableRecord/${id}`, {
      method: "POST",
      body: JSON.stringify({
        rank,
        id: draggableId,
        userId: id,
      }),
    });
  };

  // check auth on hydration
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(`username_${id}`);

    if (loggedInUser) {
      setAuth(loggedInUser);
    }
  }, [auth]);

  const updateInput = (e) => {
    setPass(e.target.value);
    setShowError(false);
  };

  const handleAuth = async () => {
    const authAttempt = await fetch(`${url}/api/auth`, {
      method: "POST",
      body: JSON.stringify({
        username: id,
        password: pass,
      }),
    });

    const { authorized } = await authAttempt.json();

    if (authorized) {
      setAuth(authorized);
      window.localStorage.setItem(`username_${id}`, authorized);
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <Box backgroundColor="colorBackgroundBrand" padding="space40">
        <Text
          as="h1"
          fontSize="fontSize100"
          color="colorTextBrandInverse"
          padding="space40"
        >
          West St. Paul Environmental Committee
        </Text>
        <Text
          as="h2"
          fontSize="fontSize60"
          color="colorTextBrandInverse"
          padding="space40"
        >
          Voting Prioritization Card for {id}
        </Text>
      </Box>

      {auth ? (
        <Box display="flex" padding="space40">
          <DragDropContext onDragEnd={handleDragEnd}>
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.itemIds.map((itemId) => data.items[itemId]);

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </DragDropContext>
        </Box>
      ) : (
        <Box
          margin="0 auto"
          paddingX="space40"
          paddingY="space100"
          width="size50"
        >
          <Text as="p" marginBottom="space40">
            Hi {id}. Please enter your password to vote on our priorities!
          </Text>

          <Box as="form">
            <Box marginBottom="space60">
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={pass}
                onChange={updateInput}
                aria-describedby="password_help_text"
              />
              {showError ? (
                <HelpText id="password_help_text" variant="error">
                  The password you tried is incorrect. Try again?
                </HelpText>
              ) : null}
            </Box>

            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleAuth();
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default IndexPage;
