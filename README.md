# ✅ TaskAPP – Full-Stack Task Management Application

**TaskAPP** is a modern **full-stack task management web application** built using **React + TypeScript, Tailwind CSS (shadcn/ui), Node.js, Express, and MongoDB-ready architecture**.  
It provides a clean dashboard UI, structured backend, and scalable project setup suitable for **college assignments and real-world deployment**.

---

## 🚀 Key Features

- 📋 Task dashboard with structured pages
- ⚛️ React + TypeScript frontend (Vite)
- 🎨 Tailwind CSS with **shadcn/ui** components
- 🧩 Modular component & hook architecture
- 🌐 Express server with API routing
- 🗂️ Shared schema for type safety
- ⚡ Vite-powered fast development
- 🧱 Production-ready folder structure

---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui component library

### Backend
- Node.js
- Express.js
- TypeScript

### Tooling & Config
- Drizzle ORM (schema ready)
- PostCSS
- Vite plugins
- ESLint-friendly structure

---

## 📁 Project Structure (Exact)

TaskAPP/

│

├── client/ # Frontend (React + Vite)

│ ├── index.html

│ ├── public/

│ └── src/

│ ├── App.tsx

│ ├── main.tsx

│ ├── index.css

│ ├── pages/

│ │ ├── dashboard.tsx

│ │ ├── auth.tsx

│ │ ├── about.tsx

│ │ └── not-found.tsx

│ ├── components/

│ │ └── ui/ # shadcn/ui components

│ ├── hooks/

│ └── lib/

│

├── server/ # Backend (Express)

│ ├── index.ts

│ ├── routes.ts

│ ├── static.ts

│ ├── storage.ts

│ └── vite.ts

│

├── shared/

│ └── schema.ts # Shared schema/types

│

├── script/

│ └── build.ts

│

├── attached_assets/ # Images & branding

├── drizzle.config.ts

├── vite.config.ts

├── tsconfig.json

├── package.json

└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd TaskAPP
```

2️⃣ Install Dependencies
```bash
npm install
```

3️⃣ Run the Project (Development)
```bash
npm run dev
```

Frontend: http://localhost:5000
Backend: runs via Express + Vite middleware

---

## 🔌 Backend Overview

Express server defined in server/index.ts
Central routing via server/routes.ts
Static serving handled by server/static.ts
Storage abstraction in server/storage.ts
Vite integrated for full-stack development

---

## 🧠 Frontend Overview

Page-based routing using React components
UI powered by shadcn/ui
Tailwind utility-first styling
Reusable hooks & utilities
Clean separation of concerns

---

##  📦 Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

##  🌐 Deployment
Frontend :
Deployable on Vercel / Netlify

Backend :
Deployable on Render / Railway
MongoDB Atlas can be connected easily

---

## 🔮 Future Enhancements

MongoDB Atlas integration
Full CRUD task APIs
Authentication (JWT)
User-specific task storage
Role-based dashboards

---

## 👨‍💻 Author

Anuroop Srivastava
B.Tech (CSE)
Full-Stack Development Enthusiast


---


## 📜 License

This project is licensed under the MIT License.

