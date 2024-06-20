import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <p>Total Employees: {employees.length}</p>
            <button onClick={() => onEdit(null)}>Create Employee</button> {/* This line should correctly trigger form reset if needed */}
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Employee Image</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={employee.image} alt={employee.name} height={50} width={50} />
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td><button onClick={() => onEdit(employee)}>Edit</button></td>
                            <td><button onClick={() => onDelete(employee._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
