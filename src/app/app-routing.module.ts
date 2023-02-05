import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './page/table/table.component';

const routes: Routes = [
  { path: 'mitigationsheet/:sheetId/:sheetName', component: TableComponent },
  { path: '', redirectTo: '/mitigationsheet', pathMatch: 'full' },
  { path: '**', redirectTo: '/mitigationsheet', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
