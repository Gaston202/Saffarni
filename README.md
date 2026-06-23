# 🌍 Saffarni

> A full-stack travel platform to discover destinations, browse hotels & activities, plan trips, and book — with a secure auth flow and an admin management panel.

Saffarni is a full-stack web application built with a modern React frontend and a RESTful Node/Express + MongoDB backend. Users can explore travel destinations, view hotels and activities on an interactive map, plan trips, and make bookings, while administrators manage the platform's content through a dedicated admin area.

🔗 **Live demo:** [saffarni.vercel.app](https://https://saffarni-e6a8.vercel.app/)

---

## ✨ Features

### For travelers
- 🔍 **Discover destinations** — browse curated travel destinations with details and imagery
- 🏨 **Hotels & activities** — explore accommodations and things to do at each destination
- 🗺️ **Interactive maps** — location views powered by Leaflet & OpenStreetMap
- 🧳 **Trip planning** — assemble trips from destinations, hotels, and activities
- 📅 **Bookings** — create and manage your bookings
- 🔐 **Authentication** — secure JWT-based sign up / login with protected routes

### For administrators
- 🛠️ **Admin panel** — manage destinations, hotels, activities, and trips
- 👥 **User management** — oversee user accounts
- 📊 **Centralized CRUD** — full create / read / update / delete over platform content

---

## 🧱 Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 19, Vite 7, React Router 7, Tailwind CSS v4, shadcn/ui (Radix UI), Lucide icons, React Hook Form, Axios, JWT Decode |
| **Maps** | React-Leaflet + Leaflet (OpenStreetMap) |
| **Backend** | Node.js, Express 5, Mongoose 8 (MongoDB), JWT (jsonwebtoken), bcryptjs, CORS, dotenv |
| **Architecture** | MVC (Configuration / Controllers / Middleware / Models / Routes) |
| **Deployment** | Vercel (frontend + serverless backend) |

---

## 📁 Project Structure

```
Saffarni/
├── backend/                  # Node + Express REST API
│   ├── Configuration/        # DB & environment setup
│   ├── Controllers/          # Route handler logic
│   ├── Middleware/           # Auth, error handling, etc.
│   ├── Models/               # Mongoose schemas
│   ├── Routes/               # API route definitions
│   ├── index.js              # Server entry point
│   ├── seedDestinations.js   # DB seeding script
│   └── vercel.json           # Serverless deployment config
│
└── saffarni-app/             # React + Vite frontend
    ├── src/
    │   ├── Routes/           # App route definitions
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React context (state/auth)
    │   ├── services/         # API / business logic
    │   ├── data/             # Static / seed data
    │   ├── lib/              # Helpers (cn, utils)
    │   ├── utils/            # Utility functions
    │   ├── App.jsx           # Root component
    │   └── main.jsx          # App entry point
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) free cluster)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Gaston202/Saffarni.git
cd Saffarni
```

### 2. Start the backend
```bash
cd backend
npm install
cp .env.example .env      # then fill in your environment variables
npm run seed              # optional: seed destinations into the DB
npm run dev               # starts the API with nodemon (http://localhost:PORT)
```

### 3. Start the frontend
```bash
cd ../saffarni-app
npm install
cp .env.example .env      # then point VITE_API_URL at your backend
npm run dev               # starts Vite dev server (http://localhost:5173)
```

---

## 🔑 Environment Variables

Configure each app from its `.env.example` file.

**`backend/.env`** — typical variables (confirm against `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**`saffarni-app/.env`** — typical variables (confirm against `.env.example`):
```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never commit real `.env` files. Only `.env.example` templates should be in version control.

---

## 📜 Available Scripts

### Backend (`/backend`)
| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with nodemon (auto-reload) |
| `npm start` | Start the API in production mode |
| `npm run seed` | Seed the database with destination data |

### Frontend (`/saffarni-app`)
| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🌐 API Overview

The backend exposes REST resources (mounted under the routes folder):

| Resource | Route file | Purpose |
| --- | --- | --- |
| Users | `UserRoute.js` | Auth (register/login), profile |
| Destinations | `DestinationRoute.js` | Browse & manage destinations |
| Hotels | `HotelRoute.js` | Browse & manage hotels |
| Activities | `ActivityRoute.js` | Browse & manage activities |
| Trips | `tripRoutes.js` | Trip assembly & management |
| Bookings | `BookingRoute.js` | Create & manage bookings |
| Admin | `adminRoutes.js` | Admin-only operations |

Authentication is JWT-based: protected endpoints expect an `Authorization: Bearer <token>` header.

---


## 🗺️ Roadmap

- [ ] User reviews & ratings for hotels/activities
- [ ] Payments integration
- [ ] Search & filtering (price, location, category)
- [ ] Multi-language support
- [ ] Mobile-responsive polish & PWA

---

## 🤝 Contributing

Contributions are welcome! This is a personal/learning project, but feel free to fork and experiment.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Gaston** — [GitHub @Gaston202](https://github.com/Gaston202)

> Built as a full-stack learning project to practice React, Node/Express, MongoDB, and deploying real apps to Vercel.
