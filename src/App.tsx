import QueryOutput from './components/QueryOutput/QueryOutput';
import { QueryOutputProvider } from './components/Contexts/QueryOutputContext';
import { SchemaExplorerProvider, useSchemaExplorer } from './components/Contexts/SchemaExplorerContext';
import { DesignAreaProvider, useDesignArea } from './components/Contexts/DesignAreaContext';
import SchemaAModule from './components/Module/SchemaA';
import './globals.css';

// AppLayout is a child of all three providers so it can consume their context refs
// and attach them directly to the correct DOM elements
function AppLayout() {
    const { setElement: setSchemaExplorerElement } = useSchemaExplorer();
    const { setElement: setDesignAreaElement } = useDesignArea();

    return (
        <>
            <div className="App">
                <div className="container">
                    {/* Register this panel with SchemaExplorerContext via its setter */}
                    <div className="schema-explorer" ref={setSchemaExplorerElement}>
                        <h3>Which table do you want to query?</h3>
                    </div>
                    {/* Register this panel with DesignAreaContext via its setter */}
                    <div className="design-area" ref={setDesignAreaElement}>
                        <p>Please drag a table from the left over here</p>
                    </div>
                    <QueryOutput />
                </div>
            </div>
            {/* Rendered outside the layout so it can float over the page via position:absolute */}
            <SchemaAModule
                schemaAPosition={{ x: 0, y: 0 }}
                setSchemaAPosition={() => {}}
            />
        </>
    );
}

function App() {
    return (
        // All three providers are at the outermost level so every component
        // (including SchemaAModule) can access all three contexts
        <QueryOutputProvider>
            <SchemaExplorerProvider>
                <DesignAreaProvider>
                    <AppLayout />
                </DesignAreaProvider>
            </SchemaExplorerProvider>
        </QueryOutputProvider>
    );
}

export default App;