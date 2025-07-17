# Slither.io Clone

A fully functional multiplayer Slither.io clone built with TypeScript, Node.js, and Socket.IO. Features real-time multiplayer gameplay, smooth animations, and modern web technologies.

## Features

### Gameplay
- **Real-time multiplayer** - Play with multiple players simultaneously
- **Mouse-controlled movement** - Point and move your snake with precision
- **Dynamic growth system** - Eat food to grow longer and thicker
- **Food attraction** - Food particles are attracted to your snake within 25px radius
- **Collision detection** - Die when hitting other snakes or the red border
- **Smooth interpolation** - Client-side prediction for lag-free gameplay

### Visual Features
- **Hexagonal grid background** - Classic slither.io aesthetic
- **Dynamic camera** - Zooms out as your snake grows
- **Snake eyes** - Animated eyes that show movement direction
- **Red kill border** - Clear visual boundary that kills snakes on contact
- **Modern UI** - Clean, responsive interface with death/respawn screens

### Technical Features
- **Authoritative server** - Server-side game logic prevents cheating
- **30 FPS server tick rate** - Smooth, responsive gameplay
- **Client-side interpolation** - Smooth movement between server updates
- **TypeScript architecture** - Type-safe code with shared constants
- **Socket.IO networking** - Reliable real-time communication
- **Modular design** - Clean separation of client/server/common code

## Project Structure

```
slither.io/
├── client/                 # Client-side code
│   ├── game/              # Game logic (Camera, Input, Renderer, etc.)
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   ├── main.ts            # Game entry point
│   └── socket.ts          # Socket.IO client wrapper
├── server/                # Server-side code
│   ├── game/              # Game logic (GameState, Snake, Food, etc.)
│   └── index.ts           # Express server with Socket.IO
├── common/                # Shared code
│   └── constants.ts       # Game constants and types
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript config for server
└── tsconfig.client.json   # TypeScript config for client
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd slither.io
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the project**
```bash
npm run build
```

4. **Start the server**
```bash
npm start
```

5. **Open in browser**
Navigate to `http://localhost:3000`

### Development Scripts

- `npm run build` - Build both client and server
- `npm run build:server` - Build only server code
- `npm run build:client` - Build only client code
- `npm start` - Start the production server
- `npm run dev` - Start development server (if nodemon is configured)

## Game Configuration

Game settings can be modified in `common/constants.ts`:

```typescript
export const GAME_CONFIG = {
    WORLD_WIDTH: 4000,           // World width in pixels
    WORLD_HEIGHT: 4000,          // World height in pixels
    SNAKE_SPEED: 200,            // Snake movement speed
    FOOD_ATTRACTION_RADIUS: 25,  // Food attraction distance
    TICK_RATE: 30,               // Server updates per second
    BORDER_WIDTH: 50,            // Red border width
    // ... and more
};
```

## Technical Implementation

### Architecture
- **Client-Server Model**: Authoritative server prevents cheating
- **Real-time Networking**: Socket.IO for low-latency communication
- **Interpolation**: Client-side smoothing for responsive gameplay
- **TypeScript**: Type safety across the entire codebase

### Key Components

#### Server (`server/`)
- **GameState**: Manages all game entities and logic
- **Snake**: Player snake with movement, growth, and collision
- **Food**: Food particles with attraction physics
- **Collision**: Collision detection between snakes and food

#### Client (`client/`)
- **Renderer**: Canvas-based rendering with camera system
- **Input**: Mouse input handling and movement
- **Camera**: Dynamic zoom and smooth following
- **ClientSnake/ClientFood**: Client-side prediction and interpolation

### Networking
- **Event-driven**: Socket.IO events for all game actions
- **State synchronization**: Server broadcasts game state at 30 FPS
- **Input handling**: Client sends movement commands to server
- **Lag compensation**: Client-side prediction with server reconciliation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please respect the original Slither.io game.

## Performance Notes

- Supports multiple concurrent players
- Optimized rendering with canvas
- Efficient collision detection
- Memory-managed food particles
- Smooth 30 FPS server simulation

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires modern JavaScript features (ES6+) and WebSocket support. 

## Authentication & Database Setup

### Privy Authentication
This project uses [Privy.io](https://privy.io) for user authentication with support for:
- Email authentication with OTP
- Google OAuth login
- Secure user session management

### Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Privy Configuration
VITE_PRIVY_APP_ID=your_privy_app_id_here

# Supabase Configuration  
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Database Setup (Supabase)
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema located in `database/schema.sql` in your Supabase SQL editor
3. Configure your environment variables with your Supabase project details

The database schema includes:
- **user_profiles**: Core user information synced from Privy
- **user_game_stats**: Aggregated game statistics
- **game_sessions**: Individual game session tracking
- **user_achievements**: Achievement system (prepared for future features)
- **user_settings**: User preferences
- **leaderboard_entries**: Leaderboard system

### Authentication Flow
1. User clicks "Log In" on the menu screen
2. Privy modal opens with email/Google OAuth options  
3. Upon successful authentication, user data is synced to Supabase
4. User can play with their authenticated profile
5. Game statistics and progress are tracked in the database 