import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogConfirmService } from 'src/app/shared/components/services/dialog-confirm.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  submenuIndex = -1;
  menus = [
    { name: "Dashboard", link: "/admin/dash", icon: "dashboard", hasSubmenu: false },
    { name: "Inventory", link: "/admin/inventory", icon: "inventory_2", hasSubmenu: true, submenus: [
      { name: "Categories", link: "/admin/inventory/category", icon: "category" },
    ]
  },
    {
      name: "Incomes", link: "#", icon: "payments", margin: true, hasSubmenu: true, submenus: [
        { name: "Invoices", link: "/admin/income/invoices", icon: "receipt_long" },
        { name: "Customers", link: "/submenu2", icon: "group" },
      ]
    },
    {
      name: "Expenses", icon: "local_shipping", hasSubmenu: true, submenus: [
        { name: "Bills", link: "/admin/expenses/bills", icon: "receipt_long" },
        { name: "Vendors", link: "/submenu2", icon: "group" },
      ]
    },
    {
      name: "Banking", link: "/", icon: "account_balance", hasSubmenu: true, submenus: [
        { name: "Accounts", link: "/admin/banking/accounts", icon: "account_balance_wallet" },
      ]
    },
    {
      name: "Reports", link: "/", icon: "analytics", margin: true, hasSubmenu: true, submenus: [

      ]
    },
    { name: "Setting", link: "/", icon: "settings", hasSubmenu: true, submenus: [
        { name: "Log Out", link: "/admin/banking/accounts", icon: "logout" },
      ]
    }
  ];
  open = true;
  constructor(private router: Router, private dialog: DialogConfirmService) { }
  @HostListener('window:resize')
  onWindowResize() {
    this.open = window.innerWidth >= 768; // 768 is the width of md breakpoint
  }
  ngOnInit(): void {
  }

  toggleMenu() {
    this.open = !this.open;
  }


  onClickLogOut(){
    this.dialog
      .confirmDialog({
        title: 'Log Out?',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          localStorage.clear();
          this.router.navigateByUrl('auth')
        }
      });
  }
  openSubmenu(index: number, isSubMenu: boolean) {
    if (this.menus[index].hasSubmenu) {
      if (this.submenuIndex === index && !isSubMenu) {
        // submenu is already open and a menu item is clicked, hide it
        this.submenuIndex = -1;
        console.log('Closed submenu at index', index);
      } else if (!isSubMenu) {
        // show submenu if not already open and a menu item is clicked
        this.submenuIndex = index;
        console.log('Opened submenu at index', index);
      }
    }
  }
}
