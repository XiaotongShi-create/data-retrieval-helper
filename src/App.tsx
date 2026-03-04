import { useRef } from 'react';
import QueryOutput from './components/QueryOutput/QueryOutput';
import { QueryOutputProvider } from './components/Contexts/QueryOutputContext';
import { SchemaExplorerProvider } from './components/Contexts/SchemaExplorerContext';
import { DesignAreaProvider } from './components/Contexts/DesignAreaContext';
import SchemaAModule from './components/Module/SchemaA';
import './globals.css';

function App() {


    
    return (
        // All three providers are placed at the outermost level because
        // SchemaAModule needs access to all three contexts
        <QueryOutputProvider>
            <SchemaExplorerProvider>
                <DesignAreaProvider>
                    <div className="App">
                        <div className="container">
                            <div className="schema-explorer">
                                <h3>Which table do you want to query?</h3>
                            </div>
                            <div className="design-area">
                                <p>Please drag a table from the left over here</p>
                            </div>
                            <QueryOutput />
                        </div>
                    </div>
                    <SchemaAModule
                        schemaAPosition={{ x: 0, y: 0 }}
                        setSchemaAPosition={() => {}}
                    />
                </DesignAreaProvider>
            </SchemaExplorerProvider>
        </QueryOutputProvider>
    );
}

export default App;