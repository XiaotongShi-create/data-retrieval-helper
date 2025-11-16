import React, { useRef } from 'react';
import QueryOutput from './components/QueryOutput/QueryOutput';
import './globals.css';

function App() {
    const APIEndPoint = "https://d31d96jtmy1k9d.cloudfront.net";
    const SchemaExplorerRef = useRef<HTMLDivElement>(null);
    const DesignAreaRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="App">
            <div className="container">
                <div className="schema-explorer" ref={SchemaExplorerRef}>
                    <h3>Which table do you want to query?</h3>
                </div>
                <div className="design-area" ref={DesignAreaRef}>
                    <p>Please drag a table from the left over here</p>
                </div>
                <QueryOutput>
                    
                </QueryOutput>
            </div>
        </div>
    );
}

export default App;