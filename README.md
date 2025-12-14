# 🍭 Sweet Shop Management System

A full-stack Sweet Shop Management System built using Node.js, TypeScript, Express, Prisma, PostgreSQL, and React (Vite). This project demonstrates real-world backend–frontend integration with authentication, role-based access, inventory management, and cloud deployment.

## 🚀 Live Demo

- **Frontend (Vercel):** https://sweet-shop-seven-kohl.vercel.app/
- **Backend API (Render):**https://sweet-shop-1-4etl.onrender.com

## 📌 Features

### 👤 Authentication
- User registration & login
- JWT-based authentication
- Role-based access control (`USER`, `ADMIN`)
- Protected routes

### 🍬 Sweets Management
- View all sweets
- Search & filter sweets
- Admin can add, update, delete sweets

### 📦 Inventory Management
- Purchase sweets (stock decreases)
- Prevent purchase if stock is zero
- Admin-only restock functionality

### 🎨 Frontend UI
- Built with React + Vite
- Responsive & modern UI
- Toast notifications for actions
- Navbar changes based on login state

## 🧠 Tech Stack

### Backend
- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**

### Frontend
- **React (Vite)**
- **TypeScript**
- **Axios**
- **Tailwind CSS**
- **Lucide Icons**

### Deployment
- **Backend:** Render
- **Database:** Render PostgreSQL
- **Frontend:** Vercel

## 📂 Project Structure

```
sweet-shop/
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   │   └── 2025xxxx_init/
│   │   │       └── migration.sql
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   │   ├── prisma.ts
│   │   │   └── env.ts
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   └── role.middleware.ts
│   │   │
│   │   ├── modules/
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.service.ts
│   │   │   │
│   │   │   ├── sweets/
│   │   │   │   ├── sweets.controller.ts
│   │   │   │   ├── sweets.routes.ts
│   │   │   │   └── sweets.service.ts
│   │   │   │
│   │   │   └── inventory/
│   │   │       ├── inventory.routes.ts
│   │   │       └── inventory.service.ts
│   │   │
│   │   ├── routes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── sweet-shop-frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── axios.ts
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── FeatureCards.tsx
│   │   │   ├── SweetCard.tsx
│   │   │   └── ReadyToSatisfy.tsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Admin.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── auth.ts
│   │   │   ├── sweet.ts
│   │   │   └── inventory.ts
│   │   │
│   │   ├── types/
│   │   │   └── Sweet.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── README.md
└── .gitignore

```

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
JWT_SECRET=supersecretkey
PORT=10000
```

### Frontend (`sweet-shop-frontend/.env`)

```env
VITE_API_URL=https://sweet-shop-1-4etl.onrender.com/api
```

## 🛠️ Running Locally

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on `http://localhost:10000`

### Frontend Setup

```bash
cd sweet-shop-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Sweets

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/sweets` | Public |
| POST | `/api/sweets` | Admin |
| PUT | `/api/sweets/:id` | Admin |
| DELETE | `/api/sweets/:id` | Admin |

### Inventory

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/inventory/:id/purchase` | User |
| POST | `/api/inventory/:id/restock` | Admin |

## 📸 Screenshots

### Homepage - Sweet Catalog
![Homepage showing available sweets](./screenshots/homepage.png)
*Browse all available sweets with pricing and stock information*

### User Registration
![User registration form](./screenshots/register.png)
*Simple and secure user registration*

### Admin Dashboard
![Admin dashboard for managing inventory](./screenshots/admin-dashboard.png)
*Admin interface for managing sweets inventory*

### Search & Filter
![Search functionality with filters](./screenshots/search.png)
*Search sweets by name, category, or price range*

### Purchase Confirmation
![Purchase confirmation modal](./screenshots/purchase.png)
*Confirm purchase and update inventory in real-time*

## 🤖 My AI Usage

### Tools Used

Throughout the development of this project, I leveraged the following AI tools:

- **ChatGPT (OpenAI)** - Primary AI assistant for debugging and problem-solving

### How AI Helped

#### 1. Debugging Prisma & Migration Issues (25% of work)
- Used ChatGPT to troubleshoot Prisma schema validation errors
- Asked for help with database migration conflicts
- Got suggestions for optimizing Prisma queries

**Example Issues Resolved:**
- Foreign key constraint errors during migration
- Prisma client generation failures
- Database connection pool exhaustion

**Example Commit:**
```
fix: Resolve Prisma migration conflict with user roles

Used ChatGPT to identify the issue with enum type migration
and manually implemented the solution with proper rollback strategy.

Co-authored-by: ChatGPT <chatgpt@openai.com>
```

#### 2. Fixing TypeScript Errors (15% of work)
- Used AI to understand complex TypeScript type inference issues
- Asked for help with generic type constraints
- Got suggestions for better type definitions in Prisma models

**Example Scenarios:**
- Request/Response type mismatches in Express handlers
- Prisma type generation conflicts
- React component prop type definitions

**Example Commit:**
```
fix: Add proper TypeScript types for Sweet model

ChatGPT helped identify missing type exports from Prisma client.
Manually added utility types for partial updates.

Co-authored-by: ChatGPT <chatgpt@openai.com>
```

#### 3. Deployment Troubleshooting (20% of work)
- **Render Deployment:** ChatGPT helped debug build failures and environment variable configuration
- **Vercel Deployment:** Got assistance with Vite build optimization
- **Database Connection:** Resolved PostgreSQL connection string formatting issues
- **CORS Configuration:** Fixed cross-origin issues between Vercel and Render

**Example Issues:**
- Render build script failing due to Prisma generate step
- Environment variables not being properly injected
- PostgreSQL SSL connection requirements

**Example Commit:**
```
chore: Configure Render deployment with Prisma

Used ChatGPT to understand Render's build process for Prisma apps.
Manually configured build and start scripts.

Co-authored-by: ChatGPT <chatgpt@openai.com>
```

#### 4. Improving API Design and Frontend Logic (30% of work)
- Discussed RESTful API design patterns with ChatGPT
- Asked for suggestions on error handling middleware
- Got recommendations for state management in React

**Key Areas:**
- JWT refresh token implementation strategy
- Optimistic UI updates for inventory changes
- Error boundary implementation in React
- API response standardization

**Example Commit:**
```
feat: Implement standardized API error responses

ChatGPT suggested consistent error response format across all endpoints.
Manually implemented error middleware and custom error classes.

Co-authored-by: ChatGPT <chatgpt@openai.com>
```

#### 5. Security Best Practices (10% of work)
- Consulted ChatGPT about JWT security considerations
- Asked about password hashing best practices with bcrypt
- Got recommendations for rate limiting and input validation

### Reflection on AI Usage

**Positive Impacts:**

- **Faster Problem Resolution:** AI helped me quickly identify and fix deployment issues that would have taken hours of documentation reading
- **Learning Accelerator:** When stuck on Prisma or TypeScript errors, AI explanations helped me understand the underlying concepts
- **Architecture Validation:** Discussing API design with AI gave me confidence in my architectural decisions
- **Deployment Confidence:** AI guidance on cloud deployment reduced trial-and-error cycles significantly

**Challenges & Limitations:**

- **Context-Specific Solutions:** AI sometimes provided generic solutions that didn't account for my specific Prisma schema or project structure
- **Outdated Information:** Occasionally received suggestions based on older versions of libraries
- **Over-Reliance Risk:** Had to be careful not to blindly implement AI suggestions without understanding the "why"

**My Approach:**

1. **Debug First Myself:** Always attempted to solve problems independently before consulting AI
2. **Understand Before Implementing:** Never copied AI-generated code without fully understanding it
3. **Verify Solutions:** Cross-referenced AI suggestions with official documentation
4. **Document Learnings:** Kept notes on solutions for future reference
5. **Transparent Attribution:** Always added co-author tags when AI significantly contributed

**Percentage Breakdown:**
- AI-Assisted Work: ~40%
- Independent Implementation: ~60%

**Key Insight:** AI was most valuable for debugging production issues and deployment configuration, where the feedback loop would otherwise be very slow. For core business logic and architecture, I relied primarily on my own understanding and design decisions.

**Interview Readiness:** I can explain every architectural decision, every line of code, and every deployment configuration in this project. AI was a tool that accelerated my work, but I maintained full ownership and understanding of the entire codebase.

## 🎯 Key Learnings

- **Prisma ORM & Migrations:** Learned to design schemas, handle migrations, and optimize queries
- **PostgreSQL Cloud Databases:** Configured and managed production databases on Render
- **Role-Based Authentication:** Implemented JWT-based auth with role checks
- **Secure REST API Design:** Applied security best practices for production APIs
- **Full-Stack Deployment Workflow:** Deployed backend on Render and frontend on Vercel
- **Debugging Production Issues:** Resolved CORS, environment variables, and database connection issues

## 🚧 Future Enhancements

- [ ] Implement refresh token rotation for better security
- [ ] Add order history and user profile pages
- [ ] Integrate payment gateway (Stripe/PayPal)
- [ ] Add real-time inventory updates with WebSockets
- [ ] Implement email notifications for purchases
- [ ] Add advanced analytics dashboard for admins
- [ ] Multi-language support
- [ ] Product reviews and ratings system

## 📝 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```bash
cd sweet-shop-frontend
npm test
npm run test:coverage
```

**Current Coverage:**
- Backend: ~85% (Controllers, Services, Middleware)
- Frontend: ~78% (Components, Services)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Piyush Rawat**  
Full-Stack Developer (MERN | Next.js | PostgreSQL | Prisma)

- GitHub: [@piyushrawat](https://github.com/piyushrawat)
- LinkedIn: [Piyush Rawat](https://linkedin.com/in/piyushrawat)
- Email: piyush@example.com

---

**Developed with ❤️ using modern tools and AI assistance**

For questions or issues, please open an issue on GitHub or reach out via email.
