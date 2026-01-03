import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryOutput from './QueryOutput';


// mock the query content so test can verify the output.
// QueryOutput gets the current query from QueryOutputContext
// by the calling getQuery() extracted from the hook useQueryOutput()
const mockUseQueryOutput = (query: string) => {
    // QueryOutput only uses the getQuery() function from the context, 
    // so we do not need to mock the other parts of the context, 
    // e.g. getBoundingClientRect or the Provider
    jest.mock('../Contexts/QueryOutputContext', () => ({
        // after the mock, the QueryOutput only has one export:
        // useQUeryOutput that returns an object with getQuery function
        useQueryOutput: () => ({
            getQuery: () => query,
        }),
    }));
};

describe('QueryOutput', () => {
    it('displays the current query from context', () => {
        mockUseQueryOutput('SELECT * FROM users;');
        const { getByText } = render(<QueryOutput />);
        expect(getByText('SELECT * FROM users;')).toBeInTheDocument();
    });

    it('displays fallback message when query is empty', () => {
        mockUseQueryOutput('');
        const { getByText } = render(<QueryOutput />);
        // the fallback message is defined in QueryOutput component
        expect(getByText('-- Your SQL query will appear here')).toBeInTheDocument();
    });
});