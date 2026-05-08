import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, flagOutline } from 'ionicons/icons';

interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: any;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
  };
  languages?: any;
  currencies?: any;
  borders?: string[];
  timezones: string[];
  continents: string[];
  independent: boolean;
  unMember: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  ]
})
export class Tab1Page implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  selectedCountry: Country | null = null;
  searchTerm: string = '';

  constructor(private http: HttpClient) {
    addIcons({ searchOutline, flagOutline });
  }

  ngOnInit() {
    this.loadAllCountries();
  }

  loadAllCountries() {
    this.http.get<Country[]>('https://restcountries.com/v3.1/name/{name}').subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      }
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.filterCountries();
  }

  filterCountries() {
    if (!this.searchTerm.trim()) {
      this.filteredCountries = this.countries;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(term) ||
      country.name.official.toLowerCase().includes(term) ||
      (country.capital && country.capital.some(cap => cap.toLowerCase().includes(term)))
    );
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
  }

  clearSelection() {
    this.selectedCountry = null;
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  getLanguages(languages: any): string {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  }

  getCurrencies(currencies: any): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map((curr: any) => curr.name).join(', ');
  }
}

