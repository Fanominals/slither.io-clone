import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { SimpleTransferModal } from './SimpleTransferModal';

export const TransferExample: React.FC = () => {
  const { authenticated } = usePrivy();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('0.1');

  const handleTransferSuccess = (signature: string) => {
    console.log('Transfer successful! Transaction signature:', signature);
    alert(`Transfer successful! View on Solscan: https://solscan.io/tx/${signature}`);
    setIsModalOpen(false);
  };

  const handleTransferError = (error: string) => {
    console.error('Transfer failed:', error);
    alert(`Transfer failed: ${error}`);
  };

  const openTransferModal = () => {
    if (!authenticated) {
      alert('Please log in first');
      return;
    }

    if (!recipientAddress || !amount) {
      alert('Please enter recipient address and amount');
      return;
    }

    try {
      // Basic validation for Solana address
      if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(recipientAddress)) {
        alert('Invalid Solana address format');
        return;
      }

      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        alert('Invalid amount');
        return;
      }

      setIsModalOpen(true);
    } catch (error) {
      alert('Invalid input values');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Privy Solana Transfer Example</h2>
      
      <div style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Recipient Address:</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter Solana wallet address"
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Amount (SOL):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            min="0"
            step="0.001"
            style={inputStyle}
          />
        </div>

        <button 
          onClick={openTransferModal}
          style={{
            ...buttonStyle,
            opacity: !authenticated ? 0.6 : 1
          }}
          disabled={!authenticated}
        >
          {authenticated ? 'Send SOL' : 'Please Log In First'}
        </button>

        <p style={noteStyle}>
          💡 This example shows how to use Privy's embedded wallet for simple Solana transfers.
          The modal will handle wallet signing and transaction broadcasting automatically.
        </p>
      </div>

      <SimpleTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipientAddress={recipientAddress}
        amount={parseFloat(amount) || 0}
        onSuccess={handleTransferSuccess}
        onError={handleTransferError}
      />
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#1a1a1a',
  borderRadius: '16px',
  border: '1px solid #333',
  color: '#fff',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#4ecdc4',
  fontSize: '24px',
  fontWeight: 'bold',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#ccc',
};

const inputStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#2a2a2a',
  color: '#fff',
  fontSize: '16px',
  transition: 'all 0.2s ease',
};

const buttonStyle: React.CSSProperties = {
  padding: '16px 24px',
  backgroundColor: '#4ecdc4',
  color: '#000',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginTop: '10px',
};

const noteStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#888',
  fontStyle: 'italic',
  lineHeight: '1.5',
  marginTop: '10px',
  padding: '15px',
  backgroundColor: '#2a2a2a',
  borderRadius: '8px',
  border: '1px solid #333',
}; 