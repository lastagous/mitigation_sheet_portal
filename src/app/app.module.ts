import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { TableComponent } from './page/table/table.component';
import { SpreadSheetStore } from './store/spreadsheet.store';
import { TableStore } from './store/table.store';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollPanelModule,
    TableModule,
  ],
  providers: [SpreadSheetStore, TableStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
