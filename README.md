# The Profile Project

This project is an entry for the "The Profile Project" challenge, designed to recreate the Gidy.ai profile UI with added backend functionality and an innovative touch.

## Setup Instructions

### Prerequisites
- Node.js (v18+)

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database:
   ```bash
   node setupDb.js
   ```
   *This creates a local SQLite database (`database.sqlite`) and seeds it with default profile data and skills.*
4. Start the server:
   ```bash
   node server.js
   ```
   *The server runs on http://localhost:3000*

### 2. Frontend Setup
1. In a new terminal window, navigate back to the project root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser, typically at http://localhost:5173

## Tech Stack
-   **Frontend:** Vite, React, Tailwind CSS (v4), Framer Motion, Lucide React icons.
-   **Backend:** Node.js, Express, SQLite3 for a lightweight, self-contained database.

## Innovation Features ("The Edge")

I implemented three key innovations to transform a static profile into a premium, interactive product experience:

1.  **Iterative Skill Endorsement System:** 
    *   **The Feature:** Users can interact with the skills section by 'endorsing' them. This triggers an optimistic UI update and persists directly to the SQLite backend.
    *   **Why?** In a standard profile, skills are static data. Adding endorsements creates a "social layer," making the profile feel like part of a living ecosystem rather than a PDF. It demonstrates full-stack reactivity.

2.  **"AI Magic" Bio Generation:** 
    *   **The Feature:** Mimics modern AI integration by allowing users to instantly generate professional summaries based on pre-defined high-impact templates.
    *   **Why?** Writing a bio is the most common point of friction for users. This feature demonstrates product thinking by solving a real user pain point (writer's block) while showcasing smooth UI/UX with Framer Motion.

3.  **High-Fidelity Interaction Design (Persistent Theme & Spring Motion):**
    *   **The Feature:** A buttery-smooth custom magnetic cursor and spring-physics reveal animations, paired with a dark-mode toggle that persists via `localStorage`.
    *   **Why?** The challenge requested a "high-fidelity replica." I chose to push the boundaries of "fidelity" by adding interaction layers found in award-winning portfolios (Awwwards/FWA), ensuring the "feel" of the app matches its visual quality.

---
*Developed for the Gidy.ai Full-Stack Technical Challenge - March 2026.*
