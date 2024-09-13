import { TestBed } from '@angular/core/testing';

import { RateService } from './rate.service';
import { interval, map, take } from 'rxjs';

describe('RateService - High Load Test', () => {
  let service: RateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateService);
  });

  it('should handle high frequency of updates', (done) => {
    // Имитация высокочастотных обновлений с использованием RxJS interval
    const mockHighFrequencyStream = interval(50).pipe( // Интервал 50 мс (20 обновлений в секунду)
      take(100), // Всего 100 обновлений
      map(i => ({
        type: 'trade',
        data: [
          { t: Date.now(), s: `EURUSD`, p: 1.1234 + (i / 100) } // Пример торговых данных
        ]
      }))
    );

    // Мокаем метод getRates, чтобы он использовал наш mockHighFrequencyStream
    spyOn(service, 'getRates').and.returnValue(
      mockHighFrequencyStream.pipe(
        map(message => {
          return message.data.map(trade => ({
            time: new Date(trade.t),
            symbol: trade.s,
            bid: trade.p,
            ask: parseFloat((trade.p + 0.01).toFixed(2)) // Округляем ask
          }));
        })
      )
    );

    // Подписываемся на поток данных и проверяем корректность работы
    service.getRates().subscribe(rates => {
      expect(rates.length).toBeGreaterThan(0);
      rates.forEach(rate => {
        expect(rate.symbol).toBe('EURUSD');
        expect(rate.ask).toBeGreaterThanOrEqual(rate.bid); // ask >= bid
      });
    }, done.fail, done);
  });
});