export interface QueryUpdate {
  // if the DataField gets selected
  // the string will be added to the end of the select clause in the query
  select: string;
  // if the DataField gets selected
  // the string will be added to the end of the join clause in the query
  join: string;
  // if the DataField gets selected
  // the string will be added to the end of the where clause in the query
  where: string;
}

export interface DataField {
  // the name of the DataField
  name: string;
  // all possible values of the DataField
  values: string[];
  // the description of the DataField
  description: string;
  // how to update the query when the DataField gets selected
  queryUpdate: QueryUpdate;
}

// the dataField that are available to be selected
export const dataField: DataField[] = [
    {
        name: "group_id",
        values: ["GRP001", "GRP002", "GRP003", "GRP004"], // Sample member IDs
        description: "Unique identifier for a health plan member",
        queryUpdate: {
          select: "member_id",
          join: "foreign_table_where_member_id_comes_from mem on main.member_id = mem.member_id",
          where: ""
        }
      },
      {
        name: "plan_type",
        values: ["HMO", "PPO", "EPO", "POS"], // General plan types
        description: "Type of health insurance plan",
        queryUpdate: {
          select: "plan_type",
          join: "foreign_table_where_plan_type_comes_from plan on main.member_id = plan.member_id",
          where: ""
        }
      }
];