import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [activeTab, setActiveTab] = useState('home');
    const [isEdit, setIsEdit] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const authenticated = localStorage.getItem('authenticated');
        if (authenticated !== 'true') {
            navigate('/login');
        } else {
            loadEmployees();
        }
    }, [navigate]);

    const loadEmployees = async () => {
        try {
            const result = await getEmployees();
            setEmployees(result.data);
        } catch (error) {
            console.error('Error loading employees:', error);
        }
    };

    const handleEdit = (employee) => {
        if (!employee) {
            setForm({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                gender: '',
                courses: [],
                image: ''
            });
            setIsEdit(false);
            setCurrentEmployeeId(null);
            setActiveTab('create');
            return;
        }
        setForm({
            name: employee.name,
            email: employee.email,
            mobile: employee.mobile,
            designation: employee.designation,
            gender: employee.gender,
            courses: employee.courses,
            image: employee.image
        });
        setIsEdit(true);
        setCurrentEmployeeId(employee._id);
        setActiveTab('create');
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            loadEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateEmployee(currentEmployeeId, form);
                setIsEdit(false);
                setCurrentEmployeeId(null);
            } else {
                await createEmployee(form);
            }
            loadEmployees();
            setForm({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                gender: '',
                courses: [],
                image: ''
            });
            setActiveTab('employees');
        } catch (error) {
            console.error('Error creating/updating employee:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <header>
                <p>
                <img src="images/logo.png" alt="logo"height={110} width={110}/>
                </p>
                <h1>Welcome Admin Panel</h1>
                
            </header>
            <nav>
                <button onClick={() => setActiveTab('home')}>Home</button>
                <button onClick={() => setActiveTab('employees')}>Employee List</button>
                <button onClick={() => setActiveTab('create')}>Create Employee</button>
                <button onClick={() => navigate('/logout')}>Logout</button>
            </nav>

            {activeTab === 'employees' && (
                <EmployeeList
                    employees={employees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {activeTab === 'create' && (
                <EmployeeForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    isEdit={isEdit}
                />
            )}
        </div>
    );
};

export default Dashboard;
