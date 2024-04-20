import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveData(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }

  public getData(key: string) {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      return null;
    }
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

}
