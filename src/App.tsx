import { useRef } from 'react';
import QueryOutput from './components/QueryOutput/QueryOutput';
import { QueryOutputProvider } from './components/Contexts/QueryOutputContext';
import { SchemaExplorerProvider } from './components/Contexts/SchemaExplorerContext';
import './globals.css';

function App() {
    // there are three areas in the app: schema explorer, design area, and query output
    // SchemaExplorerRef is removed because it is now managed inside SchemaExplorerProvider
    const DesignAreaRef = useRef<HTMLDivElement>(null);
    
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
                    <div className="design-area" ref={DesignAreaRef}>
                        <p>Please drag a table from the left over here</p>
                    </div>
                    <QueryOutput />
                </div>
            </div>
        </QueryOutputProvider> 
    );
}

export default App;