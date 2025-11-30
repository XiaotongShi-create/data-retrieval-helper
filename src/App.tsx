import { useRef } from 'react';
import QueryOutput from './components/QueryOutput/QueryOutput';
import { QueryOutputProvider } from './components/Contexts/QueryOutputContext';
import './globals.css';

function App() {
    // there are three areas in the app: schema explorer, design area, and query output
    const SchemaExplorerRef = useRef<HTMLDivElement>(null);
    const DesignAreaRef = useRef<HTMLDivElement>(null);
    
    return (
        <QueryOutputProvider>
            <div className="App">
                <div className="container">
                    <div className="schema-explorer" ref={SchemaExplorerRef}>
                        <h3>Which table do you want to query?</h3>
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