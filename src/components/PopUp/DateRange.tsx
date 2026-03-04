import React, { RefObject } from 'react';
import { queryParts } from '../QueryOutput/QueryContent'; // Import both
import '../PopUpStyles/DateRange.css';
import { useQueryOutput } from '../Contexts/QueryOutputContext';

interface DateRangePopUpProps {
    // whether the popup is visible
    show: boolean;
    // function to close the popup
    onClose: () => void;
    // start date value
    startDate: string;
    // function to update startDate
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    // end date value
    endDate: string;
    // function to update endDate
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const DateRangePopUp: React.FC<DateRangePopUpProps> = ({ show, onClose, startDate, setStartDate, endDate, setEndDate }) => {
    if (!show) return null; // Do not render the popup if `show` is false

    // access query context methods
    const { handleAddToQuery } = useQueryOutput();

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        // Update the "from" part of the query based on the startDate
        queryParts.from = 'from project_id.dataset_id.schemaA a';
    };

    const handleSubmit = () => {
        // Add the date condition to the first place in the array
        queryParts.where.unshift(`eff_dt between '${startDate}' and '${endDate}'`);
        handleAddToQuery();
        // close the popup
        onClose();
    };

    return (
        <div className="date-range">
            {/* Popup Content */}
            <div className="date-range-content">
                <p>Please enter the start date and end date:</p>
                <div>
                    <label>
                        Start :
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange} // Use the custom handler
                            className='startdate'
                        />
                    </label>
                </div>
                {/* A space between start date and end date */}
                <div className='space-before-enddate'>
                    <label>
                        End :
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className='enddate'
                        />
                    </label>
                </div>
                {/* Submit and Cancel buttons */}
                <div className='submit'>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DateRangePopUp;
