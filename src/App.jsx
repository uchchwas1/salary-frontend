// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout'; // Optional wrapper if you have a navbar
// import EmployeeList from './pages/EmployeeList';

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       {/* All Dashboard routes are protected */}
//       <Route path="/" element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       } />

//       {/* Redirect unknown routes to login */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }

// export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes wrapped in Layout (Navbar) */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* "/" renders Dashboard */}
        <Route index element={<Dashboard />} />

        {/* "/employees" renders the CRUD list */}
        <Route path="employees" element={<EmployeeList />} />
      </Route>

      {/* Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
