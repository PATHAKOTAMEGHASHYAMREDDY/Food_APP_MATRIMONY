import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFoodItem } from '../models/food-item';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}


  getAllFoods(): Observable<IFoodItem[]> {
    console.log("getallfoods")
    return this.http.get<IFoodItem[]>(this.baseUrl);
  }


  getFoodById(id: number): Observable<IFoodItem> {
    console.log('getfoodbyid');
    console.log(this.baseUrl + "/" + id)
    return this.http.get<IFoodItem>(`${this.baseUrl}/${id}`);
 
  }


  updateFood(id: number, food: IFoodItem): Observable<any> {
    console.log("update food")
    return this.http.put(`${this.baseUrl}/${id}`, food);
  }
  deleteFood(id:number):Observable<any>{
    console.log("delete food")
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
