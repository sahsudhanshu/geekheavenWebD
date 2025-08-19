# QuesHeaven  

Live Website: [https://queshaven.vercel.app](https://queshaven.vercel.app)  
Backend API: [https://geekheavenwebd.onrender.com](https://geekheavenwebd.onrender.com)  
---
### Installation  
Prerequisites  **Node.js** and **npm** 
1. **Clone the repository**  
   ```bash
   git clone https://github.com/sahsudhanshu/geekheavenWebD.git
   cd geekheavenWebD
   ```

2. **Install backend dependencies**  
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**  
   ```bash
   cd Frontend
   npm install
   ```

---

### Environment Variables  

Create a `.env` file in the **/Frontend** and add the following:  

```env
VITE_BACKEND_BASE_URL=<YOUR_BACKEND_URL>
```
#for local deploment 
```env
VITE_BACKEND_BASE_URL=http://localhost:3000
```

Create a `.env` file in the **/Backend** and add the following:  

```env
MONGODB_CONNECTION_URI=<MONGOBD_URL>
JWT_SECRET=<YOUR_RANDOM_SECRET_KEY>
DB_NAME=<DB_NAME>
JWT_SECRET=<YOUR_JWT_SECRET_KEY>
```

---

### Running the Project  

#### 1. Start the backend
```bash
npm run dev   # for development (with nodemon)
npm start     # for production
```

#### 2. Start the frontend
```bash
cd Frontend
npm run dev     # for development
npm run build   # for production
```

- Frontend will run on [http://localhost:5173](http://localhost:5173).  
- Backend will run on [http://localhost:3000](http://localhost:3000) or your chosen port.  

---