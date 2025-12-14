import { useRef } from 'react';
import QueryOutput from './components/QueryOutput/QueryOutput';
import { QueryOutputProvider } from './components/Contexts/QueryOutputContext';
import { SchemaExplorerProvider } from './components/Contexts/SchemaExplorerContext';
import { DesignAreaProvider } from './components/Contexts/DesignAreaContext';
import './globals.css';

function App() {
    // there are three areas in the app: schema explorer, design area, and query output
    // SchemaExplorerRef is removed because it is now managed inside SchemaExplorerProvider
    const DesignAreaRef = useRef<HTMLDivElement>(null);
    const SchemaExplorerRef = useRef<HTMLDivElement>(null);
    
    return (
        // QueryOutputProvider is placed at the outermost level because 
        // SchemaExplorer and DesignArea need to modify the query when drag a schema, click a column, etc.
        <QueryOutputProvider>
            <div className="App">
                <div className="container">
                    <div className="schema-explorer">
                        {/* The Provider wraps the content and attaches its internal ref to a wrapper div */}
                        <SchemaExplorerProvider>
                            <h3>Which table do you want to query?</h3>
                        </SchemaExplorerProvider>
                    </div>
                    <div className="design-area">
                        {/* the ref is defined in the provider, */}
                        {/* so put provider here to attach it to the correct DOM element */}
                        <DesignAreaProvider>
                            <p>Please drag a table from the left over here</p>
                        </DesignAreaProvider>
                    </div>
                    <QueryOutput />
                </div>
            </div>
        </QueryOutputProvider> 
    );
}

export default App;