import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FoodService } from '../../services/food.service';
import { IFoodItem } from '../../models/food-item';


@Component({
  selector: 'app-edit-food',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css'],
})
export class EditFoodComponent implements OnInit {
  foodForm!: FormGroup;
  foodId!: number; //Definite Assignment Assertion operator in TypeScript
  //“I promise that this variable will be assigned a value before it is used.”
//Even though TypeScript cannot detect it at compile time.


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    console.log('ng on init of edit food');
    this.foodId = Number(this.route.snapshot.paramMap.get('id'));
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
    });


    this.foodService.getFoodById(this.foodId).subscribe({
      next: (food) => {
        console.log(this.foodId);
        this.foodForm.patchValue(food);
      },
      error: () =>
        this.snackBar.open('Failed to load food', 'Close', { duration: 3000 }),
    });
  }


  onSubmit(): void {
    debugger
    if (this.foodForm.invalid) return;


    const updatedFood: IFoodItem = {
      id: this.foodId,
      ...this.foodForm.value,
    };


    this.foodService.updateFood(this.foodId, updatedFood).subscribe({
      next: () => {
        this.snackBar.open('Food updated', 'Close', { duration: 3000 });
        this.router.navigate(['/food-list']);
      },
      error: () =>
        this.snackBar.open('Update failed', 'Close', { duration: 3000 }),
    });
  }
}
