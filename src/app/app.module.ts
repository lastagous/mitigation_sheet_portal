import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { TopComponent } from './page/top/top.component';

import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, TopComponent],
  imports: [BrowserModule, AppRoutingModule, ScrollPanelModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
