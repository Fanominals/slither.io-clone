import React, { useState } from 'react';
import { MenuScreenProps } from '../../types';

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
    const [nickname, setNickname] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedNickname = nickname.trim();
        if (trimmedNickname) {
            onStartGame(trimmedNickname);
        }
    };

    return (
        <div className="screen">
            <div className="menu-container">
                <h1 className="game-title">slither.io</h1>
                <p className="game-subtitle">Don't run into other players!</p>
                
                <form className="input-container" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nickname" 
                        maxLength={20} 
                        autoComplete="off"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="play-button">
                        Play
                    </button>
                </form>
            </div>
        </div>
    );
}; 