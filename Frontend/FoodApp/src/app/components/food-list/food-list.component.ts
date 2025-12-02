import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { IFoodItem } from '../../models/food-item';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent {
  private router = inject(Router);
  private foodService = inject(FoodService);

  foodItems: IFoodItem[] = [];

  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  ngOnInit(): void {
    debugger;
    this.getAllFoods();
  }
  getAllFoods(): void {
    this.foodService.getAllFoods().subscribe({
      next: (foods) => {
        this.foodItems = foods; // update table with data
      },
      error: (err) => console.error(err),
    });
    // No this.router.navigate here, because we don't want to change pages
  }

  editFood(id: number): void {
    // alert('⚠️ This feature is only available for admins.');
    // Uncomment below to allow navigation for testing:
    this.router.navigate(['/edit-food', id]);
  }

  deleteFood(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.foodService.deleteFood(id).subscribe({
        next: () => {
          console.log(`Food item with ID ${id} deleted.`);
          this.foodItems = this.foodItems.filter((item) => item.id !== id);
        },
        error: (err) => {
          console.error('Error deleting food item:', err);
        },
      });
    }
  }
}
/*
subscribe({
  next: ...,
  error: ...,
  complete: ...
})
  In Angular (RxJS), the subscribe() method accepts three optional callbacks:


next → runs when the Observable successfully emits a value


error → runs if the Observable throws an error


complete → runs when the Observable finishes emitting values (optional)
*/
