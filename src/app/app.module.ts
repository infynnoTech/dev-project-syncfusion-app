import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {
  ColumnChooserService,
  ContextMenuService,
  EditService,
  FilterService,
  FreezeService,
  InfiniteScrollService,
  PageService,
  ReorderService,
  ResizeService,
  RowDDService,
  SortService,
  ToolbarService,
  TreeGridModule,
} from '@syncfusion/ej2-angular-treegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridModule,
    //  DialogModule,
    FormsModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    ButtonAllModule,
    HttpClientModule,
    DialogModule,
  ],
  providers: [
    ResizeService,
    SortService,
    PageService,
    FilterService,
    ColumnChooserService,
    ToolbarService,
    ContextMenuService,
    ReorderService,
    EditService,
    InfiniteScrollService,
    FreezeService,
    RowDDService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
