import { useEffect, useRef, useCallback, useState } from 'react';
import { socketManager } from '../services/SocketManager';
import { UseSocketReturn } from '../types';

export function useSocket(): UseSocketReturn {
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventHandlersRef = useRef<Map<string, (...args: any[]) => void>>(new Map());

    const connect = useCallback(() => {
        setError(null);
        socketManager.connect();
    }, []);

    const disconnect = useCallback(() => {
        socketManager.disconnect();
        setConnected(false);
    }, []);

    const joinGame = useCallback((nickname: string) => {
        socketManager.joinGame(nickname);
    }, []);

    const joinPaidGame = useCallback((serverId: string, walletAddress: string, nickname: string) => {
        socketManager.joinPaidGame(serverId, walletAddress, nickname);
    }, []);

    const sendPlayerMove = useCallback((angle: number, isBoosting: boolean) => {
        socketManager.sendPlayerMove(angle, isBoosting);
    }, []);

    // Register event handler
    const on = useCallback((event: string, handler: (...args: any[]) => void) => {
        socketManager.on(event, handler);
        eventHandlersRef.current.set(event, handler);
    }, []);

    // Unregister event handler
    const off = useCallback((event: string) => {
        const handler = eventHandlersRef.current.get(event);
        if (handler) {
            socketManager.off(event, handler);
            eventHandlersRef.current.delete(event);
        }
    }, []);

    useEffect(() => {
        // Set up connection status handlers
        const handleConnected = () => setConnected(true);
        const handleDisconnected = () => setConnected(false);
        const handleError = (error: any) => setError(error.message || 'Connection failed');

        socketManager.on('connected', handleConnected);
        socketManager.on('disconnected', handleDisconnected);
        socketManager.on('connect_error', handleError);

        // Cleanup on unmount
        return () => {
            socketManager.off('connected', handleConnected);
            socketManager.off('disconnected', handleDisconnected);
            socketManager.off('connect_error', handleError);
            
            // Clean up all registered event handlers
            for (const [event, handler] of eventHandlersRef.current) {
                socketManager.off(event, handler);
            }
            eventHandlersRef.current.clear();
            
            socketManager.disconnect();
        };
    }, []);

    return {
        socket: socketManager,
        connected,
        error,
        connect,
        disconnect,
        joinGame,
        joinPaidGame,
        sendPlayerMove,
        on,
        off
    };
} 