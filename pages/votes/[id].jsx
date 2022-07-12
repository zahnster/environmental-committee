import { useState } from "react";
import { useRouter } from "next/router";
import { Heading } from "@twilio-paste/heading";
import { Box } from "@twilio-paste/box";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../../components/Column";

const exampleData = {
  items: {
    item1: {
      id: "item1",
      title: "Title 1",
      description: "Description 1",
    },
    item2: {
      id: "item2",
      title: "Title 2",
      description: "Description 2",
    },
  },
  columns: {
    column1: {
      id: "column1",
      title: "Unprioritized",
      itemIds: ["item1", "item2"],
    },
    column2: {
      id: "column2",
      title: "Highest Priority (limit to 1-2 entries)",
      itemIds: [],
    },
    column3: {
      id: "column3",
      title: "High Priority",
      itemIds: [],
    },
    column4: {
      id: "column4",
      title: "Medium Priority",
      itemIds: [],
    },
    column5: {
      id: "column5",
      title: "Low Priority",
      itemIds: [],
    },
    column6: {
      id: "column6",
      title: "Should Not Prioritize",
      itemIds: [],
    },
  },
  columnOrder: [
    "column1",
    "column2",
    "column3",
    "column4",
    "column5",
    "column6",
  ],
};

const IndexPage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  // todo: get real data from airtable
  const [data, setData] = useState(exampleData);

  const handleDragEnd = (result) => {
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
