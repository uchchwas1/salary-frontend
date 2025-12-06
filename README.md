# Salary Management System - Frontend

This is the **React Client** for the Employee Payroll Management System. It interacts with the Spring Boot Backend to manage employees, process monthly salary payments, and handle company account transactions.

This project was built as part of a **Technical Assignment** to demonstrate Full Stack development skills including JWT Authentication, Complex Logic Implementation, and Financial Transaction handling.

## Features

- [cite_start]**Secure Authentication:** Login system using **JWT (JSON Web Token)**[cite: 21].
- **Dashboard:** Real-time view of the Company Account Balance and quick access to salary processing.
- [cite_start]**Salary Processing Engine:** \* Takes the **Lowest Grade Basic Salary** as input[cite: 6].
  - [cite_start]Automatically calculates salary for all 6 Grades based on the formula: `Basic + (Increment * 5000) + 20% Rent + 15% Medical`[cite: 5, 7].
- [cite_start]**Insufficient Funds Handling:** Detects if the company account lacks funds during payment and triggers a modal to add money dynamically[cite: 10].
- [cite_start]**Salary Sheet:** Displays a detailed table of employees, their grades, bank details, and estimated salary[cite: 19].
- **Responsive UI:** Built with **Tailwind CSS** for a clean, modern interface.

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (v4)
- **HTTP Client:** Axios (with Interceptors for Bearer Token injection)
- **Routing:** React Router DOM
- **Notifications:** React Hot Toast
- **Security:** JWT Decode

## Prerequisites

- **Node.js** (v18 or higher)
- **Backend:** The Spring Boot backend server **must be running** on `http://localhost:8080`.

## Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/your-username/salary-frontend.git](https://github.com/your-username/salary-frontend.git)
    cd salary-frontend
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The app will usually start at `http://localhost:5173`.

## Project Structure

```text
src/
├── components/       # Reusable UI (Navbar, Layout, ProtectedRoute, AddMoneyModal)
├── context/          # AuthContext (JWT State Management)
├── pages/            # Application Pages (Login, Dashboard)
├── services/         # API Service Layer (Axios configuration)
└── main.jsx          # Entry point (Providers setup)
```
