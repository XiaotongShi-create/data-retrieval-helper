import React from 'react';
import '../SearchDataStyles/SearchData.css';
import { dataField } from '../DataDefinitions/SchemaADef';
import { getFilteredFields, SearchResult } from './SearchData';


/*
this component currently does not accept external props.
the interface is kept for future extensibility
*/
interface SearchBarProps {}

/*
a bar component that allows users to input their search query, 
and displays the matched results based on the input
*/
const SearchBar: React.FC<SearchBarProps> = ({}) => {
	const [searchQuery, setSearchQuery] = React.useState<string>("");
	const filteredFields = getFilteredFields(dataField, searchQuery);
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Search fields..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="search-bar-text"
			/>
			{filteredFields?.length > 0 && (
				<ul className="filteredFields">
					{/* prefer field.item.name over array index because it provides a more stable key */}
					{filteredFields.map((field, index) => (
						<SearchResult key={field.item?.name ?? index} field={field} />
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
