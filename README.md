# 🍔 Bigbite - Food Ordering Application

Bigbite is a modern **food ordering web application** built with **React**, **Vite**, and **TypeScript**.  
It allows users to explore restaurants, filter cuisines, and order food online in a seamless and responsive interface.

---

## 🚀 Tech Stack

- ⚛️ **React 18** – UI library
- ⚡ **Vite** – Next-generation frontend build tool
- 🧠 **TypeScript** – Static type checking
- 🎨 **Material UI (MUI)** – UI components and styling
- 🌍 **i18next** – Internationalization support
- 🧩 **Custom Hooks** – For API fetching (`useFetch`)
- 🧰 **ESLint + Prettier** – Code linting and formatting

---

## 📦 Features

✅ Modern UI inspired by food delivery platforms  
✅ Restaurant listings with filters (Veg, Non-Veg, Offers, Distance, Price range)  
✅ Cuisine and Nearby restaurant sections  
✅ API-driven restaurant data fetching  
✅ Multilingual support with **i18next**  
✅ Modular and reusable components  
✅ Environment-ready configuration for production builds  

---

## 🧰 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/bigbite.git
cd bigbite
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

## 🏗️ Project Structure

```bash
src/
├── components/
│   ├── common/
│   │   └── RestaurantCard.tsx
│   ├── home/
│   │   ├── Filters.tsx
│   │   ├── FoodSlides.tsx
│   │   └── TopRestaurants.tsx
│
├── hooks/
│   └── useFetch.ts
│
├── pages/
│   └── HomePage.tsx
│
├── types/
│   └── restaurant.ts
│
├── i18n/
│   └── index.ts
│
└── main.tsx
```

## 🧱 Build for Production

```bash
npm run build
```

## 🧑‍💻 Author

```bash
Harshil Babariya
Frontend Developer (React + TypeScript)
📧 harshilbabariya01@gmail.com
🌐 https://harshilbabariya.github.io/profile/