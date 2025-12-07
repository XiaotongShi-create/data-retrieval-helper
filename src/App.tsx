import { useRef } from 'react';
import QueryOutput from './components/QueryOutput/QueryOutput';
import { QueryOutputProvider } from './components/Contexts/QueryOutputContext';
import { DesignAreaProvider } from './components/Contexts/DesignAreaContext';
import './globals.css';

function App() {
    // there are three areas in the app: schema explorer, design area, and query output
    const SchemaExplorerRef = useRef<HTMLDivElement>(null);
    
    return (
        <QueryOutputProvider>
            <div className="App">
                <div className="container">
                    <div className="schema-explorer" ref={SchemaExplorerRef}>
                        <h3>Which table do you want to query?</h3>
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