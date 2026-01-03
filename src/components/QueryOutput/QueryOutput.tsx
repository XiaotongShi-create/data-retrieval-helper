'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useQueryOutput } from '../Contexts/QueryOutputContext';
import '../QueryOutputStyles/QueryOutput.css';

const QueryOutput = () => {
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
        </div>
    );
};

export default QueryOutput;