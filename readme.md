# Monorepo Project: Web Crawler for Hacker News

### Overview

This project is a monorepo built with TurboRepo, featuring a frontend developed with React and a backend using NestJS. The primary functionality is to create a web crawler that extracts the first 30 entries from Hacker News and perform specific filtering operations on the extracted data.

#### **Features**

- Web Crawler:
  - Extracts number, title, points, and number of comments from the first 30 entries on Hacker News.
- Filtering Operations:
  - Titles with more than five words, ordered by the number of comments.
  - Titles with five or less words, ordered by points.
- Web Interface:
  - Interact with the crawler and view results through a web browser.
- Automated Testing:
  - Ensures the functionality and performance of the solution.

#### **Tech Stack**

- Frontend: React, Vite
- Backend: NestJS
- Monorepo: TurboRepo
- Language: TypeScript
- Testing: Jest, React Testing Library

#### Prerequisites

- Node.js v20.11.0
- Docker (optional)
- npm

### Installation

1. Clone the repository: `https://github.com/JuanFCVal/SB-Crawler-Monorepo.git`
2. `cd SB-Crawler-Monorepo`
3. Install dependencies: `npm i` in the root of the project.

### Running the Application in

#### Dev mode

1. Create an .env file based on .env.example
2. Start both applications running in the root: `npm run dev`
3. Access the application:
   - Frontend: http://localhost:<frontend_port> //5173 By default
   - Backend: http://localhost:<backend_port> //8080 By default

#### Production mode

1. Create an .env file based on .env.example
2. Build the applications running in the root: `npm run build`
3. Start the applications running in the root: `npm run start`

### Testing

You can run the tests for both applications with the following command in the root or you can run them individually in each application folder:

### Structure

The project follows a monorepo structure managed by TurboRepo. Here's an overview of the folder structure:

```
SB-Crawler-Monorepo/
├── apps/
│ ├── crawler-back/ # NestJS backend
│ └── crawler-front/ # React frontend
├── packages/
├── turbo.json
├── package.json
└── docker-compose.yml
```
