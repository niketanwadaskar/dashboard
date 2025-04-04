# 🚀 React Dashboard Assignment

This is a **React + TypeScript** dashboard built for a frontend developer assignment. It features a two-page layout: a **Runs List Page** and a **Run Details Page** — complete with routing, pagination, dynamic data rendering, and a 3D text view using Babylon.js in an iframe.

## 🔧 Tech Stack

- **React** (w/ TypeScript)
- **React Router DOM**
- **Tailwind CSS** for styling
- **Babylon.js** for 3D rendering
- **Vite** as the bundler
- **Local JSON Fetching via Promise**

## 🗂 Project Structure

```
├── public/
│   └── viewer.html         # Contains 3D viewer using Babylon.js
|   └── viewer.js         # Contains 3D viewer using Babylon.js
├── src/
│   ├── components/
|   |    └── Loader.tsx # Reusable components
|   |    └── RunRow.tsx # Reusable components
│   ├── pages/
│   │   ├── RunDetails.tsx    # Shows all Runs
│   │   └── RunList.tsx # Shows single Run details + 3D iframe
│   ├── data/
│   │   └── runs.json       # Sample data for runs
│   ├── App.tsx             # App layout + routing
│   └── main.tsx            # Vite entry point
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/niketanwadaskar/dashboard.git
cd dashboard
npm install
```

## 🧪 Running the Project

Start the dev server:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 📄 Features

### ✅ List Page

- Fetches data using a simulated async promise (not hardcoded).
- Displays: `id`, `name`, `status`, `date`
- Paginated for better UX
- Each row links to its detailed view

### ✅ Details Page

- Displays full data of a selected run
- Includes a "Back" button
- Contains an iframe with 3D text rendering
- Buttons to change text color (Green, Yellow, Red)
- Communicates with iframe using `postMessage`

### ✅ 3D Text View (iframe)

- Built with Babylon.js
- Dynamically updates text color based on parent-page events

## 😬 Error Handling

- Shows fallback message if:
  - Data fails to load
  - Invalid or non-existent run ID is accessed

## 💡 Bonus Features

- Responsive design (Tailwind CSS)
- Smooth iframe communication
- Neat UI with hover states and interactions

## ✍️ Author

**Niketan Wadaskar**  
React | TypeScript | Frontend Dev