import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component'; // <-- 1. IMPORTANTE: Verifique se o caminho da pasta está certinho

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent], // <-- 2. ADICIONE AQUI (pode apagar o RouterOutlet se não estiver usando)
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'monitor-unifei';
}