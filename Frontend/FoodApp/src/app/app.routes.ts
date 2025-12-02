import { Routes } from '@angular/router';
import { FoodListComponent } from './components/food-list/food-list.component';

export const routes: Routes = [
  { 
    path: '', 
    component: FoodListComponent 
  },
  { 
    path: 'food-list', 
    component: FoodListComponent
  },
  { 
    path: 'edit-food/:id', 
    loadComponent: () => import('./components/edit-food/edit-food.component').then(m => m.EditFoodComponent)
  }
];
