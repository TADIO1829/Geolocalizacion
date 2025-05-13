import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class HomePage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;

  async ngOnInit() {
    // Solicita permisos de ubicación
    await Geolocation.requestPermissions();
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
  abrirEnGoogleMaps() {
  if (this.latitude !== null && this.longitude !== null) {
    const url = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`;
    window.open(url, '_system'); // '_system' abre en el navegador o app nativa si está disponible
  } else {
    console.warn('Ubicación no disponible aún.');
  }
}

}