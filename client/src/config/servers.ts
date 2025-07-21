import { ServerConfig } from '../types';

export const SERVERS: ServerConfig[] = [
  {
    id: 'free',
    name: 'Free Server',
    description: 'Standard gameplay with basic features',
    entryFeeUsd: 0,
    features: ['Basic gameplay', 'Standard leaderboard', 'Public matches'],
    isPremium: false
  },
  {
    id: 'premium-1',
    name: '$1 Premium Server',
    description: 'Enhanced gameplay with premium features',
    entryFeeUsd: 1.00,
    features: ['Reduced lag', 'Priority matchmaking', 'Exclusive skins', 'Faster respawn'],
    isPremium: true
  },

]; 