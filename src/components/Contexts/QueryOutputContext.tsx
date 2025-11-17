import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { QueryUpdate } from '../DataDefinitions/Table1Def';
import { generateQuery, queryParts } from '../QueryOutput/QueryContent'; // Import both

// define the context interface using setter/getter pattern
export interface QueryOutputContextType {
  // get the current query
  getQuery: () => string;
  // get the position and dimensions of the QueryOutput component that is used in handling drag and drop
  getBoundingClientRect: () => DOMRect;
  // overwrite the current query
  setQuery: (query: string) => void;
  // add parts to the current query
  handleAddToQuery: (newPart?: QueryUpdate) => void;  // Changed to match function name
}

// create the empty context
const QueryOutputContext = createContext<QueryOutputContextType | undefined>(undefined);

// define the props for the Provider interface
interface QueryOutputProviderProps {
  // children components
  children: ReactNode;
  initialQuery?: string;
}

// define the Provider component
export const QueryOutputProvider: React.FC<QueryOutputProviderProps> = ({
  children,
  initialQuery = ''
}) => {
  // centralize the management of the query state in the Provider
  const [query, setQueryState] = useState<string>(initialQuery);
  // provide access to the positional information of the QueryOutput component
  const divRef = useRef<HTMLDivElement>(null);

  // a getter method to access the current query
  const getQuery = (): string => query;
  // a getter method to access the positional information of the QueryOutput component
  const getBoundingClientRect = (): DOMRect => {
    return divRef.current ? divRef.current.getBoundingClientRect() : new DOMRect();
  };
  // a setter method to overwrite the current query
  const setQuery = (newQuery: string): void => {
    setQueryState(newQuery);
  };
  // a method to add parts to the current query
  const handleAddToQuery = (newPart?: QueryUpdate): void => {
    if (newPart) {
      if (newPart.select) {
        // add new fields to the select array
        queryParts.select.push(newPart.select);
      }
      if (newPart.join) {
        // add new foreign tables to the join array
        queryParts.join.push(newPart.join);
      }
      if (newPart.where) {
        // add new conditions to the where array
        queryParts.where.push(newPart.where);
      }
      
      // generate the complete query string and update the query state
      const newQuery = generateQuery();
      setQueryState(newQuery);
    }
  };

  // package all the getter/setter methods into the context value
  // the Provider component requires a value prop
  const contextValue: QueryOutputContextType = {
    getQuery,
    getBoundingClientRect,
    setQuery,
    handleAddToQuery
  };

  return (
    <QueryOutputContext.Provider value={contextValue}>
      <div ref={divRef}>
        {children}
      </div>
    </QueryOutputContext.Provider>
  );
};

// define the hook to use the context
export const useQueryOutput = () => {
  const context = useContext(QueryOutputContext);
  if (context === undefined) {
    throw new Error('useQueryOutput must be used within a QueryOutputProvider');
  }
  return context;
};