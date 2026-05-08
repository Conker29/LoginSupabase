import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon]
})
export class Tab2Page {
  async showFavorites() {
    await Toast.show({
      text: 'Aquí se mostrarán tus elementos favoritos',
      duration: 'short',
      position: 'bottom'
    });
  }
}
