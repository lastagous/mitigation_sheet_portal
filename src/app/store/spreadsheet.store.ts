import { HttpClient } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { SkillModel } from '../model/skill';
import { RecastCheckModel, TimelineModel } from '../model/timeline';

@Injectable()
export class SpreadSheetStore {
  private apiKey: string = 'AIzaSyAn0osIBJR0dOg0nCvh56fm1Vq9mFYFQNQ';
  private _sheetId: string = '';
  private _sheetName: string = '';

  private _skillList: SkillModel[] = [];
  private _timelineList: TimelineModel[] = [];
  private _isCheckIndexList: number[] = [];

  constructor(private _httpClient: HttpClient) {}

  public get sheetId(): string {
    return this._sheetId;
  }

  public set sheetId(value: string) {
    this._sheetId = value;
  }

  public get sheetName(): string {
    return this._sheetName;
  }

  public set sheetName(value: string) {
    this._sheetName = value;
  }

  public get skillList(): SkillModel[] {
    return this._skillList;
  }

  public set skillList(value: SkillModel[]) {
    this._skillList = value;
  }

  public get timelineList(): TimelineModel[] {
    return this._timelineList;
  }

  public set timelineList(value: TimelineModel[]) {
    this._timelineList = value;
  }

  public get isCheckIndexList(): number[] {
    return this._isCheckIndexList;
  }

  public set isCheckIndexList(value: number[]) {
    this._isCheckIndexList = value;
  }

  public getMitigationSheet(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._httpClient.get(this.getSheetUrl()).subscribe((response: any) => {
        const values: string[][] = response?.values;
        const header: string[] = values[1];
        const job: string[] = values[2];
        const skill: string[] = values[3];
        const timeIndex: number = header.indexOf('Time');
        const actionIndex: number = header.indexOf('Action');
        const checkStart: number = 9;

        const iLength = values.length;
        for (var i = 7; i < iLength; i++) {
          const inner: string[] = values[i];
          if (values.indexOf(inner) < 7) return;
          const checkList: RecastCheckModel[] = [];
          const jLength: number = inner.length;
          for (var j = checkStart; j < jLength; j++) {
            if (this.skillList.find((value) => value.name == skill[j])) {
              const isCheck: boolean = inner[j] == 'TRUE';
              const targetSkill: SkillModel | undefined = this.skillList.find(
                (value) => value.name == skill[j]
              );
              const iconId: number = targetSkill ? targetSkill.id : 0;
              const folderNumber: string = (Math.floor(iconId / 1000) * 1000)
                .toString()
                .padStart(6, '0');

              checkList.push({
                job: job[j],
                skill: skill[j],
                isCheck: isCheck,
                imageUrl: `https://xivapi.com/i/${folderNumber}/${iconId
                  .toString()
                  .padStart(6, '0')}.png`,
              });
              if (
                isCheck &&
                !this.isCheckIndexList.includes(checkList.length - 1)
              )
                this.isCheckIndexList.push(checkList.length - 1);
            }
          }
          this.timelineList.push({
            time: inner[timeIndex],
            action: inner[actionIndex],
            checkList: checkList,
          });
        }

        var asc = function (a: number, b: number) {
          return a - b;
        };
        this.isCheckIndexList.sort(asc);
        console.log(this.isCheckIndexList);
        console.log(this.timelineList);
        resolve();
      });
    });
  }

  public getSkillSheet(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._httpClient.get(this.getSkillUrl()).subscribe((response: any) => {
        const values: string[][] = response?.values;
        const header: string[] = values[1];
        const nameIndex: number = header.indexOf('Skill');
        const timeIndex: number = header.indexOf('Time');
        const recastIndex: number = header.indexOf('Recast');
        const idIndex: number = header.indexOf('Icon ID');
        const isConvertImage: number = header.indexOf('Convert Image');
        values.forEach((value) => {
          if (value[isConvertImage] != 'TRUE') return;
          this.skillList.push({
            name: value[nameIndex],
            id: Number(value[idIndex]),
            time: Number(value[timeIndex]),
            recast: Number(value[recastIndex]),
          } as SkillModel);
        });
        console.log(this.skillList);
        resolve();
      });
    });
  }

  private getSheetUrl(): string {
    return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.sheetName}?key=${this.apiKey}`;
  }

  private getSkillUrl(): string {
    return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Skill?key=${this.apiKey}`;
  }
}
