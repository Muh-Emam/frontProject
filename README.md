# Hekto - Modern E-commerce Dashboard

A fully responsive e-commerce platform built with React and Bootstrap, featuring a dynamic product management dashboard and a sleek "Hekto" inspired design.

## 🚀 Project Overview
This project is a full-stack-ready frontend application. It includes a complete shopping experience with product listings, a responsive cart system, and an administrative control panel to manage products, users, and carts.

## 🛠 Tech Stack
* **Frontend:** React.js, JavaScript (ES6+)
* **Styling:** Bootstrap 5, Sass/CSS
* **State Management:** Redux Toolkit (Cart & Auth logic)
* **Icons:** Bootstrap Icons
* **Environment:** Developed on Fedora Linux (Sway WM)



## 📦 Installation Steps
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/Muh-Emam/frontProject.git](https://github.com/Muh-Emam/frontProject.git)


CODE REVIEW:
 Notes Hi, Good work overall. Please keep the following points in mind for future improvements: 
 Logic & Implementation Make sure to always pass the full product object when working with cart actions, not just the id. Pay attention to variable naming consistency (e.g., event vs e) to avoid runtime errors. Ensure updated state is what gets persisted (especially when working with LocalStorage). API & Data Handling Always connect updates (edit/delete) to real API calls, not just local state changes. Avoid hardcoding data such as user location; it should come from a dynamic source (API). Security Never handle authentication or password validation on the frontend. Avoid exposing sensitive data (like user credentials) in network requests. Use proper token-based authentication instead of placeholder values like IBAN. Code Quality Keep a clean and logical structure (e.g., define functions before using them). Follow best practices for scalability and maintainability. Keep going, you're on the right track.