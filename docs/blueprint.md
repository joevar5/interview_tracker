# **App Name**: InterviewPilot

## Core Features:

- Interview Tracking: Allow users to input and track interview details: company, round, status, and rejection reasons.
- AI Feedback Generation: Train a small LLM to generate personalized feedback, improvement plans, and cheat sheets based on user-provided rejection reasons. The AI acts as a tool to suggest improvements.
- Secure Authentication: Secure user authentication and authorization using Clerk or Auth0.

## Style Guidelines:

- Primary color: Dark blue (#1A202C) for a professional look.
- Secondary color: Light gray (#EDF2F7) for backgrounds and subtle accents.
- Accent: Teal (#4DC0B5) for interactive elements and highlights.
- Clean and modern typography for readability and a professional feel.
- Use a consistent set of simple, professional icons.
- Clean and intuitive layout with clear sections and easy navigation.
- Subtle transitions and animations to enhance the user experience without being distracting.

## Original User Request:
Build a fast, scalable SaaS web application called InterviewVault that helps users track their interview progress (company, round, status, reason for rejection) and provides AI-powered feedback. Instead of calling external LLM APIs, train and fine-tune a small, efficient LLM model that can analyze user rejection reasons and generate personalized improvement feedback, action plans, and cheat notes.

The project must include full LLM lifecycle (training, deployment, optimization), using tools like Hugging Face, vLLM, and Weights & Biases.
The webapp must have a clean UI (Next.js + TailwindCSS), a scalable backend (FastAPI/Node.js), a relational database (PostgreSQL), secure authentication (Clerk/Auth0), and deploy globally (Vercel + AWS).

Focus on scalability, speed, and production-readiness to deliver a professional-grade SaaS product.
  