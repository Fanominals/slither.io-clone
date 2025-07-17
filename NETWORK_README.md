# Solana Network Configuration

This project uses a simple config system to switch between Solana networks.

## Quick Network Switch

**To switch between mainnet and devnet:**

1. Open `client/src/config/network.ts`
2. Change this line:
   ```typescript
   const CURRENT_NETWORK: NetworkEnvironment = 'mainnet'; // Change to 'devnet' or 'mainnet'
   ```
3. Save the file
4. The app will automatically use the new network

## Networks Available

### 🌐 Mainnet (Production)
- **When to use:** Production deployment, real transactions
- **RPC Endpoints:** 
  - Helius: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`
  - Official: `https://api.mainnet-beta.solana.com`
- **Explorer:** https://explorer.solana.com

### 🧪 Devnet (Development)
- **When to use:** Development, testing, debugging
- **RPC Endpoints:**
  - Helius: `https://devnet.helius-rpc.com/?api-key=YOUR_KEY`
  - Official: `https://api.devnet.solana.com`
- **Explorer:** https://explorer.solana.com/?cluster=devnet

## Features

- **Automatic RPC Fallback:** If Helius fails, falls back to official Solana RPC
- **Visual Network Indicator:** Shows "DEVNET" badge when on devnet
- **Network-Aware Logging:** Console logs show which network is being used
- **Explorer Links:** Automatically uses correct explorer for the network

## Configuration Details

The network config includes:
- ✅ RPC endpoints with your Helius API key
- ✅ Automatic fallback endpoints
- ✅ Network-specific explorer URLs
- ✅ Helper functions for network detection

## Helius API Key

Your Helius API key is configured in the network config:
```
API Key: b398bdd3-2e91-4c2c-919d-9fa6cb01a90e
```

This provides:
- Higher rate limits than free RPCs
- Better reliability and uptime
- Dedicated support from Helius

## Development Workflow

**For Development:**
1. Set `CURRENT_NETWORK = 'devnet'`
2. Use devnet faucet for test SOL
3. Test all features with free transactions

**For Production:**
1. Set `CURRENT_NETWORK = 'mainnet'`
2. Deploy with real SOL
3. Monitor via mainnet explorer 