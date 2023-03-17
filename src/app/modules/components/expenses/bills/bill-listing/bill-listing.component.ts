import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-listing',
  templateUrl: './bill-listing.component.html',
  styleUrls: ['./bill-listing.component.scss']
})
export class BillListingComponent implements OnInit {
  loader: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
