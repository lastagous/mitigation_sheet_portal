import { Injectable } from '@angular/core';
import { RecastCheckModel, TimelineModel } from '../model/timeline';
import { SpreadSheetStore } from './spreadsheet.store';

@Injectable()
export class TableStore {
  private _viewHeaderList: RecastCheckModel[] = [];
  private _viewIconList: TimelineModel[] = [];

  constructor(private _ssStore: SpreadSheetStore) {}

  public get viewHeaderList(): RecastCheckModel[] {
    return this._viewHeaderList;
  }

  public set viewHeaderList(value: RecastCheckModel[]) {
    this._viewHeaderList = value;
  }

  public get viewIconList(): TimelineModel[] {
    return this._viewIconList;
  }

  public set viewIconList(value: TimelineModel[]) {
    this._viewIconList = value;
  }

  public generateTableData(): void {
    const timelineList: TimelineModel[] = this._ssStore.timelineList;
    const isCheckIndexList = this._ssStore.isCheckIndexList;
    isCheckIndexList.forEach((isCheckIndex) => {
      this.viewHeaderList.push(timelineList[0].checkList[isCheckIndex]);
    });

    timelineList.forEach((timeline) => {
      const checkList: RecastCheckModel[] = [];
      isCheckIndexList.forEach((isCheckIndex) => {
        checkList.push(timeline.checkList[isCheckIndex]);
      });
      this.viewIconList.push({
        time: timeline.time,
        action: timeline.action,
        checkList: checkList,
      } as TimelineModel);
    });
  }
}
