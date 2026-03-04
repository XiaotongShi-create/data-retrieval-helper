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
        name: "member_id",
        values: [], // General plan types
        description: "Member's unique identifier",
        queryUpdate: {
          select: "member_id",
          join: "",
          where: ""
        }
      },
      {
        name: "group_id",
        values: ["GRP001", "GRP002", "GRP003", "GRP004"], // Sample member IDs
        description: "Identifier for the member's group or employer",
        queryUpdate: {
          select: "group_id",
          join: "join project_id.dataset_id.group_table grp on a.member_id = grp.member_id",
          where: ""
        }
      },
      {
        name: "plan_type",
        values: ["HMO", "PPO", "EPO", "POS"], // General plan types
        description: "Type of health insurance plan",
        queryUpdate: {
          select: "plan_type",
          join: "join project_id.dataset_id.plan_table plan on a.member_id = plan.member_id",
          where: ""
        }
      }
];