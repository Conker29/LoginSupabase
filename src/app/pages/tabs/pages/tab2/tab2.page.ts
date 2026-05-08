import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

export interface UserPhoto {
  fileName: string;
  webviewPath?: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class Tab2Page {
  photos: UserPhoto[] = [];

  constructor(private alertController: AlertController) {}

  async takePicture() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
        saveToGallery: true
      });

      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift(savedImageFile);
    } catch (error) {
      console.error('Error taking picture:', error);
      this.showAlert('Error', 'No se pudo tomar la foto');
    }
  }

  private async savePicture(cameraPhoto: any): Promise<UserPhoto> {
    const base64Data = cameraPhoto.dataUrl;

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    return {
      fileName,
      webviewPath: cameraPhoto.dataUrl
    };
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}