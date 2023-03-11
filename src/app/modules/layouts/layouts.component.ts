import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  hideSideBar:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  openBar(){
    this.hideSideBar = !this.hideSideBar
  }

}
