# 🍽️ Local Food Lovers Network

🔗 **Live Demo:** [https://gilded-naiad-40d78f.netlify.app/](https://gilded-naiad-40d78f.netlify.app/all-reviews)

---

## 🎯 Project Purpose
Local Food Lovers Network is a **community-driven platform** connecting food enthusiasts who love exploring local restaurants, street food, and home-cooked meals. Users can **share reviews with photos**, discover new dishes, and celebrate local flavors. The platform focuses on a **modern, responsive, and interactive SPA experience**.

---

## ✨ Key Features

1. **Food Reviews & Listings**
   - Browse all reviews with food images, restaurant name, location, rating, and reviewer.
   - Sort reviews by date in descending order.
   - View review details on a separate page.

2. **User Authentication**
   - Secure Firebase Authentication (Email/Password + Google login).
   - Password validation: minimum 6 characters, uppercase & lowercase letters.
   - Protected routes for adding, editing, and viewing personal reviews.

3. **Add & Manage Reviews**
   - Add a new review with Food Name, Image, Restaurant, Location, Rating, and Review Text.
   - Edit or delete your own reviews.
   - Reviews are saved in **MongoDB** with user email and date.

4. **Favorites System**
   - Add any review to your favorites using a heart button.
   - View all favorite reviews in **My Favorites** page.
   - Favorites stored in a separate MongoDB collection.

5. **Search Functionality**
   - Search reviews by food name using MongoDB `$regex`.
   - No client-side filtering; search directly in the database.

6. **Responsive & Modern Design**
   - Fully responsive layout for mobile, tablet, and desktop.
   - Clean and intuitive UI with consistent typography and spacing.
   - Navbar and Footer persistent across all routes.

7. **User Profile**
   - View profile information: name, email, and photo.
   - Update name and profile photo using Firebase.

---

## 🛠️ Technologies & Packages Used

| Category | Technology / Package | Purpose |
|----------|-------------------|---------|
| Frontend | React JS | Main SPA framework |
| Styling | Tailwind CSS / DaisyUI | Responsive and modern UI design |
| Backend | Node.js / Express | REST API |
| Database | MongoDB | Stores reviews and favorites |
| Authentication | Firebase Auth | Email/Password & Google login |
| Notifications | react-hot-toast | Success/error messages |
| Animations | AOS, Animate.css | Smooth scroll & UI effects |

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm / yarn / pnpm
- MongoDB connection URI
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/Rafi570/Local-Food-Lovers-Network-client.git]




