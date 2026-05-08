import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonButton, IonIcon, IonSearchbar,
  IonGrid, IonRow, IonCol, IonImg, IonSpinner, IonBadge,
  IonSelect, IonSelectOption, IonLabel, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, starOutline, logoYoutube, linkOutline, alertCircleOutline } from 'ionicons/icons';

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: any;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonButton, IonIcon, IonSearchbar,
    IonGrid, IonRow, IonCol, IonImg, IonSpinner, IonBadge,
    IonSelect, IonSelectOption, IonLabel, IonItem
  ]
})
export class Tab1Page implements OnInit {
  private readonly MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  selectedMeal: Meal | null = null;
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  categories: Category[] = [];
  selectedCategory: string = '';

  constructor(private http: HttpClient) {
    addIcons({ searchOutline, starOutline, logoYoutube, linkOutline, alertCircleOutline });
  }

  ngOnInit() {
    this.loadCategories();
    this.loadMeals();
  }

  loadCategories() {
    const url = `${this.MEALDB_BASE_URL}/categories.php`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.categories = data.categories || [];
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  loadMeals(category?: string) {
    this.isLoading = true;
    this.errorMessage = '';

    let url = `${this.MEALDB_BASE_URL}/search.php?s=`;
    if (category) {
      url = `${this.MEALDB_BASE_URL}/filter.php?c=${category}`;
    }

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.meals = data.meals || [];
        this.filteredMeals = this.meals;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading meals:', err);
        this.errorMessage = 'Error al cargar recetas';
        this.isLoading = false;
      }
    });
  }

  searchMeals() {
    if (!this.searchTerm.trim()) {
      this.loadMeals(this.selectedCategory);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const url = `${this.MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(this.searchTerm)}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.filteredMeals = data.meals || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching meals:', err);
        this.errorMessage = 'Error en la búsqueda';
        this.isLoading = false;
      }
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    if (this.searchTerm.length > 2) {
      this.searchMeals();
    } else if (this.searchTerm.length === 0) {
      this.loadMeals(this.selectedCategory);
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.loadMeals(this.selectedCategory);
  }

  selectMeal(meal: Meal) {
    this.isLoading = true;
    // If it's a filter result, load full details
    if (!meal.strInstructions) {
      const url = `${this.MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`;
      this.http.get<any>(url).subscribe({
        next: (data) => {
          this.selectedMeal = data.meals[0];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading meal details:', err);
          this.errorMessage = 'Error al cargar detalles de la receta';
          this.isLoading = false;
        }
      });
    } else {
      this.selectedMeal = meal;
      this.isLoading = false;
    }
  }

  clearSelection() {
    this.selectedMeal = null;
  }

  getIngredients(meal: Meal): string[] {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push(`${measure} ${ing}`.trim());
      }
    }
    return ingredients;
  }

  getImageUrl(url: string): string {
    return url || 'assets/icon/favicon.png';
  }
}