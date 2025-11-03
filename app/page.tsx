'use client';

import './globals.css';
import { useRef, RefObject } from 'react';
import QueryOutput from '../components/QueryOutput/QueryOutput';

function App() {
    const APIEndPoint = "https://d31d96jtmy1k9d.cloudfront.net";
    const SchemaExplorerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null); // Reference to the left area
    const DesignAreaRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null); // Reference to the right area
    return (
        <div className="App">
            <div className="container">
                <div className="schema-explorer" ref={SchemaExplorerRef}>
                    <h3>Which table do you want to query?</h3>
                    {/* Schema content will go here */}
                </div>
                <div className="design-area" ref={DesignAreaRef}>
                    <p>Please drag a table from the left over here</p>
                    {/* Design area content will go here */}
                </div>
                <QueryOutput>
                    
                </QueryOutput>

            </div>
        </div>
    );
}

export default App;