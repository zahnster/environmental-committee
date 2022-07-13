import { useState } from "react";
import { useRouter } from "next/router";
import { Heading } from "@twilio-paste/heading";
import { Box } from "@twilio-paste/box";
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

  return (
    <>
      <Heading as="h1" variant="heading10">
        West St. Paul Environmental Committee
      </Heading>
      <Heading as="h2" variant="heading20">
        Voting Prioritization Card for {id}
      </Heading>

      <Box display="flex">
        <DragDropContext onDragEnd={handleDragEnd}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.itemIds.map((itemId) => data.items[itemId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </DragDropContext>
      </Box>
    </>
  );
};

export default IndexPage;
