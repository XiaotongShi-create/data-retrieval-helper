import React, { RefObject, useState } from 'react';
import SchemaADesignArea from '../DesignArea/SchemaA';
import SchemaA from '../SchemaExplorer/SchemaA';
import DateRangePopUp from '../PopUp/DateRange';
import { useQueryOutput } from '../Contexts/QueryOutputContext';


interface SchemaAModuleProps {
  // the position of the schema container
  schemaAPosition: { x: number; y: number };
  // a state updater function that updates the state of SchemaAPosition
  setSchemaAPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const SchemaAModule: React.FC<SchemaAModuleProps> = ({
  schemaAPosition,
  setSchemaAPosition  
}) => {

  // Users have theb option to select start and end date for their query
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // the popup shows automatically only on the first time the box is in the right area
  // the further drag will not have the popup shows up
  // Track if popup has been shown
  const [hasShownPopup, setHasShownPopup] = useState(false);
  // there is a button on the SchemaA component that can show the popup
  // State to control popup visibility
  const [showPopup, setShowPopup] = useState(false);
  // the SchemaA is rendered only when they are not yet in the right area.
  // a failed drag that didn't drop the box in the right area will not render those components
  const [isInRightArea, setIsInRightArea] = useState(false);

  return (
    <>
      {/* SchemaA - the one only has Eligibility on it */}
      {!isInRightArea && (
        <SchemaA
          setShowPopup={setShowPopup}
          isInDesignArea={isInRightArea}
          setIsInDesignArea={setIsInRightArea}
        />
      )}

      {/* Large Box - the one has all the fields on it */}
      {isInRightArea && (
        <SchemaA
          setShowPopup={setShowPopup}
          isInDesignArea={isInRightArea}
          setIsInDesignArea={setIsInRightArea}
        />
      )}

      {/* Popup Component */}
      <DateRangePopUp
        show={showPopup}
        onClose={() => setShowPopup(false)} // Pass the close logic to the Popup component
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </>
  );
};

export default SchemaAModule;
