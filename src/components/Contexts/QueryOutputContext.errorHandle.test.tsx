import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { useQueryOutput, QueryOutputProvider } from './QueryOutputContext';

// create a child component to use the hook
function TestChild() {
    useQueryOutput();
    return <div>Test</div>;
}

describe('useQueryOutput', () => {
    it('throws error if used outside QueryOutputProvider', () => {
        // useQueryOutput is a custom hook that uses useContext internally
        // renderHook returns an object with result and state
        const { result } = renderHook(() => useQueryOutput());
        expect(result.error).toEqual(
            // the error message defined in the context hook
            new Error('useQueryOutput must be used within a QueryOutputProvider')
        );
    });

    it('does not throw error if used inside QueryOutputProvider', () => {
        expect(() =>
            render(
                <QueryOutputProvider>
                    <TestChild />
                </QueryOutputProvider>
            )
        ).not.toThrow();
    });
});