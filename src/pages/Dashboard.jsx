import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import AddMoneyModal from '../components/AddMoneyModal'; 

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [companyBalance, setCompanyBalance] = useState(0);
  const [lowestBasic, setLowestBasic] = useState('');
  const [loading, setLoading] = useState(false);

  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const balanceRes = await api.get('/payroll/company/balance');
      setCompanyBalance(balanceRes.data.balance || 0);

      const empRes = await api.get('/employees');
      setEmployees(empRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const calculateEstimatedSalary = (grade) => {
    if (!lowestBasic) return 0;
    const base = parseFloat(lowestBasic);
    
    const increments = 6 - grade; 
    const basicSalary = base + (increments * 5000);
    
    // House Rent 20%, Medical 15% (Requirement)
    const houseRent = basicSalary * 0.20;
    const medical = basicSalary * 0.15;
    
    return basicSalary + houseRent + medical;
  };

  // Handle Pay Salary
  const handlePaySalary = async () => {
    if (!lowestBasic || lowestBasic <= 0) {
      toast.error("Please enter a valid Lowest Grade Basic Salary");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Processing Salary...");

    try {
      // Sending query param as per backend spec
      await api.post(`/payroll/pay-salary?lowestGradeBasic=${lowestBasic}`);
      
      toast.success("Salary Paid Successfully!", { id: toastId });
      fetchData(); // Refresh balances
    } catch (error) {
      // Requirement 10: If run out of money, show input option
      if (error.response && error.response.status === 400) {
        toast.error("Insufficient Company Funds!", { id: toastId });
        setShowAddMoneyModal(true); // Open the Modal
      } else {
        toast.error("Payment Failed", { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Salary Management</h1>
          <p className="text-gray-500">Company Account Balance:</p>
          <p className={`text-2xl font-mono font-bold ${companyBalance < 100000 ? 'text-red-600' : 'text-green-600'}`}>
            BDT {companyBalance.toLocaleString()}
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lowest Grade Basic (Tk)
            </label>
            <input 
              type="number" 
              className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 15000"
              value={lowestBasic}
              onChange={(e) => setLowestBasic(e.target.value)}
            />
          </div>
          <button 
            onClick={handlePaySalary}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Pay Salary'}
          </button>
        </div>
      </div>

      {/* Salary Sheet Table (Requirement 19: Display name, rank, salary) */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Bank Details</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Current Balance</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Est. Salary</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.employeeId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Grade {emp.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {emp.bankAccount?.bankName} <br/>
                  <span className="text-xs">{emp.bankAccount?.accountNumber}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-700">
                  {emp.bankAccount?.currentBalance.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-bold">
                  {lowestBasic ? calculateEstimatedSalary(emp.grade).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Insufficient Funds Modal  */}
      <AddMoneyModal 
        isOpen={showAddMoneyModal}
        onClose={() => setShowAddMoneyModal(false)}
        onSuccess={() => {
            fetchData(); 
        }}
      />

    </div>
  );
};

export default Dashboard;