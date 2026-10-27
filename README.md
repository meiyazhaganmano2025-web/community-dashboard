# 🎓 EduCommunity Dashboard — Complete MERN Stack Project

A responsive, attractive, and professional community platform for educational institutes, student clubs, and campus tech groups.

---

## ✨ Features

- **Student Details Registration**:
  - Modal form collecting Student Name, Email, Department, Year of Study, Phone, and Skills.
  - Automatic validation and duplicate email prevention.
- **Dynamic Announcements Feed**:
  - Educational announcements categorized as *Workshops, Internships, Hackathons, Study Materials, and Notices*.
  - Sorted automatically to display **recently posted announcements first**.
  - Pinned announcement support, external resource links, tags, and one-click copy/share.
  - Category filters and real-time search.
- **Admin Control Center**:
  - Secure Admin Access with Key / Password (Default: `admin2026`).
  - Broadcast new educational opportunities to the feed in real-time.
  - Student Roster Table: Search registered students and **Export to CSV**.
  - Live Feed Management: Delete or moderate announcements.
- **Render Single-Link Architecture**:
  - Zero CORS headache! Express serves the compiled React Vite frontend in production.
  - Both frontend & backend run under **one single URL** (e.g. `https://your-community.onrender.com`).
- **Minimal Files & Clean Structure**:
  - Only ~12 clear, focused files with zero unnecessary clutter.

---

## 🗂️ Minimal Folder Structure

```text
community-dashboard/
│
├── server/                         # Backend (Node.js & Express)
│   ├── db.js                       # MongoDB connection & health
│   ├── index.js                    # Express API server + static client hosting
│   ├── models/
│   │   ├── Announcement.js         # Schema for announcements (sorted by newest)
│   │   └── Student.js              # Schema for registered student members
│   └── routes/
│       ├── announcementRoutes.js   # Announcement feed & admin publish endpoints
│       └── studentRoutes.js        # Student registration & roster endpoints
│
├── client/                         # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── public/                     # Favicons & static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Top brand nav + live metrics
│   │   │   ├── StatsBanner.jsx     # Hero banner with filters & search
│   │   │   ├── AnnouncementCard.jsx# Beautiful card with badges & share
│   │   │   ├── StudentRegisterModal.jsx # Student registration popup
│   │   │   └── AdminPortal.jsx     # Admin key unlock, posting & student table
│   │   ├── App.jsx                 # Main state, feed & responsive layout
│   │   ├── main.jsx                # React root mount
│   │   └── index.css               # Utilities & smooth animations
│   ├── index.html                  # HTML template with Tailwind CSS CDN
│   ├── vite.config.js              # Vite config with /api proxy
│   └── package.json                # Client dependencies
│
├── .env.example                    # Environment template
├── .gitignore                      # Git ignored files
├── package.json                    # Root package for 1-command build & Render deploy
└── README.md                       # Complete documentation
```

---

## 📋 1. Pre-Requirements

Make sure you have the following installed and set up before starting:

1. **Node.js** (v18 or higher recommended; v24 is installed).
   - Verify in terminal: `node -v`
2. **Git** (for version control and deploying to GitHub & Render).
   - [Download Git for Windows](https://git-scm.com/download/win) if not yet installed.
3. **MongoDB Atlas Account** (Free Cloud Database):
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
   - Create a free **M0 Sandbox Cluster**.
   - Create a database user (e.g. username: `admin`, password: `yourpassword`).
   - Allow network access from anywhere (`0.0.0.0/0`).
   - Click **Connect** -> **Connect your application (Drivers)** -> copy the connection string:
     `mongodb+srv://<username>:<password>@cluster0.mongodb.net/communityDB?retryWrites=true&w=majority`
4. **GitHub Account** (to push code).
5. **Render.com Account** (to deploy the project for free as a single link).

---

## 🚀 2. Local Setup & Running

### Step A: Install Dependencies
Open your terminal inside the `community-dashboard` folder:

```bash
# 1. Install server dependencies
npm install

# 2. Install client dependencies
npm install --prefix client
```

*(Or simply run: `npm run install-all`)*

---

### Step B: Configure `.env`
Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
ADMIN_SECRET=admin2026
NODE_ENV=development
```

> **Note**: Even if you haven't connected MongoDB yet, the app has an **in-memory fallback mode** so you can preview, test, and develop immediately!

---

### Step C: Run Locally

To run the backend and frontend:

**Option 1: In two terminal windows (Recommended for development)**
- Terminal 1 (Backend):
  ```bash
  npm start
  ```
  *(Server starts on `http://localhost:5000`)*

- Terminal 2 (Frontend):
  ```bash
  npm run client
  ```
  *(Vite starts on `http://localhost:5173` with proxy to the backend)*

**Option 2: Test Production Single-Link Build locally**
```bash
# Build the React frontend
npm run build

# Start the Node server
npm start
```
Now open `http://localhost:5000` in your browser. Both the React app and backend APIs run under that single port!

---

## 🌐 3. Deploy to Render (Single-Link Guide)

Render will host both your Express backend and your React frontend under **ONE single URL** (e.g. `https://my-community.onrender.com`).

### Step 1: Push Code to GitHub
1. Open PowerShell or Command Prompt in `community-dashboard`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EduCommunity MERN dashboard"
   ```
2. Go to [GitHub.com](https://github.com), create a new repository (e.g., `community-dashboard`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/community-dashboard.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository (`community-dashboard`).
4. Fill in the deployment settings:
   - **Name**: `my-community-dashboard` *(or your preferred project name)*
   - **Region**: Closest to your users (e.g., Singapore, Frankfurt, Oregon)
   - **Branch**: `main`
   - **Root Directory**: *(Leave empty)*
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Instance Type**: `Free`

---

### Step 3: Add Environment Variables on Render
Scroll down to the **Environment Variables** section on Render and add:

| Key | Value | Notes |
|---|---|---|
| `NODE_ENV` | `production` | Enables production static file serving |
| `PORT` | `10000` | Port assigned by Render |
| `MONGO_URI` | `mongodb+srv://<user>:<password>@cluster0...` | Your MongoDB connection string |
| `ADMIN_SECRET` | `admin2026` | Passcode to unlock Admin features |

5. Click **Create Web Service**.
6. Render will automatically:
   - Install all dependencies.
   - Build the React app into `client/dist`.
   - Start `server/index.js`.
   - Serve your entire application at:
     **`https://my-community-dashboard.onrender.com`**

---

## 🔑 Default Admin Credentials

- **Admin Passcode**: `admin2026` (change this in your `.env` or Render environment settings under `ADMIN_SECRET`).
- Click the **Admin** shield icon in the top right navbar to enter the key and unlock the post announcement form and student roster.

---

## 🛡️ License
MIT License. Created for student communities and educational platforms.
