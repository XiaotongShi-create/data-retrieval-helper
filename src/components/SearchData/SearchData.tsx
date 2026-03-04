import React from 'react';
import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
import '../SearchDataStyles/SearchData.css';
import { DataField } from '../DataDefinitions/SchemaADef';
import { useQueryOutput } from '../Contexts/QueryOutputContext';

// this function returns the dataField based on the input users put in the search bar using fuse.js
// Fuse.js is a fuzzy search library that allows to find matches between strings,
// even when the characters aren't exactly matched
export const getFilteredFields = (
    // all the data fields defined in SchemaADef.ts
    dataField: DataField[], 
    // the input users put in the search bar
    searchQuery: string
// FuseResult is a generic type defined in fuse.js
// when performing a search, Fuse.js returns an array of FuseResult<T> type,
// where T is the type of the items being searched, in this case DataField
): FuseResult<DataField>[] => {
    // return an empty array if nothing is typed in the search bar
    if (!searchQuery.trim()) {
        return [];
    }

    // each data field defined in SchemaADef.ts has 4 properties: name, values, description, and queryUpdate,
    // the property "name" and "description" are the name and description of the field,
    // the property "values" captures all possible values of the field, e.g. ["Commercial", "Medicare", "IFP"],
    // the property "queryUpdate" captures how the query will be updated when the field is clicked in the search results.
    // here we update the property "values" from a list of strings to a single string "combinedValues"
    const processedFields = dataField.map((field) => ({
        ...field,
        // combine the property "values" into a single string, 
        // e.g. from ["Commercial", "Medicare", "IFP"] to "Commercial Medicare IFP"
        combinedValues: field.values.join(" "),
    }));

    // The property "options" configures Fuse.js parameters for searching:
    // keys: an array that specifies the dataField to search, with their weights
    // name: the field to search
    // weight: the weight of the field
    // threshold: the threshold for the match accuracy
    // tokenize: true, split query into tokens for better matching
    // includeMatches: true, include match details in the results/
    // at last, we return the first 5 results
    const options = {
        keys: [
            { name: "combinedValues", weight: 0.4 },
            { name: "name", weight: 0.3 },
            { name: "description", weight: 0.3 },
        ],
        threshold: 0.3,
        tokenize: true,
        includeMatches: true,
    };

    // initialize Fuse with dataField and options
    const fuse = new Fuse(processedFields, options);
    // create an array that contains the search results
    const results = fuse.search(searchQuery);
    // return the first 5 results
    return results.slice(0, 5);
};

// this component renders search results
interface SearchResultProps {
    // each search result is a FuseResult of DataField type
    field: FuseResult<DataField>;
}

// this function takes field as a property, which is the match result for one field
/*
// ---------------------------------------------------------
// EXAMPLE: one item of 'field' property
// ---------------------------------------------------------
field = {
    item: {
        name: "plan_type",
        values: ["HMO", "PPO", "EPO", "POS"],
        description: "Type of health insurance plan",
        queryUpdate: 'plan_type:"HMO" OR plan_type:"PPO" OR plan_type:"EPO" OR plan_type:"POS"'
    },
    refIndex: 0,
    matches: [{
            indices: [[0, 2]],
            value: "plan_type",
            key: "name"
        },
        {
            indices: [[0, 2], [4, 6]],
            value: "HMO PPO EPO POS",
            key: "combinedValues"
        }]
}
// ---------------------------------------------------------
// END OF EXAMPLE   
// ---------------------------------------------------------
*/
export const SearchResult: React.FC<SearchResultProps> = ({ field }) => {
    // calling the hook to get the function that handles 
    // updating the query that is dsplayed in the QueryOutput component
    const { handleAddToQuery } = useQueryOutput();

    // this function defines the format of the match results that will be displayed on browser
    // it takes field.matches as a property, and returns a list of JSX elements
    // field is a FuseResult type object, that has the matches property
    const keyValuePairs = field.matches?.map((match) => {
        /*
        // ---------------------------------------------------------
        // EXAMPLE: the variable 'keyValuePairs' returned by this function
        // ---------------------------------------------------------
        keyValuePairs = [
            null, 
            <div key="Field Values" className="clickable-field">
                <span>Field Values: </span>
                ["", <strong key={0}>HMO</strong>, " ", <strong key={1}>PPO</strong>, " EPO POS"]
            </div>,
            <div key="Field Desc" className="clickable-field">
                <span>Field Desc: </span>
                ["Type of health insurance plan"]
            </div>
        ]
        // ---------------------------------------------------------
        // END OF EXAMPLES
        // ---------------------------------------------------------
        */

        // this sub function identifies letters in match.value that match the search query,
        // and highlights them by wrapping them in <strong> tags.
        // for example, if searching "lo Wo" in the text "Hello World Test",
        // then arr = [[3, 4], [6, 7]]
        // looping on items in that list will generate 2 iterations:
        // first iteration (i = 0): prevEnd = 0, start = 3, end = 4, acc = ["Hel", <strong>lo</strong>]
        // second iteration (i = 1): prevEnd = 5, start = 6, end = 7, acc = ["Hel", <strong>lo</strong>, " ", <strong>Wo</strong>]
        // now i meets the condition (i === arr.length - 1), so the "if block" adds the remaining part "rld Test" to acc
        // the final result is acc = ["Hel", <strong>lo</strong>, " ", <strong>Wo</strong>, "rld Test"]
        /*
        // ---------------------------------------------------------
        // EXAMPLE: the highlightedValue returned by the sub function following
        // ---------------------------------------------------------
        highlightedValue = [
            "",                          
            <strong key={0}>HMO</strong>, 
            " ",                         
            <strong key={1}>PPO</strong>, 
            " EPO POS"                   
            ]
        // ---------------------------------------------------------
        // END OF EXAMPLES
        // ---------------------------------------------------------
        */
        const highlightedValue = match.indices.reduce<React.ReactNode[]>((
            // accumulator array that holds the letter parts of the string
            acc,
            // an item of the array from match.indices, representing where matches were found
            [start, end],
            // index of the iteration
            i,
            // full array of match indices
            arr
        ) => {
            // prevEnd is getting the end of the previous match (or 0 for the first match)
            const prevEnd = i === 0 ? 0 : arr[i - 1][1] + 1;
            // extract the part from the end of the previous match, to the start of the current match
            // add this part to the result array acc
            acc.push(match.value?.slice(prevEnd, start));
            // bold the part of the match in the current iteration
            acc.push(<strong key={i}>{match.value?.slice(start, end + 1)}</strong>);
            // if the current iteration is the last match
            if (i === arr.length - 1) {
                // add the remaining part of the value to the result array acc
                acc.push(match.value?.slice(end + 1));
            }
            return acc;
        }, []);

        // combinedValues is the internal key for the field values (the constant processedFields in this file)
        // in displayKey, it is renamed with "Field Values"
        // same for the name and description
        const displayKey = match.key === "combinedValues" ? "Field Values" :
            match.key === "description" ? "Field Desc" :
            match.key;

        // the match cases with name key are ignored here,
        // because the field name is always displayed at the top level of each search result
        // which is handled in the code after this function
        if (match.key === "name") {
            return null;
        }

        // this function returns a JSX element for each match item
        return (
            <div
                key={displayKey}
                className="clickable-field"
                onClick={() => handleAddToQuery(field.item.queryUpdate)}
            >
                <span>{displayKey}: </span>
                {highlightedValue}
            </div>
        );
    });

    // the following JSX element is parallel to the above function,
    // it handles how the field name is displayed.
    // if any part of the field, i.e. values, description, is matched,
    // the field name will be displayed, even if the field name is not matched
    const fieldNameDisplay = (
        <div key="field_name">
            <span>Field Name: {field.item.name}</span>
        </div>
    );

    // this is a list of JSX elements returned by the SearchResult component
    // notice that the SearchResult takes one DataField at one time,
    // so the list of JSX elements in the element is for different matches 
    // within that one field, e.g. values, description
    return (
        <li
            className='render-list-item'
        >
            {fieldNameDisplay}
            {keyValuePairs}
        </li>
    );
};
