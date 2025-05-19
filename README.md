🏥 HealthCare - Server

 HealthCare is a full-featured healthcare appointment and management system designed to streamline the interaction between patients, doctors, and administrators. This repository contains the **backend API** built with modern web technologies to support real-time communications, appointment scheduling, medical records, and more.

## 🚀 Features

### 🔐 Secure User Roles & Permissions
- Role-based access control: **Admin**, **Doctor**, and **Patient**
- Secure authentication & authorization

### 👨‍⚕️ Admin Functionalities
- Manage doctor accounts (create, update, delete)
- Create and manage doctor appointment slots
- View appointment history and metadata
- Access and manage doctor profiles

### 🩺 Doctor Functionalities
- Manage and view appointment slots
- Access patient profiles and medical history
- View diagnostic reports and past prescriptions
- Generate and send prescriptions via email
- Add medical notes to prescriptions

### 👤 Patient Functionalities
- Register and manage account securely
- Book appointments with specific doctors and time slots
- Upload diagnostic reports and maintain medical history
- Access prescriptions via dashboard and email
- Pay consultation fees with auto-cancellation if unpaid within 30 minutes
- Submit and manage reviews for doctors

### 🌐 System Highlights
- Real-time consultation using **WebRTC**
- Comprehensive patient profiles and secure medical records
- Secure online payments with automatic invoice generation
- Seamless appointment booking with status updates
- Automated email notifications (prescriptions, invoices, confirmations)
- SSR-ready single-page application (SPA) frontend compatibility

## 🛠 Tech Stack
- **Node.js**, **Express.js** – Backend API
- **MongoDB** – NoSQL Database
- **JWT** – Authentication
- **Nodemailer** – Email notifications
- **WebRTC** – Real-time communication
- **Stripe/SSLCommerz (optional)** – Payment integration

## 📁 Project Structure
```
health-care-server/
│
├── controllers/
├── models/
├── routes/
├── services/
├── middlewares/
├── utils/
└── app.ts / index.js
```

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 🔗 Frontend Integration
This backend supports a single-page frontend application with:
- Landing Page
- Doctor Profiles
- Patient Dashboards
- Admin Panel

---

## 📫 Contact
For questions or suggestions, feel free to contact the maintainer:

**Author:** [@imashiqe](https://github.com/imashiqe)  
**Project:** [ HealthCare Server](https://github.com/imashiqe/health-care-server)
