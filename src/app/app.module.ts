import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AddChipsComponent } from './worked-in-check/add-chips/add-chips.component';

@NgModule({
  declarations: [AppComponent, AddChipsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
