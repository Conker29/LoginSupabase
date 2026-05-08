import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  ]
})
export class Tab1Page implements OnInit {
  photos: string[] = [];

  ngOnInit() {
    this.loadPhotos();
  }

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 90,
        saveToGallery: true
      });

      const imageUrl = photo.webPath || photo.path || '';
      if (!imageUrl) {
        return;
      }

      this.photos = [imageUrl, ...this.photos];
      localStorage.setItem('tab1_photos', JSON.stringify(this.photos));
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  loadPhotos() {
    const saved = localStorage.getItem('tab1_photos');
    if (saved) {
      this.photos = JSON.parse(saved);
    }
  }
}

