# 🎥 Pictory Automation: Auto-Generate & Download Videos from Pictory.ai

An automated video generation system using Playwright and BullMQ that logs in to [Pictory.ai](https://pictory.ai), fills in video scripts, and downloads the rendered video — fully automated and queue-based.

---

## Backend Setup

### Prerequisites

- Node.js v18 or higher  
- Redis Server (local or via Docker)  
- Chrome (handled by Playwright)  
- `npx` for running Playwright commands  

---

### Installation Steps

#### Clone the repository

```bash
git clone <repository-url>
cd pictory-automation
```

#### Install Dependencies

```bash
npm install express dotenv playwright playwright-extra puppeteer-extra-plugin-stealth fs-extra
```
#### Running Automation

you can running automation for login and create video this command in terminal 

```bash
npx playwright test pictory-text-to-video.spec.js --debug
```

#### Install Redis and start Redis

```bash
brew install redis
```

```bash
brew services start redis
```

check if redis is running properly 

```bash
redis-cli ping
```

when started
```bash
PONG
```

#### Running Queue with Redis & Automation with Playwright

```bash
node server.js
```

```bash
node worker.js
```

```bash
curl -X POST http://localhost:3000/add-job \
     -H "Content-Type: application/json" \
     -d '{"videoTitle": "My Test Video", "videoScript": "Hello, this is an automated video."}'
```
