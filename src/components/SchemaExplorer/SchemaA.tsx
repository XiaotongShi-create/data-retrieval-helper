import React, { useState, useEffect } from 'react';
import SchemaAContainer from '../SchemaExplorerStyles/SchemaA';
import { useSchemaExplorer } from '../Contexts/SchemaExplorerContext';
import { useDesignArea } from '../Contexts/DesignAreaContext';
import { useQueryOutput } from '../Contexts/QueryOutputContext';


interface SchemaAProps {
  // a function that updates the state of ShowPopup
  // to control the visibility of the popup window (in a sibling component);
  // states are initiated in the parent component SchemaAModule
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isInDesignArea: boolean;
  setIsInDesignArea: React.Dispatch<React.SetStateAction<boolean>>;
}

const SchemaA: React.FC<SchemaAProps> = ({
  setShowPopup,
  isInDesignArea,
  setIsInDesignArea
}) => {
    // the screen has 3 main areas: DesignArea, SchemaExplorer, and QueryOutput
    // access methods to get positional information of these areas
    const { getBoundingClientRect: getDesignAreaRect } = useDesignArea();
    const { getBoundingClientRect: getSchemaExplorerRect } = useSchemaExplorer();
    const { getBoundingClientRect: getQueryOutputRect } = useQueryOutput();
    
    // local state within the SchemaA component that will update immediately for smooth dragging
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // center the box in the SchemaExplorer on initial render
    useEffect(() => {
        if (getSchemaExplorerRect()) {
        // get the sizes and positions of the SchemaExplorer relative to the viewport
        const schemaExplorer = getSchemaExplorerRect();

        // define the initial position of the box
        const initialPosition = {
            x: schemaExplorer.width / 2 - 50,
            y: schemaExplorer.height / 2 - 50,
        };

      setPosition(initialPosition);
    } else {
      console.error("schemaExplorer is null");
    }
    }, [getSchemaExplorerRect]);

    // suppress the default drag icon by using an empty transparent image
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const transparentImage = new Image();
        transparentImage.src =
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        event.dataTransfer.setDragImage(transparentImage, 0, 0);
    };

    // the box will move with the mouse before releasing the mouse button
    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        // update position as the element is dragged
        if (event.clientX !== 0 && event.clientY !== 0) {
        setPosition({
            x: event.clientX,
            y: event.clientY,
        });
        }
    };

    // the box will stay at the drag end position if it's inside the DesignArea
    // otherwise it will move back to the initial position in the SchemaExplorer
    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        // check if SchemaExplorer, DesignArea, or QueryOutput is null
        if (!getSchemaExplorerRect || !getDesignAreaRect || !getQueryOutputRect) {
        console.error("SchemaExplorer, DesignArea, or QueryOutput is null.");
        }
        // get positional information of the SchemaExplorer, DesignArea, and QueryOutput relative to the viewport
        const designArea = getDesignAreaRect() ?? { width: 0, height: 0, x: 0, y: 0, top: 0, right: 0, bottom: 0, left: 0 };
        const schemaExplorer = getSchemaExplorerRect() ?? { width: 0, height: 0, x: 0, y: 0, top: 0, right: 0, bottom: 0, left: 0 };

        // Check if the drag end position is inside the DesignArea
        if (
        event.clientX >= designArea.left &&
        event.clientX <= designArea.right &&
        event.clientY >= designArea.top &&
        event.clientY <= designArea.bottom
        ) {
        // get the drag end position of the box
        const newPosition = {
            x: event.clientX,
            y: event.clientY,
        };
        // the box will stay at the drag end position
        setPosition(newPosition);
        // mark the box as being in the DesignArea
        // to inform other components like the popup window
        setIsInDesignArea(true);

        // on the first dragend, show the popup
        // check if we are transitioning from outside to inside
        if (!isInDesignArea) {
            setShowPopup(true);
        }
        } else {
        if (getSchemaExplorerRect()) {
            setPosition({
            // move back to the initial position
            // which is centered in the SchemaExplorer
            x: schemaExplorer.width / 2 - 50,
            y: schemaExplorer.height / 2 - 50,
            });
        } else {
            console.error("SchemaExplorer is null");
        }
        // Mark the box as not being in the DesignArea
        setIsInDesignArea(false);
        }
    };

    return (
        <SchemaAContainer
        x = {position.x}
        y = {position.y}
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        >
        Schema A
        </SchemaAContainer>
    );
};

export default SchemaA;