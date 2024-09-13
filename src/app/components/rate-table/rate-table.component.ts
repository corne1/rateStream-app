import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate } from '../../models/rate.model';
import { RateService } from '../../services/rate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rate-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-table.component.html',
  styleUrl: './rate-table.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RateTableComponent implements OnInit, OnDestroy {
  public rates$: Observable<Rate[]>;

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
    // Подписываемся на данные по символу 'TSLA'
    this.rateService.subscribeToSymbol('TSLA');
    this.rates$ = this.rateService.getRates();
  }

  ngOnDestroy(): void {
    // Отписываемся от данных по символу 'TSLA' при уничтожении компонента
    this.rateService.unsubscribeFromSymbol('TSLA');

  }
}
