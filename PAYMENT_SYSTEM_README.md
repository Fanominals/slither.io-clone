# Payment System Implementation

This document describes the complete pay-to-enter game system implementation for the Slither.io clone.

## Overview

The payment system allows players to pay SOL to access premium servers with enhanced features. The system includes:

- Multiple server tiers (Free, $1)
- Solana blockchain payment processing
- Server segregation by payment tier
- Real-time payment verification
- Dynamic pricing based on SOL/USD exchange rate

## Architecture

### Client-Side Components

1. **PaymentModal** (`client/src/components/PaymentModal.tsx`)
   - Server selection interface
   - Payment processing with progress tracking
   - Wallet integration via Privy

2. **SolanaPaymentService** (`client/src/services/SolanaPaymentService.ts`)
   - SOL price fetching and caching
   - Transaction creation and signing
   - Balance checking
   - Payment progress tracking

3. **GameContext** (`client/src/contexts/GameContext.tsx`)
   - Manages selected server state
   - Provides server information to components

### Server-Side Components

1. **Server Segregation** (`server/index.ts`)
   - Multiple game instances for different payment tiers
   - Player routing based on payment status
   - Isolated game states per server

2. **Payment Verification** (Socket events)
   - Payment submission handling
   - Transaction verification
   - Server access control

## Environment Configuration

Create a `.env` file with the following variables:

```env
# Solana Configuration
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
VITE_HOUSE_WALLET_ADDRESS=YOUR_HOUSE_WALLET_ADDRESS_HERE
VITE_ENTRY_FEE_USD=1.00
VITE_SOL_PRICE_CACHE_DURATION=300000

# Network Configuration
VITE_SOLANA_NETWORK=mainnet

# Game Configuration
VITE_GAME_SERVER_URL=http://localhost:3000

# Development Configuration
NODE_ENV=development

# Privy Configuration
VITE_PRIVY_APP_ID=your-privy-app-id

# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Server Tiers

### Free Server
- **Cost**: $0
- **Features**: Basic gameplay, standard leaderboard, public matches
- **Access**: No payment required

### $1 Premium Server
- **Cost**: $1.00 USD
- **Features**: Reduced lag, priority matchmaking, exclusive skins, faster respawn
- **Access**: Requires payment verification



## Payment Flow

1. **Server Selection**: User selects a server tier from the PaymentModal
2. **Balance Check**: System checks if user has sufficient SOL balance
3. **Transaction Creation**: Creates Solana transaction to house wallet
4. **Wallet Signing**: User signs transaction with their wallet
5. **Transaction Broadcast**: Transaction is sent to Solana network
6. **Confirmation**: Waits for transaction confirmation
7. **Server Verification**: Submits payment to server for verification
8. **Game Access**: User joins the paid server

## Socket Events

### Client to Server
- `submit_payment`: Submit payment for verification
- `join_paid_game`: Join a premium server after payment

### Server to Client
- `payment_verified`: Payment verification successful
- `payment_failed`: Payment verification failed

## Security Considerations

1. **Transaction Verification**: All payments are verified on-chain
2. **Server Segregation**: Players can only access servers they've paid for
3. **Rate Limiting**: Implement rate limiting on payment endpoints
4. **Environment Variables**: Sensitive data stored in environment files
5. **Wallet Validation**: Verify wallet ownership before processing payments

## Development Notes

### Testing
- Use Solana devnet for testing
- Set `VITE_SOLANA_NETWORK=devnet` in development
- Use test wallets with devnet SOL

### Debugging
- Check browser console for payment progress logs
- Monitor server logs for payment verification
- Verify wallet connection status

### Deployment
- Set production environment variables
- Use mainnet Solana network
- Configure proper house wallet address
- Enable HTTPS for production

## Future Enhancements

1. **Payment History**: Track payment history per user
2. **Refund System**: Implement refund mechanism
3. **Subscription Model**: Monthly/yearly payment options
4. **NFT Integration**: NFT-based server access
5. **Analytics**: Payment analytics and reporting
6. **Multi-chain Support**: Support for other blockchains

## Troubleshooting

### Common Issues

1. **Payment Stuck**: Check wallet connection and balance
2. **Server Not Joining**: Verify payment verification completed
3. **Transaction Failed**: Check network congestion and gas fees
4. **Wallet Not Found**: Ensure Privy wallet is connected

### Debug Commands

```bash
# Check server status
curl http://localhost:3000/

# Monitor server logs
tail -f server/logs/app.log

# Check environment variables
echo $VITE_HOUSE_WALLET_ADDRESS
```

## Support

For issues or questions about the payment system:

1. Check the browser console for error messages
2. Verify environment configuration
3. Test with devnet first
4. Review server logs for detailed error information 