import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[]|undefined;

  constructor() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Balance',
        icon: 'pi pi-chart-line',
        routerLink: ['/balance'],
      },
      {
        label: 'Expenses',
        icon: 'pi pi-wallet',
        routerLink: ["/expenses"]
      },
      {
        label: 'Incomes',
        icon: 'pi pi-dollar',
        routerLink: ["/incomes"]
      },
    ];
  }
}
