import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import employeeService from '../services/employeeService';

const EmployeeFormModal = ({ isOpen, onClose, onSuccess, employeeToEdit }) => {
    // Initial State
    const initialFormState = {
        employeeId: '', name: '', grade: 6, address: '', mobile: '',
        accountType: 'Savings', accountName: '', accountNumber: '', bankName: '', branchName: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    // Effect: Load data if editing, otherwise reset
    useEffect(() => {
        if (employeeToEdit) {
            setFormData({
                employeeId: employeeToEdit.employeeId,
                name: employeeToEdit.name,
                grade: employeeToEdit.grade,
                address: employeeToEdit.address,
                mobile: employeeToEdit.mobile,
                accountType: employeeToEdit.bankAccount?.accountType || 'Savings',
                accountName: employeeToEdit.bankAccount?.accountName || '',
                accountNumber: employeeToEdit.bankAccount?.accountNumber || '',
                bankName: employeeToEdit.bankAccount?.bankName || '',
                branchName: employeeToEdit.bankAccount?.branchName || ''
            });
        } else {
            setFormData(initialFormState);
        }
    }, [employeeToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (employeeToEdit) {
                // UPDATE
                await employeeService.updateEmployee(employeeToEdit.id, formData);
                toast.success("Employee Updated Successfully!");
            } else {
                // CREATE
                await employeeService.createEmployee(formData);
                toast.success("Employee Created Successfully!");
            }
            onSuccess(); // Refresh parent list
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Operation Failed. Check inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm overflow-y-auto py-10">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
                
                <h2 className="text-2xl font-bold mb-6 text-blue-800">
                    {employeeToEdit ? 'Edit Employee' : 'Add New Employee'}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* --- Personal Info --- */}
                    <div className="md:col-span-2 text-sm font-bold text-gray-500 uppercase border-b pb-1 mt-2">Personal Details</div>
                    
                    <div>
                        <label className="block text-sm font-medium">Employee ID (4 Digits)</label>
                        <input name="employeeId" required pattern="\d{4}" value={formData.employeeId} onChange={handleChange} 
                            disabled={!!employeeToEdit} // Disable ID edit to prevent conflicts
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input name="name" required value={formData.name} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Grade (1-6)</label>
                        <select name="grade" value={formData.grade} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500">
                            {[1, 2, 3, 4, 5, 6].map(g => <option key={g} value={g}>Grade {g}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile</label>
                        <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium">Address</label>
                        <input name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* --- Bank Info --- */}
                    <div className="md:col-span-2 text-sm font-bold text-gray-500 uppercase border-b pb-1 mt-4">Bank Details</div>
                    
                    <div>
                        <label className="block text-sm font-medium">Bank Name</label>
                        <input name="bankName" required value={formData.bankName} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Branch Name</label>
                        <input name="branchName" required value={formData.branchName} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Account Name</label>
                        <input name="accountName" required value={formData.accountName} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Account Number</label>
                        <input name="accountNumber" required value={formData.accountNumber} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Account Type</label>
                        <select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500">
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                        </select>
                    </div>

                    {/* --- Actions --- */}
                    <div className="md:col-span-2 flex justify-end gap-3 mt-6 border-t pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
                            {loading ? 'Saving...' : (employeeToEdit ? 'Update Employee' : 'Create Employee')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeFormModal;