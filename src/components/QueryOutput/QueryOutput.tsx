'use client';

import { useEffect } from 'react';
import { generateQuery } from './QueryContent'; // Import generateQuery
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useQueryOutput } from '../Contexts/QueryOutputContext';
import '../QueryOutputStyles/QueryOutput.css';

interface QueryOutputProps {
    // the optional children prop allows other components to be nested inside QueryOutput
    children?: React.ReactNode;
}

const QueryOutput = ({ children }: QueryOutputProps) => {
    // access query context methods
    const { getQuery } = useQueryOutput();

    // get the current query from context
    const currentQuery = getQuery();

    return (
        <div className="query-output">
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
                        {currentQuery || '-- Your SQL query will appear here'}
                    </SyntaxHighlighter>
                </div>
            </div>
            {children}
        </div>
    );
};

export default QueryOutput;