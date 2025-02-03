import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigChartService {

  transitionComplete(): boolean {
    return true;
  }
}
