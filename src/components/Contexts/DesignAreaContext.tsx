import React, { createContext, useContext, useRef, ReactNode } from 'react';

// defines what the Context provides to its children
export interface DesignAreaContextType {
    // get the position and dimensions of the DesignArea component
    getBoundingClientRect: () => DOMRect;
  }

// create the empty context
const DesignAreaContext = createContext<DesignAreaContextType | undefined>(undefined);

// defines what the Provider Component accepts as props from its parent
interface DesignAreaProviderProps {
    children: ReactNode;
  }

// define the Provider component
export const DesignAreaProvider: React.FC<DesignAreaProviderProps> = ({ children }) => {
    // create refs for the desgin area
    const designAreaRef = useRef<HTMLDivElement>(null);
  
    // getter for DesignArea postional information
    const getBoundingClientRect = (): DOMRect => {
      return designAreaRef.current ? designAreaRef.current.getBoundingClientRect() : new DOMRect();
    };
  
    const contextValue: DesignAreaContextType = {
      getBoundingClientRect
    };
  
    return (
      <DesignAreaContext.Provider value={contextValue}>
        <div ref={designAreaRef}>
          {children}
        </div>
      </DesignAreaContext.Provider>
    );
  };

// define the hook to use the context
export const useDesignArea = () => {
    const context = useContext(DesignAreaContext);
    if (context === undefined) {
      throw new Error('useDesignArea must be used within a DesignAreaProvider');
    }
    return context;
  };