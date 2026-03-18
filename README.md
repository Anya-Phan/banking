# AK Bank - A Fintech Application Demo

A modern fintech web application that helps users track personal finances, manage transactions, and visualize spending behavior through dynamic charts.

The application provides an interactive dashboard where financial data is automatically analyzed and updated when new transactions are added.

---

## Table of Contents

- [Introduction](#introduction)
- [Test](#test)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Authentication](#authentication)
- [Financial Analytics](#financial-analytics)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Introduction

This project is a simple financial management dashboard built to help users monitor their personal finances.

Users can add transactions, organize expenses by category, and analyze spending patterns through charts. Financial data is automatically recalculated when transactions change, providing up-to-date insights into spending behavior.

---
## Test

Visiting my application with with account for demo:

    Email: test123@email.com
    Password: test2525

---

## Tech Stack

- **Next.js** – React framework used to build the web application
- **Prisma ORM** – Type-safe ORM used to interact with the database
- **Neon Database** – Serverless PostgreSQL database used to store application data
- **Appwrite** – Authentication service supporting Email/Password and OAuth login

---

## Features

- User authentication (Email & Password, OAuth)
- Personal finance dashboard
- Add/Delete transactions
- Transaction history
- Expense and income categories
- Financial analytics with charts
- Automatic chart updates when transaction data changes
- Automatic chart updates when a new bank connects
- Responsive UI for desktop and mobile

> Note: This project does not include real bank transfer functionality.

---

## Installation

Clone the repository

```bash
git clone https://github.com/Anya-Phan/banking
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NEXT_APPWRITE_KEY=

DATABASE_URL=

NEXT_PUBLIC_APPWRITE_PROJECT_ID = 

NEXT_PUBLIC_APPWRITE_PROJECT_NAME = 

NEXT_PUBLIC_APPWRITE_ENDPOINT =
```

---

## Database

The application uses **PostgreSQL hosted on Neon**.

Database schema and queries are managed using **Prisma ORM**.

Run the following command to apply database migrations:

```bash
npx prisma migrate dev
```

---

## Authentication

Authentication is handled by **Appwrite**, supporting:

- Email and Password login
- OAuth login

This allows users to securely access their financial dashboard.

---

## Financial Analytics

The application provides visual insights into spending behavior using charts.

Charts are automatically recalculated when:

- a new transaction is added
- transaction data is updated
- a new financial account is connected

This allows users to quickly understand their spending patterns.

---

## Future Improvements

- Bank API integration
- Money transfer between accounts
- Budget planning tools
- Advanced financial reports

---

## License


