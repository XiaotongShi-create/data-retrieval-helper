'use client';

import { useState, useRef } from 'react';
import { queryParts, generateQuery } from './QueryContent'; // Import queryParts and generateQuery
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { QueryUpdate } from '../DataDefinitions/Table1Def'; // Import QueryUpdate type
import { QueryOutputProvider } from '../Contexts/QueryOutputContext';
import '../QueryOutputStyles/QueryOutput.css';

interface QueryOutputProps {
    children?: React.ReactNode;
}

const QueryOutput = ({ children }: QueryOutputProps) => {
    // State to track the text in the coding text space
    const [codeText, setCodeText] = useState('');
    const divRef = useRef<HTMLDivElement>(null);

    // Function to append query parts to the existing query
    const handleAddToQuery = (newParts?: QueryUpdate) => {
        if (newParts) {
            // Update the queryParts object
            if (newParts.select) {
                // the query content is separated into different parts
                // including select, join, where, etc.
                // Add new fields to the select array
                queryParts.select.push(newParts.select);
            }
            if (newParts.join) {
                queryParts.join.push(newParts.join);
            }
            if (newParts.where) {
                queryParts.where.push(newParts.where);
            }
        }

        // Generate the complete query string
        const newQuery = generateQuery();
        setCodeText(newQuery);
    };

    // function to get the bounding client rect of the QueryOutput
    const getBoundingClientRect = (): DOMRect => {
        return divRef.current ? divRef.current.getBoundingClientRect() : new DOMRect();
    }

    return (
        <QueryOutputProvider value={{ handleAddToQuery, getBoundingClientRect }}>
            <div 
                ref={divRef}
                className="query-output"
            >
                {/* Tab Header */}
                <div className="tab">
                    <button className="tab-name">
                        Query
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    <div>
                        <SyntaxHighlighter 
                            language="sql"
                            className="custom-style"
                        >
                            {codeText || '-- Your SQL query will appear here'}
                        </SyntaxHighlighter>
                    </div>
                </div>
                {children}
            </div>
        </QueryOutputProvider>
    );
};

export default QueryOutput;