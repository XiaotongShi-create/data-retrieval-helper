import React, { createContext, useContext, useRef, ReactNode } from 'react';

export interface SchemaExplorerContextType {
  // getter: returns the position and dimensions of the SchemaExplorer panel
  getBoundingClientRect: () => DOMRect;
  // setter: registers the SchemaExplorer DOM element — use as ref={setElement}
  setElement: (el: HTMLDivElement | null) => void;
}

// create the empty context
const SchemaExplorerContext = createContext<SchemaExplorerContextType | undefined>(undefined);

// define the props for the Provider interface
interface SchemaExplorerProviderProps {
  children: ReactNode;
}

// define the Provider component
export const SchemaExplorerProvider: React.FC<SchemaExplorerProviderProps> = ({ children }) => {
  // private ref — never exposed outside this provider
  const schemaExplorerRef = useRef<HTMLDivElement | null>(null);

  // setter: called by the .schema-explorer div via ref={setElement}
  const setElement = (el: HTMLDivElement | null): void => {
    schemaExplorerRef.current = el;
  };

  // getter: returns the bounding rect of the registered element
  const getBoundingClientRect = (): DOMRect => {
    return schemaExplorerRef.current ? schemaExplorerRef.current.getBoundingClientRect() : new DOMRect();
  };

  const contextValue: SchemaExplorerContextType = {
    getBoundingClientRect,
    setElement
  };

  return (
    <SchemaExplorerContext.Provider value={contextValue}>
      {children}
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