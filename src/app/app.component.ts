import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DropDownList,
  DropDownListComponent,
} from '@syncfusion/ej2-angular-dropdowns';
import { SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import {
  DataStateChangeEventArgs,
  EditSettingsModel,
  TreeGridComponent,
} from '@syncfusion/ej2-angular-treegrid';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { Observable } from 'rxjs';
import sampleData from './jsontreegriddata';
import { TaskStoreService } from './task-store.service';
// import fs from 'fs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public tasks: Observable<DataStateChangeEventArgs>;
  // public allTasks: any = [];

  constructor(private TaskService: TaskStoreService) {
    this.tasks = TaskService;
    // this.TaskService.getAllTasks().subscribe(data => {
    //   console.log({data});
    //   this.data = data;
    // })
  }
  public data: Object = [];

  public pageSettings: Object = {};
  public toolbar: String[] = [''];
  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  public editSettings!: EditSettingsModel;
  public selectionSettings: Object = {};
  public contextMenuItems: Object = {};
  public selectedRows: Object[] = [];
  public itemCopied: boolean = false;
  public editparams: Object = {};
  public editOptions: Object = {};
  public formatOptions: Object = {};
  public frozenColumns: number = 0;
  public slectedColumn: any;
  public filterSettings: Object = {};
  public sortSettings: Object = {};
  public allowFiltering: boolean = false;
  public templateOptions: object = {};
  public dropDownFilter!: DropDownList;
  public taskData!: ITaskModel;
  public selectedRecordForAdd: Object = {};
  public isEditMode: boolean = false;
  public isMultipleSelection: boolean = false;
  public copiedRow: Object[] = [];
  public cutedRow: Object[] = [];
  public selectedRowsForCut: Object[] = [];

  public columns: any[] = [
    {
      field: 'taskID',
      headerText: 'Task ID',
      width: '100',
      textAlign: 'Right',
      type: 'number',
      isPrimaryKey: true,
      edit: this.editparams,
      editType: '',
    },
    {
      field: 'taskName',
      headerText: 'Task Name',
      width: '220',
    },
    {
      field: 'startDate',
      headerText: 'Start Date',
      width: '135',
      textAlign: 'Right',
      type: 'number',
      edit: this.editOptions,
      editType: 'datepickeredit',
    },
    {
      field: 'endDate',
      headerText: 'End Date',
      width: '135',
      textAlign: 'Right',
      type: 'number',
      edit: this.editOptions,
      editType: 'datepickeredit',
    },
    {
      field: 'duration',
      headerText: 'Duration',
      width: '120',
      textAlign: 'Right',
      type: 'number',
    },
    {
      field: 'progress',
      headerText: 'Progress',
      width: '120',
      textAlign: 'Right',
      type: 'number',
    },
    {
      field: 'priority',
      headerText: 'Priority',
      width: '135',
      textAlign: 'Left',
      type: 'number',
    },
  ];

  @ViewChild('dropdown1')
  public dropdown1!: DropDownListComponent;

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.TaskService.execute(state);
    console.log({ eve: state });
  }

  ngOnInit(): void {
    this.TaskService.getAllTasks().subscribe((data) => {
      console.log({ data });
      this.data = data;
    });
    // this.data = [...sampleData, ...sampleData, ...sampleData, ...sampleData, ...sampleData, ...sampleData, ...sampleData, ...sampleData];
    console.log({ treegrid: this.treegrid, data: this.data });
    // this.data = [...sampleData];
    this.pageSettings = { pageSize: 50 };
    this.toolbar = ['ColumnChooser', 'Add', 'Edit', 'Delete'];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      newRowPosition: 'Below',
      showDeleteConfirmDialog: true,
      allowEditOnDblClick: true,
    };
    this.editOptions = { params: { format: 'y/M/d' } };
    this.formatOptions = { format: 'y/M/d', type: 'date' };
    this.selectionSettings = { type: 'Single' };
    this.filterSettings = {
      type: 'FilterBar',
      hierarchyMode: 'Parent',
      mode: 'Immediate',
    };
    this.contextMenuItems = [
      { text: 'Add Next', target: '.e-content', id: 'addNext' },
      { text: 'Add Child', target: '.e-content', id: 'addChild' },
      { text: 'Delete Row', target: '.e-content', id: 'delRow' },
      { text: 'Edit Row', target: '.e-content', id: 'editRow' },
      {
        text: 'Multiselect',
        target: '.e-content',
        id: 'multiSelect',
        iconCss: 'e-icons e-active-checkbox float-right e-primary',
      },
      { text: 'Copy Rows', target: '.e-content', id: 'copyRows' },
      { text: 'Cut Rows', target: '.e-content', id: 'cutRows' },
      { text: 'Paste Next', target: '.e-content', id: 'pasteNext' },
      { text: 'Paste Child', target: '.e-content', id: 'pasteChild' },
      { text: 'Edit Column', target: '.e-headercontent', id: 'editCol' },
      { text: 'New Column', target: '.e-headercontent', id: 'newCol' },
      { text: 'Delete Column', target: '.e-headercontent', id: 'delCol' },
      { text: 'Choose Column', target: '.e-headercontent', id: 'chooseCol' },
      {
        text: 'Freeze Column',
        target: '.e-headercontent',
        id: 'freezeCol',
        iconCss: 'e-icons e-active-checkbox float-right e-primary',
      },
      {
        text: 'Filter Column',
        target: '.e-headercontent',
        id: 'filterCol',
        iconCss: 'e-icons e-active-checkbox float-right e-primary',
      },
      {
        text: 'Multisort',
        target: '.e-headercontent',
        id: 'multiSort',
        iconCss: 'e-icons e-active-checkbox float-right e-primary',
      },
    ];
    this.editparams = { params: { format: 'n' } };
    // this.templateOptions = {
    //   create: (args: { element: Element }) => {
    //     let dd: HTMLInputElement = document.createElement('input');
    //     dd.id = 'duration';
    //     return dd;
    //   },
    //   write: (args: { element: Element }) => {
    //     let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
    //     this.dropDownFilter = new DropDownList({
    //       dataSource: dataSource,
    //       value: 'All',
    //       change: (e: ChangeEventArgs) => {
    //         let valuenum: any = +e.value;
    //         let id: any = <string>this.dropDownFilter.element.id;
    //         let value: any = <string>e.value;
    //         if (value !== 'All') {
    //           this.treegrid.filterByColumn(id, 'equal', valuenum);
    //         } else {
    //           this.treegrid.removeFilteredColsByField(id);
    //         }
    //       },
    //     });
    //     this.dropDownFilter.appendTo('#duration');
    //   },
    // };

    const state: any = { skip: 0, take: 10 };
    this.TaskService.execute(state);
    // console.log({ res });
    // this.TaskService.getAllTasks(state).subscribe((x) => {
    //     this.tasks = x?.result;
    // console.log({ x, da: this.data });
    // @ts-ignore
    // this.data = [...x];
    // this.treegrid.refreshColumns();
    // });
  }

  contextMenuOpen(arg: BeforeOpenCloseEventArgs): void {
    let elem: Element = arg.event.target as Element;
    this.selectedRows.push(elem);
    this.slectedColumn = elem;
    console.log({ elem });
    // let row: Element = elem.closest('.e-row') as Element;
    // let uid: string = row && (row.getAttribute('data-uid') as string);
    // let items: Array<HTMLElement> = [].slice.call(
    //   document.querySelectorAll('.e-menu-item')
    // );
    // for (let i: number = 0; i < items.length; i++) {
    //   items[i].setAttribute('style', 'display: none;');
    // }
    // if (elem.closest('.e-row')) {
    //   if (
    //     isNullOrUndefined(uid) ||
    //     isNullOrUndefined(
    //       getValue(
    //         'hasChildRecords',
    //         this.treegrid.grid.getRowObjectFromUID(uid).data
    //       )
    //     )
    //   ) {
    //     arg.cancel = true;
    //   } else {
    //     let flag: boolean = getValue(
    //       'expanded',
    //       this.treegrid.grid.getRowObjectFromUID(uid).data
    //     );
    //     let val: string = flag ? 'none' : 'block';
    //     document
    //       .querySelectorAll('li#expandrow')[0]
    //       .setAttribute('style', 'display: ' + val + ';');
    //     val = !flag ? 'none' : 'block';
    //     document
    //       .querySelectorAll('li#collapserow')[0]
    //       .setAttribute('style', 'display: ' + val + ';');
    //   }
    // } else {
    //   let len =
    //     this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
    //   if (len !== 0) {
    //     document
    //       .querySelectorAll('li#collapseall')[0]
    //       .setAttribute('style', 'display: block;');
    //   } else {
    //     document
    //       .querySelectorAll('li#expandall')[0]
    //       .setAttribute('style', 'display: block;');
    //   }
    // }
  }

  contextMenuClick(args: MenuEventArgs): void {
    console.log({ treegrid: this.treegrid, args });
    if (args.item.id === 'addNext') {
      this.treegrid.editSettings.newRowPosition = 'Below';
      this.selectedRecordForAdd = this.treegrid.getSelectedRecords()[0];
      //@ts-ignore
      this.treegrid.addRecord();
      // this.actionBegin(args as SaveEventArgs);
      console.log({ SLA: this.selectedRecordForAdd });
      this.treegrid.addEventListener('add', (record: any) => {
        console.log('Added', { record });
      });
      console.log({ SL: this.treegrid.getSelectedRows()[0] });
      console.log({ SL: this.treegrid.getSelectedRecords()[0] });
      // this.treegrid.refresh();
      // this.onOpenDialog(event);
      // this.treegrid.;
      // this.treegrid.refreshColumns();
    } else if (args.item.id === 'addChild') {
      this.treegrid.editSettings.newRowPosition = 'Child';
      this.selectedRecordForAdd = this.treegrid.getSelectedRecords()[0];
      console.log({ SL: this.treegrid.getSelectedRows()[0] });
      console.log({ SL: this.treegrid.getSelectedRecords()[0] });
      this.treegrid.addRecord();
      console.log({ data: this.data });
    } else if (args.item.id === 'delRow') {
      console.log({ sR: this.selectedRows });
      // this.treegrid.deleteRow(
      //   this.treegrid.getSelectedRows()[0] as HTMLTableRowElement
      //   );
      console.log(this.treegrid.getSelectedRows());
      // this.treegrid.deleteRecord('taskID');
      this.treegrid.getSelectedRows().forEach((row) => {
        this.treegrid.deleteRow(row as HTMLTableRowElement);
      });

      console.log({ data: this.data });
    } else if (args.item.id === 'editRow') {
      this.isEditMode = true;
      this.treegrid.startEdit(
        this.treegrid.getSelectedRows()[0] as HTMLTableRowElement
      );
      // this.treegrid.edit();
    } else if (args.item.id === 'multiSelect') {
      this.isMultipleSelection = !this.isMultipleSelection;
      this.treegrid.selectionSettings = !this.isMultipleSelection
        ? { type: 'Single' }
        : { type: 'Multiple' };
      //@ts-ignore
      let temp = [...this.contextMenuItems];
      temp[temp.findIndex((item) => item.id === 'multiSelect')].iconCss = this
        .isMultipleSelection
        ? 'e-icons e-active-checkbox float-right e-primary active'
        : 'e-icons e-active-checkbox float-right e-primary';
      this.contextMenuItems = temp;
    } else if (args.item.id === 'copyRows') {
      this.cutedRow = [];
      const rows = this.treegrid.getSelectedRows();
      rows.forEach((row) => row.classList.add('copy'));
      this.copiedRow = this.treegrid.getSelectedRecords();
    } else if (args.item.id === 'cutRows') {
      this.copiedRow = [];
      this.selectedRowsForCut = this.treegrid.getSelectedRows();
      const rows = this.treegrid.getSelectedRows();
      rows.forEach((row) => row.classList.add('copy'));
      this.cutedRow = this.treegrid.getSelectedRecords();
    } else if (args.item.id === 'pasteNext') {
      if (this.copiedRow && this.copiedRow.length) {
        console.log({ cp: this.copiedRow, ct: this.cutedRow });
        this.copiedRow.forEach((row) =>
          this.treegrid.addRecord(
            //@ts-ignore
            row.taskData,
            //@ts-ignore
            this.treegrid.getSelectedRecords()[0].index,
            'Below'
          )
        );
        document
          .querySelectorAll('.copy')
          .forEach((el) => el.classList.remove('copy'));
      } else if (this.cutedRow && this.cutedRow.length) {
        console.log({
          cp: this.copiedRow,
          ct: this.cutedRow,
          ctRow: this.selectedRowsForCut,
        });
        this.cutedRow.forEach((row) =>
          this.treegrid.addRecord(
            //@ts-ignore
            row.taskData,
            //@ts-ignore
            this.treegrid.getSelectedRecords()[0].index,
            'Below'
          )
        );
        // this.selectedRowsForCut.forEach((row) => {
        setTimeout(() => {
          this.selectedRowsForCut.forEach((row) => {
            this.treegrid.deleteRow(row as HTMLTableRowElement);
          });
          document
            .querySelectorAll('.copy')
            .forEach((el) => el.classList.remove('copy'));
        }, 100);
        this.treegrid.refreshColumns();
      }
    } else if (args.item.id === 'pasteChild') {
      if (this.copiedRow && this.copiedRow.length) {
        console.log({ cp: this.copiedRow, ct: this.cutedRow });
        this.copiedRow.forEach((row) =>
          this.treegrid.addRecord(
            //@ts-ignore
            row.taskData,
            //@ts-ignore
            this.treegrid.getSelectedRecords()[0].index,
            'Child'
          )
        );
        document
          .querySelectorAll('.copy')
          .forEach((el) => el.classList.remove('copy'));
      } else if (this.cutedRow && this.cutedRow.length) {
        console.log({
          cp: this.copiedRow,
          ct: this.cutedRow,
          ctRow: this.selectedRowsForCut,
        });
        this.cutedRow.forEach((row) =>
          this.treegrid.addRecord(
            //@ts-ignore
            row.taskData,
            //@ts-ignore
            this.treegrid.getSelectedRecords()[0].index,
            'Child'
          )
        );
        // this.selectedRowsForCut.forEach((row) => {
        setTimeout(() => {
          this.selectedRowsForCut.forEach((row) => {
            this.treegrid.deleteRow(row as HTMLTableRowElement);
          });
          document
            .querySelectorAll('.copy')
            .forEach((el) => el.classList.remove('copy'));
        }, 100);
        this.treegrid.refreshColumns();
      }
    } else if (args.item.id === 'editCol') {
      this.treegrid.editCell();
      // this.treegrid.
    } else if (args.item.id === 'newCol') {
    } else if (args.item.id === 'delCol') {
      console.log(this.treegrid.getColumnIndexByField('taskID'));
      // this.treegrid.column
    } else if (args.item.id === 'chooseCol') {
      this.treegrid.openColumnChooser();
    } else if (args.item.id === 'freezeCol') {
      let uid: string =
        this.slectedColumn &&
        (this.slectedColumn.getAttribute('e-mappinguid') as string);
      let col: any = this.treegrid.getColumnByUid(uid);
      // console.log({column: this.slectedColumn.getAttributeNames(), columns: col, uid});
      this.frozenColumns = col.index + 1;
    } else if (args.item.id === 'filterCol') {
      this.allowFiltering = !this.allowFiltering;
      //@ts-ignore
      let temp = [...this.contextMenuItems];
      temp[temp.findIndex((item) => item.id === 'filterCol')].iconCss = this
        .allowFiltering
        ? 'e-icons e-active-checkbox float-right e-primary active'
        : 'e-icons e-active-checkbox float-right e-primary';
      this.contextMenuItems = temp;
    } else if (args.item.id === 'multiSort') {
      this.treegrid.allowMultiSorting = false;
      // this.treegrid.allowSorting = false;
    }
  }

  // actionComplete(args: DialogEditEventArgs) {
  //   console.log({ args });
  //   if (args.requestType === 'beginEdit' || args.requestType === 'add') {
  //     const dialog = args.dialog as Dialog;
  //     const TaskName = 'TaskName';
  //     dialog.height = 400;
  //     // change the header of the dialog
  //     dialog.header =
  //       args.requestType === 'beginEdit' ? 'Record of ' : 'New Customer';
  //   }
  // }

  // onOpenDialog(event: any): void {
  //   // Call the show method to open the Dialog
  //   this.ejDialog.show();
  // };
  actionBegin(args: SaveEventArgs): void {
    console.log({ args });
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      //@ts-ignore
      args.dialog.btnObj[0].element.style.display = 'none';
      //@ts-ignore
      args.dialog.btnObj = args.dialog.btnObj;
      //@ts-ignore
      args.dialog.dataBind();
      //@ts-ignore
      args.dialog.btnObj[1].element.style.display = 'none';
      //@ts-ignore
      args.dialog.btnObj = args.dialog.btnObj;
      //@ts-ignore
      args.dialog.dataBind();
      this.taskData = Object.assign({}, args.rowData);
      console.log({ data: this.taskData });
    }
  }

  actionComplete(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.taskData = Object.assign({}, args.rowData);
      console.log({ data: this.taskData });
      //@ts-ignore
      if (args.requestType === 'add' && args.data.taskId) {
        this.treegrid.editSettings.newRowPosition = 'Below';
        //@ts-ignore
        const taskData: any = args?.data.taskData || {};
        this.treegrid.addRecord(taskData, 6, 'Below');
      }
    }
    console.log({ tasks: this.tasks, data: this.data });
  }

  onSave(e: any): void {
    e.preventDefault();
    console.log({ data: this.selectedRecordForAdd, e });
    this.tasks.forEach((task) => console.log({ task }));
    if (this.isEditMode) {
      this.treegrid.endEdit();
      this.isEditMode = false;
      console.log(this.data);
    } else {
      this.treegrid.addRecord(
        this.taskData,
        //@ts-ignore
        this.selectedRecordForAdd.index || undefined
        //@ts-ignore
        // this.selectedRecordForAdd.level === 0 ? "Below" : "Child"
      );
      // let temp = [...this.data];
      // temp.splice(
      //   temp.findIndex(
      //     //@ts-ignore
      //     (item) => item.taskID === this.selectedRecordForAdd.taskID
      //   ),
      //   0,
      //   this.taskData
      // );
      // this.data = temp;
    }
    this.tasks.forEach((task) => console.log({ task }));
    console.log({ test: this.treegrid.parentData });
    this.treegrid.refreshColumns();
    // fs.writeFileSync(
    // './jsondata.json',
    // JSON.stringify(this.treegrid.parentData)
    // );
    // const file = new File(
    //   //@ts-ignore
    //   JSON.stringify(this.treegrid.parentData),
    //   'jsondata.json',
    //   {
    //     type: "text/json"
    //   }
    //   );
    // const fr = new FileReader();

    var file = new File(
      [JSON.stringify(this.treegrid.parentData)],
      'jsondata.json',
      {
        type: 'text/json',
      }
    );
    const fd = new FormData();
    fd.append('file', file, file.name);
    console.log({ file });
    this.TaskService.setAllTasks(fd).subscribe((data) => {
      console.log({ data });
    });
  }

  onCancel() {
    this.treegrid.endEdit();
  }
}

export interface ITaskModel {
  taskID?: Number;
  taskName?: String;
  startDate?: Date;
  endDate?: Date;
  duration?: Number;
  progress?: Number;
  priority?: String;
}
