import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineModel } from 'src/app/model/timeline';
import { SpreadSheetStore } from 'src/app/store/spreadsheet.store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _ssStore: SpreadSheetStore
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(async (params) => {
      this._ssStore.sheetId = params['sheetId'];
      this._ssStore.sheetName = params['sheetName'];
      await this._ssStore.getSkillSheet();
      await this._ssStore.getMitigationSheet();
    });
  }

  public get timelineList(): TimelineModel[] {
    return this._ssStore.timelineList;
  }
}
