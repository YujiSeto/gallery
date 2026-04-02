# Gallery 📸

A modern, high-performance photo gallery application built with **React**, **TypeScript**, and **Firebase Storage**. This project features a robust real-time connectivity monitor and a seamless "Demo Mode" for instant testing without server configuration.

---

## 🌟 Key Features

- **📡 Real-Time Connection Heartbeat**: A live indicator that monitors Firebase connectivity (Online, Missing Configuration, Offline, or Demo Mode).
- **🚀 One-Click Demo Mode**: Test the entire application interface instantly using high-quality mock data from Unsplash.
- **📱 Fully Responsive Design**: Optimized layouts for Desktop, Tablet, and Mobile devices (including vertical stacking for small screens).
- **🖼️ Smart Upload System**: 
  - Integrated **thumbnail preview** before uploading.
  - Optional **custom photo naming** (defaults to filename if left empty).
  - Professional **loading animations** inside the buttons.
- **🗑️ Seamless Management**: Hover-to-reveal "Delete" actions (X) and instant gallery updates.
- **🌑 Premium Dark UI**: A sleek, dark-themed interface built with **Styled Components**.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Styling**: Styled Components (Vanilla CSS logic)
- **Backend/Storage**: Firebase Storage
- **Icons & Effects**: Custom CSS & Keyframe Animations
- **Identification**: UUID v4

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YujiSeto/gallery.git
cd gallery
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
REACT_APP_FIREBASE_APIKEY=your_api_key
REACT_APP_FIREBASE_AUTHDOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECTID=your_project_id
REACT_APP_FIREBASE_STORAGEBUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGINGSENDERID=your_messaging_id
REACT_APP_FIREBASE_APPID=your_app_id
```

### 4. Run the application
```bash
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing with Demo Mode

No Firebase credentials? No problem. Simply click the **"Use Demo Mode"** button in the top-left corner to:
- Load high-resolution example photos.
- Test the upload simulation with thumbnails.
- Experience the real-time status signals.
- Test responsive layouts and deletion logic.
