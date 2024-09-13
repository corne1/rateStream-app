import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { bufferTime, scan } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Rate } from '../models/rate.model';
import { environment } from '../../environments/environment';
import { WebSocketMessage, WebSocketTrade } from '../models/webSocket.model';
import { WebSocketRequest } from '../models/webSocketRequest.model';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  // WebSocket для отправки данных (subscribe/unsubscribe)
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Указываем URL WebSocket сервера для отправки
    this.socket$ = webSocket<any>(environment.apiUrl);
  }

  /**
   * Подписка на данные по символу
   * 
   * @param symbol Символ (например, 'AAPL' для Apple)
   */
  subscribeToSymbol(symbol: string): void {
    // Отправляем данные через sendSocket$
    const message: WebSocketRequest = {
      type: 'subscribe',
      symbol
    };
    this.socket$.next(message);
  }

  /**
   * Получение котировок
   * 
   * @returns Observable<Rate> Поток котировок в реальном времени
   */
  getRates(): Observable<Rate[]> {
    return this.socket$.pipe(
      filter(message => message.type === 'trade' && message.data.length > 0), // Фильтруем только сообщения с типом 'trade'
      bufferTime(500), // Собираем данные каждые 500 мс
      scan((acc: Rate[], messages: WebSocketMessage[]) => {
        messages.forEach(message => {
          message.data.forEach((trade: WebSocketTrade) => {
            // Найти существующую запись с таким же символом
            const index = acc.findIndex(rate => rate.symbol === trade.s);

            const newRate: Rate = {
              time: new Date(trade.t),
              symbol: trade.s,
              bid: trade.p,
              ask: parseFloat((trade.p + 0.01).toFixed(2))  // Имитация ask на основе bid
            };

            if (index > -1) {
              // Обновляем существующую запись
              acc[index] = newRate;
            } else {
              // Добавляем новую запись
              acc.push(newRate);
            }
          });
        });

        return acc;
      }, [])
    );
  }

  /**
   * Отключение от WebSocket
   */
  unsubscribeFromSymbol(symbol: string): void {
    const message: WebSocketRequest = {
      type: 'unsubscribe',
      symbol
    };
    this.socket$.next(message);
  }
}
