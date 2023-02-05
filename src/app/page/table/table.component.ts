import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  sheetId: string = '';
  sheetName: string = '';
  apiKey: string = 'AIzaSyAn0osIBJR0dOg0nCvh56fm1Vq9mFYFQNQ';

  constructor(
    private _route: ActivatedRoute,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.sheetId = params['sheetId'];
      this.sheetName = params['sheetName'];
      this._httpClient.get(this.getSheetUrl()).subscribe((response) => {
        console.log(response);
      });
    });
  }

  public getSheetUrl(): string {
    return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.sheetName}?key=${this.apiKey}`;
  }
}
