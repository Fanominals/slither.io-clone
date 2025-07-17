import React from 'react';
import { LoadingScreenProps } from '../../types';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Connecting...' }) => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="spinner"></div>
                <div>{message}</div>
            </div>
        </div>
    );
}; 