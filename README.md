# EasyStats-Web

A modern, responsive web application for visualizing Minecraft server statistics and campaign performance metrics from the EasyStats plugin. Built with Next.js and featuring a beautiful interface.

## Features

- 📊 **Comprehensive Statistics Dashboard**
  - Real-time player count tracking
  - Platform-specific statistics (Java/Bedrock)
  - Session duration analytics
  - Revenue tracking across multiple currencies

- 🎯 **Campaign Performance Monitoring**
  - Track multiple marketing campaigns
  - ROI calculation and visualization
  - Player join statistics
  - Profit/loss indicators
  - Campaign status tracking

- 💫 **Modern UI/UX**
  - Responsive design
  - Dark theme
  - Interactive charts and visualizations
  - Clean and intuitive interface

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/GiansCode/easystats-web
   cd EasyStats-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure the environment**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Data Format

The application expects JSON data in a specific format. Here's an example of the required structure:

```json
{
  "export_date": "2025-03-21T14:20:00",
  "timeframe": "30d",
  "player_count": {
    "current": 312,
    "averages": {
      "24h": 228,
      "7d": 242
    }
  },
  "campaigns": [
    {
      "name": "campaign_name",
      "description": "description",
      "currency": "USD",
      "cost": 1000,
      "total_revenue": 1500,
      "join_stats": {
        "total": 1000,
        "java": 600,
        "bedrock": 400
      }
    }
  ]
}
```

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context
- **Data Fetching**: SWR

