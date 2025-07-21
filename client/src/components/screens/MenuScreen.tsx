import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { PaymentModal } from '../PaymentModal';
import { GameServerInfo } from '../../types';
import { useGameContext } from '../../contexts/GameContext';
import { MenuScreenProps } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useUsernameValidation } from '../../hooks/useUsernameValidation';
import { WalletBalance } from '../WalletBalance';

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
    const [nickname, setNickname] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    
    const { isAuthenticated, user, userProfile, username, hasUsername, login, logout, isLoading, setUsername } = useAuth();
    const { user: privyUser, authenticated } = usePrivy();
    const { setSelectedServer } = useGameContext();
    const usernameValidation = useUsernameValidation(usernameInput, username);

    // Set initial username input when user/username changes
    useEffect(() => {
        if (username) {
            setUsernameInput(username);
        } else {
            setUsernameInput('');
        }
        setIsEditing(false);
        setSaveSuccess(false);
    }, [username]);

    const handlePlayClick = () => {
        if (!authenticated) {
            login();
            return;
        }
        setShowPaymentModal(true);
    };

    const handleJoinGame = (serverInfo: GameServerInfo) => {
        setSelectedServer(serverInfo);
        setShowPaymentModal(false);
        
        // Use the appropriate nickname for the game
        const gameNickname = isAuthenticated ? (username || '') : nickname.trim();
        onStartGame(gameNickname);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handlePlayClick();
    };

    const handleUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(e.target.value);
        setIsEditing(true);
        setSaveSuccess(false);
    };

    const handleSaveUsername = async () => {
        if (!usernameValidation.isValid || isSaving) return;
        
        setIsSaving(true);
        const success = await setUsername(usernameInput);
        
        if (success) {
            setSaveSuccess(true);
            setIsEditing(false);
            setTimeout(() => setSaveSuccess(false), 2000);
        }
        setIsSaving(false);
    };

    const canPlay = isAuthenticated ? hasUsername : nickname.trim().length > 0;

    if (isLoading) {
        return (
            <div className="screen">
                <div className="menu-container">
                    <h1 className="game-title">slither.io</h1>
                    <p className="game-subtitle">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="screen">
            {/* Authentication Section - Top Right */}
            <div className="auth-section-top-right">
                {!isAuthenticated ? (
                    <button 
                        onClick={login} 
                        className="login-button-top-right"
                        type="button"
                    >
                        Log In
                    </button>
                ) : (
                    <div className="user-info-top-right">
                        <p className="welcome-text-top-right">
                            Welcome, {username || user?.email?.address || 'Player'}!
                        </p>
                        <button 
                            onClick={logout} 
                            className="logout-button-top-right"
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Wallet Balance Section - Top Left */}
            {isAuthenticated && (
                <div className="wallet-section-top-left">
                    <WalletBalance />
                </div>
            )}

            <div className="menu-container">
                <h1 className="game-title">slither.io</h1>
                <p className="game-subtitle">Don't run into other players!</p>
                
                {/* Game Start Section */}
                <div className="input-container">
                    {isAuthenticated ? (
                        // Authenticated: Username management
                        <div className="username-section">
                            <div className="username-input-container">
                                <input 
                                    type="text" 
                                    placeholder={hasUsername ? (username || "Set your username") : "Set your username"}
                                    value={usernameInput}
                                    onChange={handleUsernameInputChange}
                                    className={`username-input ${usernameValidation.validationClass}`}
                                    maxLength={20}
                                    autoComplete="off"
                                    autoFocus={!hasUsername}
                                />
                                {usernameInput.trim() && (
                                    <button 
                                        type="button"
                                        onClick={handleSaveUsername}
                                        disabled={!usernameValidation.isValid || isSaving || !isEditing}
                                        className={`save-username-button ${saveSuccess ? 'saved' : ''} ${(!usernameValidation.isValid || !isEditing) ? 'disabled' : ''}`}
                                    >
                                        {isSaving ? (
                                            <span className="loading-spinner"></span>
                                        ) : saveSuccess ? (
                                            <>
                                                <span className="checkmark">✓</span>
                                                Saved
                                            </>
                                        ) : hasUsername && usernameInput === username ? (
                                            <>
                                                <span className="checkmark">✓</span>
                                                Saved
                                            </>
                                        ) : hasUsername && usernameInput !== username ? (
                                            'Update'
                                        ) : (
                                            'Save'
                                        )}
                                    </button>
                                )}
                            </div>
                            {/* Username validation feedback */}
                            {usernameValidation.isChecking && (
                                <div className="username-checking">
                                    <span className="loading-spinner"></span>
                                    Checking availability...
                                </div>
                            )}
                            {!usernameValidation.isChecking && usernameValidation.error && (
                                <div className="username-error">
                                    ❌ {usernameValidation.error}
                                </div>
                            )}
                            {!usernameValidation.isChecking && usernameValidation.isValid && usernameInput.trim() && usernameInput !== username && (
                                <div className="username-valid">
                                    ✅ Username available
                                </div>
                            )}
                            {!usernameValidation.isChecking && usernameInput.trim() && usernameInput === username && (
                                <div className="username-current">
                                    Current username
                                </div>
                            )}
                        </div>
                    ) : (
                        // Not authenticated: Regular nickname input
                        <input 
                            type="text" 
                            placeholder="Nickname" 
                            maxLength={20} 
                            autoComplete="off"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            autoFocus
                            className="nickname-input"
                        />
                    )}
                    
                    <button 
                        type="submit" 
                        onClick={handleSubmit}
                        disabled={!canPlay}
                        className={`play-button ${!canPlay ? 'disabled' : ''}`}
                    >
                        {authenticated ? 'Play Game' : 'Connect Wallet to Play'}
                    </button>
                </div>

                {authenticated && privyUser?.wallet?.address && (
                    <div className="wallet-info">
                        <p>Connected: {privyUser.wallet.address.slice(0, 6)}...{privyUser.wallet.address.slice(-4)}</p>
                    </div>
                )}
            </div>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onJoinGame={handleJoinGame}
            />
        </div>
    );
}; 