import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const AddMoneyModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {

      await api.post("/payroll/company/add-money", {
        amount: parseFloat(amount),
      });

      toast.success("Funds added successfully!");
      setAmount(""); 

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Add Money Error:", error);
      toast.error("Failed to add funds. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Insufficient Funds
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            The company account balance is too low to complete the salary
            transfer. Please add funds to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Top-up Amount (BDT)
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. 500000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition
                                ${
                                  loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                                }
                            `}
            >
              {loading ? "Processing..." : "Add Money & Retry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyModal;
