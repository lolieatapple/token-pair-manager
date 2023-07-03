'use client';
import React from 'react';
import { useDrag } from "react-dnd";

const DraggableItem = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

import { useDrop } from "react-dnd";

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item, monitor) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height: 200,
        width: 200,
        border: "1px dashed gray",
        backgroundColor: isOver ? "lightgreen" : "white",
      }}
    />
  );
};

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MyComponent() {
  const [droppedItem, setDroppedItem] = React.useState(null);

  const handleDrop = (id) => setDroppedItem(id);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DraggableItem id="item1">Drag me!</DraggableItem>
        <DropZone onDrop={handleDrop} />
      </div>
      {droppedItem && <p>You dropped: {droppedItem}</p>}
    </DndProvider>
  );
}


export default function Mainnet() {
  return <div>
    <MyComponent />
  </div>
}
