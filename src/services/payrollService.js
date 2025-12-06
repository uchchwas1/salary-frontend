import api from './api';

const payrollService = {
    // Get current company balance 
    getCompanyBalance: async () => {
        const response = await api.get('/payroll/company/balance');
        return response.data;
    },

    // Process Salary Payment (Input: Lowest Grade Basic) 
    paySalary: async (lowestGradeBasic) => {
        // Passing as query parameter
        const response = await api.post(`/payroll/pay-salary?lowestGradeBasic=${lowestGradeBasic}`);
        return response.data;
    },

    // Add money if funds are insufficient [cite: 10]
    addMoney: async (amount) => {
        const response = await api.post('/payroll/company/add-money', { amount });
        return response.data;
    }
};

export default payrollService;