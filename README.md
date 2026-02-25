# HopeBucket

A simple React app for building a daily "hope bucket" of three positive reflections.

HopeBucket helps users capture small moments of gratitude, encouragement, and progress each day. The app includes animated bucket fill states, optional quote tracking, and one-click copy/share support.

## Features

- Add up to 3 daily hope items
- Visual bucket animation that fills as items are added
- Confetti celebration when the bucket is full
- View and manage the current list in a modal
- Copy list text to clipboard for sharing
- Add and manage up to 3 personal inspiration quotes
- Daily reset flow for starting a new list
- In-app Privacy Policy page rendered from markdown

## Built With

- React
- React Router
- React Bootstrap + Bootstrap Icons
- Lottie (`lottie-react`) for animation
- `canvas-confetti` for celebration effects

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm start
```

The app runs in development mode at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects Create React App configuration

## Project Structure

```text
src/
  components/      # UI components (Bucket, Nav, List, Quote modal, etc.)
  contexts/        # Shared state providers
  hooks/           # Animation/control hooks
  styles/          # App styling
public/
  PRIVACY_POLICY.md
```

## Privacy Policy

The app includes a dedicated `/privacy-policy` route that renders the markdown file located at `public/PRIVACY_POLICY.md`.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests/build checks
4. Open a pull request
