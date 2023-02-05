import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _menuItems: MenuItem[] = [
    {
      label:'Top',
      icon:'pi pi-fw pi-desktop',
      routerLink: ['/top']
    },
    {
      label:'Members',
      icon:'pi pi-fw pi-user',
      routerLink: ['/members']
    },
    {
      label:'Housing',
      icon:'pi pi-fw pi-home',
      routerLink: ['/housing']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public get menuItems() {
    return this._menuItems;
  }
}
