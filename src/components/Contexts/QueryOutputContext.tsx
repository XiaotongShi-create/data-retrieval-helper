import React, { createContext, useContext } from 'react';
import { QueryUpdate } from '../DataDefinitions/Table1Def';

// Define the callbacks that will be provided by QueryOutput component
export interface QueryOutputContextType {
  // the function to add a new query part to the existing query
  handleAddToQuery: (newPart?: QueryUpdate) => void;
  // the function to get the size and its position relative to the viewport of the lower space
  getBoundingClientRect: () => DOMRect;
}

// initiate the container for sharing the callbacks globally
const QueryOutputContext = createContext<QueryOutputContextType | undefined>(undefined);

// the hook to use the context
export const useQueryOutput = () => {
  const context = useContext(QueryOutputContext);
  if (context === undefined) {
    throw new Error('useQueryOutput must be used within a QueryOutputProvider');
  }
  return context;
};

interface QueryOutputProviderProps {
  children: React.ReactNode;
  value: QueryOutputContextType;
}

// the QueryOutputProvider is now used within QueryOutput component to provide callbacks
export const QueryOutputProvider: React.FC<QueryOutputProviderProps> = ({
  children,
  value
}) => {
  return (
    <QueryOutputContext.Provider value={value}>
      {children}
    </QueryOutputContext.Provider>
  );
};