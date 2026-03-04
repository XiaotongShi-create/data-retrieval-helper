import React, { createContext, useContext, useRef, ReactNode } from 'react';

// defines what the Context provides to its children
export interface DesignAreaContextType {
    // getter: returns the position and dimensions of the DesignArea panel
    getBoundingClientRect: () => DOMRect;
    // setter: registers the DesignArea DOM element — use as ref={setElement}
    setElement: (el: HTMLDivElement | null) => void;
  }

// create the empty context
const DesignAreaContext = createContext<DesignAreaContextType | undefined>(undefined);

// defines what the Provider Component accepts as props from its parent
interface DesignAreaProviderProps {
    children: ReactNode;
  }

// define the Provider component
export const DesignAreaProvider: React.FC<DesignAreaProviderProps> = ({ children }) => {
    // private ref — never exposed outside this provider
    const designAreaRef = useRef<HTMLDivElement | null>(null);

    // setter: called by the .design-area div via ref={setElement}
    const setElement = (el: HTMLDivElement | null): void => {
      designAreaRef.current = el;
    };

    // getter: returns the bounding rect of the registered element
    const getBoundingClientRect = (): DOMRect => {
      return designAreaRef.current ? designAreaRef.current.getBoundingClientRect() : new DOMRect();
    };
  
    const contextValue: DesignAreaContextType = {
      getBoundingClientRect,
      setElement
    };
  
    return (
      <DesignAreaContext.Provider value={contextValue}>
        {children}
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