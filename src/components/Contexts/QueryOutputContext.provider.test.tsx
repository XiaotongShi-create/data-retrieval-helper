import React from 'react';
import { render } from '@testing-library/react';
import { QueryOutputProvider, useQueryOutput } from './QueryOutputContext';

// a test child component to use the context
const TestChild: React.FC = () => {
    // call the hook to access context values
    // and extract the getQuery method
    const { getQuery } = useQueryOutput();
    // the value returned by getQuery will be rendered for assertion
    return <span data-testid="query">{getQuery()}</span>;
};

// test te provider correctly supplies context values to children
describe('QueryOutputProvider', () => {
  it('supplies context values to children', () => {
    const { getByTestId } = render(
        // initialQuery is an optional prop of the Provider
        <QueryOutputProvider initialQuery="test-query">
        <TestChild />
        </QueryOutputProvider>
    );
    expect(getByTestId('query').textContent).toBe('test-query');
  });
});