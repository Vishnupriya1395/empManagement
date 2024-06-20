import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const getEmployees = async () => {
    return await axios.get(API_URL);
};

export const createEmployee = async (employee) => {
    return await axios.post(API_URL, employee);
};

export const updateEmployee = async (id, employee) => {
    return await axios.put(`${API_URL}/${id}`, employee);
};

export const deleteEmployee = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
