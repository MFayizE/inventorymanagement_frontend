import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  submenuIndex = -1;
  menus = [
    { name: "Dashboard", link: "/admin/dash", icon: "dashboard", hasSubmenu: false },
    { name: "Inventory", link: "/admin/inventory", icon: "inventory_2", hasSubmenu: false },
    { name: "Incomes", link: "/", icon: "payments", margin: true, hasSubmenu: true, submenus: [
      { name: "Invoices", link: "/", icon: "receipt_long" },
      { name: "Customers", link: "/submenu2", icon: "group" },
      ]
    },
    { name: "Expenses", icon: "local_shipping", hasSubmenu: true, submenus: [
      { name: "Bills", link: "/admin/expenses/bills", icon: "receipt_long" },
      { name: "Vendors", link: "/submenu2", icon: "group" },
      ]
    },
    { name: "Banking", link: "/", icon: "account_balance", hasSubmenu: false },
    { name: "Reports", link: "/", icon: "analytics", margin: true, hasSubmenu: true, submenus: [

    ]
  },
    { name: "Setting", link: "/", icon: "settings", hasSubmenu: false },
  ];
  open = true;
  submenuLeft: number = 0;
  submenuTop: number = 0;
  submenuHeight: number = 0;
  constructor() { }
  @HostListener('window:resize')
  onWindowResize() {
    this.open = window.innerWidth >= 768; // 768 is the width of md breakpoint
  }
  ngOnInit(): void {
  }
  
  isReportsMenu(menuName: string) {
    return menuName === 'Reports';
  }
  toggleMenu() {
    this.open = !this.open;
  }


  openSubmenu(index: number): void {
    if (this.submenuIndex === index) {
      this.submenuIndex = index; // set submenuIndex to current index to keep the submenu open
    } else {
      this.submenuIndex = index;
    }
  }
  isSubmenuOpen(index: number): boolean {
    return this.submenuIndex === index;
  }
}
