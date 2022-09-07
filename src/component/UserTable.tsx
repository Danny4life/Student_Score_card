import React, { useMemo } from "react";
// import { useTable, Column } from "react-table";
// import { IAdmins } from "./TableTypes";
import { Table, Tr, Th, Td } from "../styling/css"
import UserFormSelect from "./UserFormSelect";



type UserTableProp = {
  tableData: any;
}

const UserTable = (props:UserTableProp) => {
const {tableData} = props

    return (
      // <>
        <Table>
         <thead style={{ padding: '1rem 3rem' }}>
          <Th>Full Name</Th>
          <Th>Email</Th>
          <Th>Stack</Th>
          <Th>Squad</Th>
          <Th>Action</Th>
         </thead>
         <tbody>
          {
            tableData.map((user:any, index: number)=> (
              <Tr key={index}>
              <Td>{user.firstName} {user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.stack.name}</Td>
              <Td>SQ {user.squad}</Td>
              <Td><UserFormSelect key={index} id={user._id} /></Td>
            </Tr>)
            )}
            </tbody>
        </Table>
    );
}

export default UserTable;