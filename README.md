# Paylance AI (69)

🚀 MASTER PROMPT

1. Product Overview

Product Name: Paylance AI
Tagline: Get paid globally. Stay compliant locally.

Target Audience:
Freelance creators in Southeast Asia (starting with India), including designers, developers, video editors, and digital creators who work with international clients.

Problem it solves:
Freelancers face difficulty managing international payments, tracking income across platforms, and understanding local tax compliance. Existing tools are either too complex or not tailored for freelancers. Paylance AI simplifies this with AI-powered tracking and tax guidance.

2. Core Features (MVP Focused)

Payment Tracker

Add and manage international payments

Store amount, currency, client name, and payment method

Auto-calculate converted values (UI-level for now)

AI Tax Summary

Generate simple tax estimates based on income

Display monthly/yearly summaries

Mock AI-generated insights (no real API required initially)

Dashboard Overview

Total earnings

Recent transactions

Estimated tax

AI Assistant (Basic UI)

Chat interface for compliance questions

Static/mock responses for MVP

3. Pages Required

Landing Page

Hero section with headline, subtext, and CTA

Features overview

How it works (3 steps)

Pricing section (Free, Pro, Premium)

CTA section

Login / Signup Page

Simple authentication UI

Toggle between login and signup

Dashboard

Sidebar navigation

Main dashboard with stats and recent activity

Payment tracking section

AI assistant section

4. UI/UX Design Instructions

Use modern SaaS design

Clean, minimal layout with proper spacing

Use Tailwind CSS

Include dark mode support

Hero Section Design:

Headline: “Get paid globally. Stay compliant locally.”

Subtext explaining AI-powered payments & tax assistant

CTA button: “Start Free”

Visual: futuristic dashboard or global payment illustration

Use soft gradients, glassmorphism cards, and subtle shadows

Responsive design (mobile + desktop)

5. Functional Requirements

Signup Form Fields:

Name

Email

Password

Country (dropdown)

Currency preference

Login:

Email

Password

Dashboard Functionality:

Display:

Total earnings

Estimated tax

Number of transactions

Add Payment Form:

Client Name

Amount

Currency

Payment Method

Date

List of recent payments

AI Assistant:

Input box for user queries

Display mock responses

Data Handling:

Store user and payment data in local state (for now)

Prepare structure for future database integration

6. Tech Stack

React (Vite)

Tailwind CSS

React Router (for navigation)

Placeholder setup for Supabase (auth + database later)

7. Output Instructions

Build a working frontend application

Use clean and scalable folder structure:

components/

pages/

layouts/

utils/

Use reusable components

Ensure responsive UI

Code should be clean and readable

Ready for deployment (Vercel/Netlify compatible)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pay-lance-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0c6baf4e-fcd4-422e-80b9-160ce342c2bd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
