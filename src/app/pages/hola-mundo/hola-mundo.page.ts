import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-hola-mundo',
  templateUrl: './hola-mundo.page.html',
  styleUrls: ['./hola-mundo.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class HolaMundoPage {
  constructor() { }
}