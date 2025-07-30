# 🎥 StreamVerse – Your Ultimate Movie Hub

**StreamVerse** is a full-featured, Netflix-inspired movie streaming web app built using modern frontend technologies. With a sleek interface and real-time movie data via the OMDB API, StreamVerse offers an immersive experience for users to discover and manage their favorite content.

---

## 📌 Overview

* 📽️ Browse trending movies and TV shows
* 🔍 Search with live suggestions
* 👤 Login with authentication
* ❤️ Save favorites in watchlist
* 🌐 Fully responsive design
* 🎨 Netflix-style polished UI

---

## 🚀 Features

### 🧑 User Features

* 🔐 Email/password-based login system
* 🎬 Browse by genre and trending titles
* 🔍 Real-time search across movies and shows
* ❤️ Watchlist for saving favorites
* 📄 Detailed movie information with ratings & reviews
* 📱 Optimized for mobile, tablet, and desktop

### 📦 Tech Highlights

| Frontend | UI & Styling | Routing      | API/Data |
| -------- | ------------ | ------------ | -------- |
| React    | Tailwind CSS | React Router | OMDB API |
| Vite     | Lucide Icons |              | Axios    |

---

## 🛠️ Project Structure

```
streamverse/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # Context API providers
│   ├── pages/          # Route-based pages
│   ├── services/       # API functions & helpers
│   └── styles/         # Global styles
├── public/             # Static assets
└── package.json        # Scripts & dependencies
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ezanand/streamverse.git
cd streamverse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up API Key

* Get a key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
* Replace `YOUR_OMDB_API_KEY` in `src/services/api.jsx`

### 4. Start Development Server

```bash
npm run dev
```

---

## 🔐 Authentication

* Basic email/password login (for demo)
* Protected routes for authenticated users
* Watchlist linked to user profile

---

## ✅ TODO / Future Plans

* 🔑 Firebase or OAuth integration
* 🌍 Multi-language support
* 🔔 Notifications for new releases
* 🧠 Smart recommendations

---

## 👨‍💻 Author

**Anand Raj Singh**
📧 [anandraj.singh2003@gmail.com](mailto:anandraj.singh2003@gmail.com)
🔗 [GitHub: ezanand](https://github.com/ezanand)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📣 Acknowledgments

* Inspired by Netflix’s intuitive UX
* Movie data from OMDB API
* Icons from Lucide React

---

## ⚠️ Disclaimer

This is a **demo project** built for educational purposes. It is **not affiliated** with Netflix, Inc.
