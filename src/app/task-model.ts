export class TaskModel {
  taskID?: Number;
  taskName?: String;
  startDate?: Date;
  endDate?: Date;
  duration?: Number;
  progress?: Number;
  priority?: String;
  isParent?: Boolean;
  parentID?: Number;
}
