import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { Toast } from '@capacitor/toast';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class Tab3Page {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async logout() {
    try {
      await this.supabaseService.logout();
      await Toast.show({
        text: 'Sesión cerrada exitosamente',
        duration: 'short',
        position: 'bottom'
      });
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      await Toast.show({
        text: 'Error al cerrar sesión',
        duration: 'short',
        position: 'bottom'
      });
    }
  }
}

