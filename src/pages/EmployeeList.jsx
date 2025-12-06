import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import employeeService from '../services/employeeService';
import EmployeeFormModal from '../components/EmployeeFormModal';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await employeeService.getAllEmployees();
            setEmployees(data);
        } catch (error) {
            toast.error("Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee? This cannot be undone.")) return;

        try {
            await employeeService.deleteEmployee(id);
            toast.success("Employee deleted");
            loadEmployees();
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const openAddModal = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    const openEditModal = (emp) => {
        setEditingEmployee(emp);
        setIsModalOpen(true);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
                    <p className="text-gray-500">Create, Update, and Delete employees</p>
                </div>
                <button 
                    onClick={openAddModal}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <span>+</span> Add New Employee
                </button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(emp => (
                            <tr key={emp.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">{emp.employeeId}</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-800">{emp.name}</td>
                                <td className="px-6 py-4 text-sm"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Grade {emp.grade}</span></td>
                                <td className="px-6 py-4 text-sm text-gray-500">{emp.mobile}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {emp.bankAccount?.bankName} ({emp.bankAccount?.accountNumber})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => openEditModal(emp)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(emp.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {employees.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-500">No employees found. Click "Add New" to create one.</div>
                )}
            </div>

            {/* Modal Injection */}
            <EmployeeFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={loadEmployees}
                employeeToEdit={editingEmployee}
            />
        </div>
    );
};

export default EmployeeList;