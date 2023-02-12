import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecastCheckModel, TimelineModel } from 'src/app/model/timeline';
import { SpreadSheetStore } from 'src/app/store/spreadsheet.store';
import { TableStore } from 'src/app/store/table.store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _ssStore: SpreadSheetStore,
    private _tableStore: TableStore
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(async (params) => {
      this._ssStore.sheetId = params['sheetId'];
      this._ssStore.sheetName = params['sheetName'];
      await this._ssStore.getSkillSheet();
      await this._ssStore.getMitigationSheet();
      this._tableStore.generateTableData();
    });
  }

  public get headerList(): RecastCheckModel[] {
    return this._tableStore.viewHeaderList;
  }

  public get timelineList(): TimelineModel[] {
    return this._tableStore.viewIconList;
  }

  public get sheetName(): string {
    return this._ssStore.sheetName;
  }
}
