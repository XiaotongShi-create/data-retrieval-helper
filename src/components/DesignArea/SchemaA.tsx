import React, { useState } from 'react';
import { dataField } from '../DataDefinitions/SchemaADef';
import { FaCalendarAlt } from 'react-icons/fa'; 
import SearchBar from '../SearchData/SearchBar';
import { getFilteredFields } from '../SearchData/SearchData'; // Import the filtering logic
import '../DesignAreaStyles/SchemaA.css';
import { useSchemaExplorer } from '../Contexts/SchemaExplorerContext';
import { useDesignArea } from '../Contexts/DesignAreaContext';
import { useQueryOutput } from '../Contexts/QueryOutputContext';

// this component appear after dragging the SchemaA from left area to right area
interface SchemaADesignAreaProps {
    // there is a calendar icon that when clicked, it will show the popup to enter date range
    onShowPopup: () => void;
    // the initial position of the table
    initialPosition: { x: number; y: number };
};

const SchemaADesignArea: React.FC<SchemaADesignAreaProps> = ({
    onShowPopup,
    initialPosition
}) => {
    // manage the state of the string users put int the search bar. initially an empty search query
    const [searchQuery, setSearchQuery] = useState('');
    // result of the matching fields using Fuse function
    const filteredFields = getFilteredFields(dataField, searchQuery);
    // manage the position of the table
    const [position, setPosition] = useState(initialPosition);
    // the screen has 3 main areas: DesignArea, SchemaExplorer, and QueryOutput
    // access methods to get positional information of these areas
    const { getBoundingClientRect: getDesignAreaRect } = useDesignArea();
    const { getBoundingClientRect: getSchemaExplorerRect } = useSchemaExplorer();
    const { getBoundingClientRect: getQueryOutputRect, handleAddToQuery } = useQueryOutput();

    // Same as in the SchemaA component
    // suppress the default drag icon by using an empty transparent image
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const transparentImage = new Image();
        transparentImage.src =
            'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAACADs=';
        event.dataTransfer.setDragImage(transparentImage, 0, 0);
    };

    // the box will move with the mouse before releasing the mouse button
    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        // Update position as the element is dragged
        if (event.clientX !== 0 && event.clientY !== 0) {
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        }
    };

    // decides the position of the table after the mouse button is released
    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        // Update position as the element is dragged
        if (event.clientX !== 0 && event.clientY !== 0) {
            // The table is only draggable within the upper right area
            if (getDesignAreaRect() && getQueryOutputRect()) {
                const rightArea = getDesignAreaRect();
                const lowerSpace = getQueryOutputRect();

                // Restrict the horizontal movement
                const newX = Math.min(
                    // the box width is 400px
                    Math.max(event.clientX, rightArea.left + 400),
                    rightArea.right - 400
                );
                // Restrict the vertical movement
                const newY = Math.min(
                    Math.max(event.clientY, rightArea.top - 400),
                    lowerSpace.top + 400
                );
                // update the position of the table
                setPosition({ x: newX, y: newY });
            }
        }
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="schemaA-design-area"
            style={{ left: position.x, top: position.y }}
        >
            {/* Header with the calendar button to select date range */}
            <div className="header">
                <h3 className="header">Please select fields by clicking on them</h3>
                <button className="calendar-button" onClick={onShowPopup}>
                    {FaCalendarAlt({})} {/* Explicitly render the icon */}
                </button>
            </div>

            {/* Search bar and filtered fields */}
            <div className='search-bar'>
                <SearchBar/>
            </div>

            {/* Scrollable content area */}
            <div className="scrollable-content">
                {Array.isArray(dataField) ? dataField.map((field, index) => (
                    <p className='field-item'
                        data-testid="field-item"
                        key={index}
                        onClick={() => handleAddToQuery(field.queryUpdate)}
                    >
                        {field.name}
                    </p>
                )) : null}
            </div>
        </div>
    );
};

export default SchemaADesignArea;
