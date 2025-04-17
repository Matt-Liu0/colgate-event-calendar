# Colgate Events Calendar Enhancement

Overview:
--
This project is a redesign and enhancement of the existing Colgate University Events Calendar. 
Our goal is to present events in a visually appealing, user-friendly, and responsive interface 
that allows for intuitive filtering, searching, and navigation of campus happenings.

Key Features:
--
- Clean and modern user interface with event category filtering
- Keyword search for fast event discovery
- Responsive event cards with built-in social media sharing options
- Individual event detail pages with descriptions, “Add to Calendar” button, and comment section

Right now Working On:
--
- Persistent comment system (e.g., using a backend or Firebase)
- Persistent upvote and downvote for events (Colgate Secure Sign-in or Google Auth0)
- Trending Events (Page/Filter)


Tech Stack:
--
Frontend:
- Next.js (App Router) — React framework for building the frontend and routing
- Tailwind CSS — Utility-first CSS framework for styling
- React Icons — For social sharing icons
- Local JSON / API structure — Used for simulating dynamic event data
- Deployed with Vercel (recommended) or local development using `npm run dev`

Backend & Database:
--
- NestJS - Typescript Backend Framework
- Prisma - ORM to communicate with the DB
- PostgreSQL - Database used to store different things of the application (comments, upvotes/downvotes, etc.)

Developer Tools:
--
- PGAdmin - To run PostgreSQL locally (And deploy with Supabase)
- Heroku - To deploy the backend
- Postman - To test out the API links in Nest Controller Classes

Future Improvements:
--
- Integration with Colgate’s Localist-powered event RSS feed or API
- Persistent comment system (e.g., using a backend or Firebase)
- Admin dashboard to add and manage events

To Run Locally:
--
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000` in your browser
5. Add more steps here as the backend and database is created

