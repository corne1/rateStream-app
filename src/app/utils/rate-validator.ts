import { Rate } from '../models/rate.model';

/**
 * Проверяет корректность котировки. Ask всегда должен быть больше или равен bid.
 * 
 * @param rate - объект котировки
 * @returns true, если котировка корректна
 */
export function isValidRate(rate: Rate): boolean {
    return rate.ask >= rate.bid;
}
