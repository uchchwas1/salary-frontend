import api from './api';

const employeeService = {
    // Get all employees
    getAllEmployees: async () => {
        const response = await api.get('/employees');
        return response.data;
    },

    // Get single employee
    getEmployeeById: async (id) => {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    },

    // Create new employee
    createEmployee: async (employeeData) => {
        const response = await api.post('/employees', employeeData);
        return response.data;
    },

    // Update existing employee
    updateEmployee: async (id, employeeData) => {
        const response = await api.put(`/employees/${id}`, employeeData);
        return response.data;
    },

    // Delete employee
    deleteEmployee: async (id) => {
        const response = await api.delete(`/employees/${id}`);
        return response.data;
    }
};

export default employeeService;