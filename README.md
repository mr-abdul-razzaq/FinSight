# <p align="center"><img src="./client/src/assets/logo/FinSight-light-favicon.svg" height="38" alt="FinSight Logo" style="vertical-align: middle; margin-right: 4px;" /> <span style="font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 28px; vertical-align: middle;">FinSight</span></p>

<p align="center">
  <strong>Smart Financial Intelligence, Driven by AI.</strong>
</p>

<p align="center">
  <a href="https://github.com/mr-abdul-razzaq/FinSight">
    <img src="https://img.shields.io/badge/MERN--Stack-React%20%7C%20Express%20%7C%20Node-blue?style=for-the-badge&logo=react" alt="MERN Stack" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-v5.8-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </a>
  <a href="https://deepmind.google/technologies/gemini/">
    <img src="https://img.shields.io/badge/AI--Powered-Gemini%20API-orange?style=for-the-badge&logo=google-gemini" alt="AI Powered" />
  </a>
  <a href="https://razorpay.com/">
    <img src="https://img.shields.io/badge/Razorpay-Integrated-emerald?style=for-the-badge" alt="Razorpay Integrated" />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/UI--UX-Responsive%20%26%20Dark%20Mode-purple?style=for-the-badge" alt="Responsive UI" />
  </a>
</p>

---

## 1. Introduction

**FinSight** is a startup-grade, AI-powered personal finance management and analytics platform designed to convert dry financial records into actionable growth strategies. 

Unlike standard budgeting apps that act as simple digital logbooks, FinSight combines the MERN stack with state-of-the-art **multimodal AI (Google Gemini)** and background task automation to streamline bookkeeping, aggregate recurring expenditures, and deliver personalized financial coaching dynamically.

### Key Value Propositions
*   **Zero-Friction Bookkeeping:** Drag-and-drop physical or digital receipts; our multimodal OCR engine transcribes them into structured transaction logs instantly.
*   **Generative Financial Narrative:** Instead of reading complex raw graphs, users receive a monthly human-like cashflow diagnosis with localized savings advice.
*   **Recurrence Orchestration:** A robust daily cron worker expands recurring events at midnight UTC to keep cashflow balances accurate.
*   **SaaS Infrastructure:** Ready for production with tiered subscription gating, Razorpay checkout sandboxing, and cryptographically verified billing webhooks.

---

## 2. App Showcase

<p align="center">
  <img src="./client/src/assets/images/dashboard_dark.png" width="95%" alt="Executive Dashboard UI" style="border-radius: 12px; border: 1px solid #1f2937; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);" />
</p>

<p align="center">
  <sub><em>Responsive executive dashboard featuring dynamic period summaries, category distribution Recharts, and quick action cards.</em></sub>
</p>

---

## 3. Key Features

*   🧠 **Multimodal AI OCR:** Upload images of crumpled or blurry receipts; Gemini AI parses merchants, dates, and amounts, auto-populating transaction logs in seconds.
*   📈 **Dynamic Financial Analytics:** High-fidelity charts showing income vs. expenses, net worth deltas, and category concentration lists.
*   🔄 **Automated Recurrence Engine:** Define daily, weekly, monthly, or yearly cashflows and let the background scheduler execute them automatically.
*   📧 **Monthly AI Reports:** Aggregates transactions on the 1st of every month, generates customized saving reports, and delivers them via the Resend API.
*   💳 **Razorpay Subscriptions:** Free, Pro, and Business tiers. Features seamless client checkouts, a billing limits tracker, and verified webhook state transitions.
*   📥 **Bulk CSV Import:** Parse thousands of historical transactions in the browser with Mongoose bulk-write database optimization.
*   🌗 **Premium UI/UX:** Stunning, desktop-to-mobile responsive interface featuring fluid dark-mode integration and custom micro-animations.

---

## 4. Technical Stack

| Layer | Technologies | Choice Rationale |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Redux Toolkit, Recharts, Tailwind CSS | **Vite + React** ensures immediate SPA page rendering. **Redux Toolkit & RTK Query** provide tag-based cache management to eliminate redundant API queries. |
| **Backend** | Node.js, Express, Passport JWT, Zod, Multer | **Express** forms a lightweight middleware chain. **Passport** handles secure JWT token decoding, and **Zod** secures API boundaries via input schemas. |
| **Database** | MongoDB, Mongoose | NoSQL fits highly flexible transaction properties perfectly. On-demand charts are computed directly in MongoDB using Mongoose aggregation pipelines. |
| **Integrations**| `@google/genai`, Razorpay SDK, Resend API, Cloudinary | **Gemini** handles OCR & narrative synthesis. **Razorpay** handles payment lifecycles. **Resend** dispatches PDF reports, and **Cloudinary** hosts receipts and user avatars. |

> [!NOTE]
> For extensive database schemas, event-driven sequence diagrams, API routing tables, and security controls, check out the [Technical Implementation Breakdown](TECHNICAL_IMPLEMENTATION_BREAKDOWN.md).

---

## 5. Quick Start Guide

### Prerequisites
*   Node.js (v18.x or v20.x recommended)
*   MongoDB (Local server or Atlas Connection URI)
*   Google Gemini & Razorpay Sandbox credentials

### 1. Clone the Project
```bash
git clone https://github.com/mr-abdul-razzaq/FinSight.git
cd FinSight
```

### 2. Install Project Dependencies
```bash
# Install server dependencies
cd backend && npm install

# Install client dependencies
cd ../client && npm install
```

### 3. Configure Local Environment Variables
Create a `.env` file in **both** the `backend/` and `client/` directories using the template below:

*   **Backend Environment (`backend/.env`):**
    ```env
    PORT=8000
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/finsight
    JWT_SECRET=your_jwt_auth_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    GEMINI_API_KEY=AIzaSyYourGeminiKey
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_key
    CLOUDINARY_API_SECRET=your_cloudinary_secret
    RESEND_API_KEY=re_YourResendKey
    RESEND_MAILER_SENDER=billing@yourdomain.com
    RAZORPAY_KEY_ID=rzp_test_YourKey
    RAZORPAY_KEY_SECRET=your_razorpay_secret
    RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
    ```
*   **Client Environment (`client/.env`):**
    ```env
    VITE_API_URL=http://localhost:8000/api
    VITE_REDUX_PERSIST_SECRET_KEY=redux-persist-session-key
    ```

### 4. Boot the Development Servers
Open two terminal windows to launch both layers concurrently:

```bash
# Terminal 1: Backend API Server (defaulting to http://localhost:8000)
cd backend && npm run dev

# Terminal 2: Client SPA Server (usually running on http://localhost:5173)
cd client && npm run dev
```

---

## 6. Future Roadmap

*   [ ] **AI Financial Advisor Chat:** A personalized conversational assistant to ask real-time questions about spending and saving strategies.
*   [ ] **Predictive Cashflow Forecasting:** AI-driven models that project balances 30, 60, and 90 days out based on historic patterns.
*   [ ] **Investment & Net-Worth Tracker:** Live integrations with stock, crypto, and mutual fund APIs to track all financial assets in one place.
*   [ ] **Multi-user Collaboration:** Share budgeting sheets and logs with accountants, business partners, or family members.
*   [ ] **Native Mobile Application:** Hybrid app delivery using React Native.

---

## 7. Developer & Contributor

Developed with passion by:

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/mr-abdul-razzaq">
        <sub><b>Mohammed Abdul Razzaq</b></sub>
      </a><br />
      💻 Full Stack Engineer
    </td>
  </tr>
</table>

### Contact & Portfolio Links
*   **GitHub Profile:** [mr-abdul-razzaq](https://github.com/mr-abdul-razzaq)

---

## 8. License

This repository is distributed under the terms of the MIT License. See [LICENSE](file:///home/mrabdul/projects/FinSight/LICENSE) for details.

```text
Copyright (c) 2026 Mohammed Abdul Razzaq
```
