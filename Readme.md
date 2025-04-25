
# 🎥 **StreamVerse** – Your Ultimate Movie Hub

A modern, responsive Netflix clone built with **React** and **Tailwind CSS**, featuring real movie data from the **OMDB API**. Dive into a world of movies and TV shows with smooth UI/UX and powerful features that’ll make you feel like you’re scrolling through Netflix itself.

---

## 🚀 **Features**

- **🎬 Browse Movies and TV Shows** – Explore a wide variety of genres and trending content.
- **🔍 Search Functionality** – Find your favorite titles with ease using the search bar.
- **👤 User Authentication** – Secure login for saving your favorite movies.
- **📱 Responsive Design** – Optimized for mobile, tablet, and desktop.
- **❤️ Watchlist Management** – Save your must-watch movies and shows for later.
- **🎯 Genre-based Categories** – Dive deeper with categorized movie and series lists.
- **🎨 Netflix-inspired UI/UX** – A clean, polished interface that mimics the Netflix experience.

---

## 🛠️ **Tech Stack**

- **Frontend Framework**: React
- **Styling**: Tailwind CSS (because who doesn't love utility-first styling?)
- **Routing**: React Router (for seamless navigation)
- **Icons**: Lucide React (easy-to-use icon library)
- **HTTP Client**: Axios (to fetch movie data)
- **API**: OMDB API (providing all the movie details you could ever need)
- **Build Tool**: Vite (for fast development builds)

---

## ⚡ **Getting Started**

### 1. Clone the Repository

```bash
git clone https://github.com/ezanand/streamverse.git
cd streamverse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up OMDB API Key

- Visit [OMDB API](http://www.omdbapi.com/apikey.aspx) and get your free API key.
- Replace `YOUR_OMDB_API_KEY` in `src/services/api.jsx` with your key.

### 4. Run the Development Server

```bash
npm run dev
```
---

## 📁 **Project Structure**

```
streamverse/
├── src/
│   ├── components/     # Reusable UI components (Buttons, Movie Cards, etc.)
│   ├── contexts/       # React context providers for state management
│   ├── pages/          # Page components (Home, Search, Profile, etc.)
│   ├── services/       # API functions, utilities
│   └── styles/         # Global Tailwind config and custom styles
├── public/             # Static assets (images, fonts, etc.)
└── package.json        # Project dependencies and scripts
```

---

## 🔑 **Key Features Explained**

### 🛡️ **Authentication**
- **Email/password login** (demo mode)
- **Protected routes** for authenticated users (because privacy is key!)
- **User profile management** to keep track of your favorites.

### 🎬 **Movie Browsing**
- Browse **trending** movies and TV shows, updated in real-time.
- **Filter by genres** to discover your next favorite film.
- **Detailed movie pages** with ratings, reviews, and more.

### 🔍 **Search**
- Real-time search suggestions that help you find movies on the fly.
- Search results from **both movies and TV shows**.
- Detailed results view to help you make decisions quickly.

### 📱 **Responsive Design**
- A **mobile-first approach** to ensure smooth browsing on all devices.
- **Fluid animations** and smooth transitions for an immersive experience.
- Netflix-inspired UI elements to make you feel at home.

---

## 🧑‍🤝‍🧑 **Contributing**

Want to make StreamVerse even better? Here’s how you can help:

1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`).
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to your branch (`git push origin feature/AmazingFeature`).
5. **Open a Pull Request** and make the magic happen!

---

## 📜 **License**

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🏆 **Acknowledgments**

- **Design inspiration** from Netflix (obviously).
- **Movie data** from [OMDB API](http://www.omdbapi.com/).
- **Icons** from [Lucide React](https://lucide.dev/).

---

## ⚠️ **Disclaimer**

This is a **demo project** created for educational purposes. **Not affiliated with Netflix, Inc.** but definitely inspired by their awesome user experience.

---
