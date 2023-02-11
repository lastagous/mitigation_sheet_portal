export class TimelineModel {
  time: string;
  action: string;
  checkList: RecastCheckModel[];
}

export class RecastCheckModel {
  job: string;
  skill: string;
  isCheck: boolean;
  imageUrl: string;
}
