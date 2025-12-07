import React, { createContext, useContext, useRef, ReactNode } from 'react';

export interface SchemaExplorerContextType {
  // get the position and dimensions of the SchemaExplorer component
  getBoundingClientRect: () => DOMRect;
}

// create the empty context
const SchemaExplorerContext = createContext<SchemaExplorerContextType | undefined>(undefined);

// define the props for the Provider interface
interface SchemaExplorerProviderProps {
  children: ReactNode;
}

// define the Provider component
export const SchemaExplorerProvider: React.FC<SchemaExplorerProviderProps> = ({ children }) => {
  // create refs for the schema explorer
  const schemaExplorerRef = useRef<HTMLDivElement>(null);

  // getter for SchemaExplorer rect
  const getBoundingClientRect = (): DOMRect => {
    return schemaExplorerRef.current ? schemaExplorerRef.current.getBoundingClientRect() : new DOMRect();
  };

  const contextValue: SchemaExplorerContextType = {
    getBoundingClientRect
  };

  return (
    <SchemaExplorerContext.Provider value={contextValue}>
      <div ref={schemaExplorerRef}>
        {children}
      </div>
    </SchemaExplorerContext.Provider>
  );
};

// define the hook to use the context
export const useSchemaExplorer = () => {
  const context = useContext(SchemaExplorerContext);
  if (context === undefined) {
    throw new Error('useSchemaExplorer must be used within a SchemaExplorerProvider');
  }
  return context;
};