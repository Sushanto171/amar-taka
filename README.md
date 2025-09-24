# Amar Taka 💰

_A Modern Digital Wallet & Financial Service Platform (User, Agent & Admin Dashboard)_

---

## 📌 Project Overview

**Amar Taka** is a full-stack digital wallet system designed to simplify financial services.  
It includes **multi-role support** (User, Agent, Admin) with secure transactions, analytics, and role-based dashboards.

### 🔑 Key Features

#### 👤 User

- Register & manage wallet
- Send money to another user
- Cash-out via agent
- Cash-in via agent
- Apply to become an agent
- View activity & transaction history
- Update profile & password

#### 🧑‍💼 Agent

- Cash-in to user wallets
- Cash-out from user wallets
- View transaction analytics
- Track activities
- Update profile & password

#### 👨‍💻 Admin

- Change system variables (fees, limits, etc.)
- Take actions against users/agents
- View system-wide analytics
- Access all transactions & logs
- Monitor activities
- Update profile & password

---


## 🔐 Demo Credentials

Use these test accounts to explore the system:

| Role   | Phone        | Password |
|--------|-------------|----------|
| Admin  | 01791407583 | 123456   |
| User   | 01791407574 | 123456   |
| Agent  | 01791407573 | 123456   |

---

## ⚙️ Technology Stack

### Frontend

- **React 19**
- **React Router 7**
- **Redux Toolkit**
- **TailwindCSS + shadcn/ui**
- **Framer Motion** (animations)
- **Recharts** (data visualization)
- **Axios** (API requests)
- **Zod** (validation)

### Other Tools

- **Driver.js** (guided tours)
- **React Hook Form** (form handling)
- **Sonner** (toast notifications)
- **TypeScript**

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repositories

````bash
# Frontend
git clone https://github.com/Sushanto171/amar-taka.git


### 2️⃣ Install Dependencies

```bash
cd amar-taka
npm install

````

### 3️⃣ Environment Variables

Create a **.env** file in frontend with required values:

**.env Example**

```env
VITE_API_URL=http://localhost:3000/api
```

### 4️⃣ Run the App

```bash
# Start backend
npm run dev

# Start frontend
npm run dev
```

---

## 🌍 Live URLs

- **Frontend:** [Amar Taka Live](https://github.com/Sushanto171/amar-taka)
- **Backend:** [Amar Taka API](https://github.com/Sushanto171/backend-amar-taka)

---

## 📦 Dependencies (Main)

- `react`, `react-router`, `redux-toolkit`
- `tailwindcss`, `shadcn/ui`, `framer-motion`
- `axios`, `zod`, `react-hook-form`
- `recharts`, `sonner`, `driver.js`

(Full list available in `package.json`)

---

## 📝 Notes

- This project implements **JWT authentication with refresh tokens** to keep users logged in securely.
- Role-based dashboards ensure **different features for User, Agent, and Admin**.
- Fully responsive UI with **modern animations and charts**.
- Backend ensures **transaction safety with Mongoose transactions**.

---

## 👨‍💻 Author

Developed by **[Sushanto Kumar](https://github.com/Sushanto171)** 🚀
