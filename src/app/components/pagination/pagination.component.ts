import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  //@Input() currentPage: number;
  //@Input() totalPages: number;
  items: any[] = [/* your dataset */];
  pageSize = 10;
  currentPage = 1;
  constructor() {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    console.log(`Page changed to ${page}`);
  }


}
