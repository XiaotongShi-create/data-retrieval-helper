// a utility for building SQL queries piece by piece
// allowing components to be added/modified dynamically before generating the final query string
interface QueryParts {
  select: string[];
  from: string;
  join: string[];
  where: string[];
  orderBy: string;
}

export const queryParts: QueryParts = {
  // default select clause
  select: [],
  // this is a string instead of an array because there is only one from clause
  from: 'from table_name_1',
  join: [],
  where: [],
  orderBy: ''
};

// function to generate the full query dynamically
export const generateQuery = (): string => {
  // join the strings in the select clause array with a new line
  const selectClause = queryParts.select.length > 1
    ? `select ${queryParts.select
        // if the field is the first field, don't add a comma at the front
        .map((field, index) => (index === 0 ? field : `, ${field}`))
        .join('')}`
    : `select ${queryParts.select}`;
  
  const joinClause = queryParts.join.length > 0 ? queryParts.join.join('\n') : '';
  // join conditions with "and"
  const whereClause = queryParts.where.length > 0 ? `where ${queryParts.where.join(' and ')}` : '';
  // include orderby if it exists
  const orderByClause = queryParts.orderBy ? `${queryParts.orderBy}` : '';
  
  // combine all parts into an array
  const queryPartsArray = [
    selectClause,
    queryParts.from,
    joinClause,
    whereClause,
    orderByClause
  ];
  
  // filter out empty strings and join the non-empty parts with newlines, and add a semicolon at the end
  return queryPartsArray.filter(part => part.trim() !== '').join('\n') + ';';
};