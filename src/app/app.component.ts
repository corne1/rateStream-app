import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RateTableComponent } from './components/rate-table/rate-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RateTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
}
