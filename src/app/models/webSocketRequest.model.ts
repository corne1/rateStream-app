export interface WebSocketRequest {
    type: 'subscribe' | 'unsubscribe';
    symbol: string;
}