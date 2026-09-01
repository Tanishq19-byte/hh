# 🥗 FoodVigil — AI-Powered Consumer Food Safety & Transparency Platform

> **"See Beyond the Label."**

FoodVigil (also known as *KhadyaDarpan*) is an AI-powered consumer food safety and transparency platform tailored for Indian consumers and global food safety standards. It bridges the gap between complex ingredient codes (E-numbers), scattered food safety recall notices, FSSAI licence verifications, and guided consumer evidence reporting.

---

## 🚀 Key Problem & Solution

| Problem | How FoodVigil Solves It |
| :--- | :--- |
| **Lack of Food Transparency** | Extracts ingredients & additives via OCR and explains E-numbers in plain, non-alarmist consumer language. |
| **Scattered Safety Info** | Verifies 14-digit FSSAI licence numbers and provides a unified Food Recall Radar. |
| **Limited Consumer Awareness** | "Spot the Risk" guides for milk, spices, oils, sweets, grains & produce with scientific disclaimers. |
| **Difficult to Take Action** | Guided 4-step reporting wizard with an evidence checklist (photos, store receipts, batch #). |

---

## 🌟 Core Product Features

### 1. 📷 AI Food Label Scanner (`/scan` & `/scan/result`)
- **Upload / Camera Capture / Manual Input / Presets** (Instant demo scans for Instant Noodles, Energy Drink, Spice Recall).
- **Food Safety Snapshot**: Badges (`🟢 Good`, `🟡 Needs Attention`, `🔴 Important Information`).
- **7 Detailed Breakdown Cards**:
  - Additives & E-Numbers (Code, Name, Purpose, Simple Explanation, Consumer Note)
  - Full Ingredients List
  - Allergen Declarations
  - Nutrition Information (Serving Size, Calories, Sugar, Sodium % RDA)
  - Label Completeness Audit (FSSAI logo, Batch #, Expiry date)
  - FSSAI Licence Verification Seal
  - Active Recall Radar Match

### 2. 🛡️ FSSAI / Business Verification (`/verify`)
- Search by 14-digit FSSAI licence number or business name.
- Displays business category, licence status (Active, Under Review, Suspended), registered address, validity timeline, and an explicit **"Demo Verification Data"** badge for hackathon transparency.

### 3. 🚨 Food Recalls & Safety Alerts (`/alerts`)
- Public food safety warnings and manufacturer recalls.
- Filters by severity (`Urgent`, `Warning`, `Info`), date, and food category (`Spices`, `Beverages`, `Packaged Snacks`, `Dairy`).
- Official source references (FSSAI Notices, FDA, EFSA).

### 4. 👁️ Spot the Risk: Adulteration Awareness (`/spot-the-risk`)
- Consumer education guides for Milk, Spices (Turmeric/Chilli), Cooking Oils, Festive Sweets (Mawa/Khoya), Food Grains (Dals), and Fresh Produce.
- **Scientific Boundaries Disclaimer**: Highlights that visual checks and home tests are preliminary awareness steps and certified laboratory testing is required for legal proof.

### 5. 📝 Guided Report Submission Wizard (`/report` & `/my-reports`)
- 4-step wizard collecting issue type, vendor details, batch code, location, photos, and purchase bill.
- **Evidence Checklist**: Visual tick marks for uploaded photos, receipts, and batch numbers.

### 6. 🔒 Evidence Vault (`/evidence`)
- Encrypted-looking repository storing user packaging snapshots, store bills, and report timestamps.

### 7. 📊 User Activity Dashboard (`/dashboard`)
- Personal metrics, recent activity stream, and Recharts AreaChart tracking the **Food Safety Awareness Score**.

---

## 🏗️ System Architecture & Stack

```
React 18 + Vite (Frontend)
    │
    ▼ (REST API)
Node.js + Express.js Backend (`/api/v1`)
    │
    ▼ (FastAPI Microservice)
Python AI Engine + OCR Parser
    │
    ▼
PostgreSQL / Supabase Schema
```

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Recharts, React Router 6.
- **Backend API**: Node.js, Express.js REST endpoints.
- **AI Service**: Python FastAPI microservice with structured JSON parsing.
- **Database**: PostgreSQL / Supabase schema (`schema.sql` and `seed.sql`).

---

## 🛠️ Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/Tanishq19-byte/hh.git
cd hh
```

### 2. Install & Start Frontend
```bash
cd frontend
npm install
npm run dev
```
*App will run on `http://localhost:3000`*

### 3. Install & Start Backend
```bash
cd ../backend
npm install
node src/server.js
```
*API will run on `http://localhost:5000`*

---

## 📄 License & Trust Policy
FoodVigil is built for hackathon presentation excellence. AI explanations provide balanced consumer guidance without making unsupported medical claims.
