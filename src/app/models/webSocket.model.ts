export interface WebSocketMessage {
    type: string;
    data: WebSocketTrade[];
}

export interface WebSocketTrade {
    s: string;
    p: number;
    t: number;
}