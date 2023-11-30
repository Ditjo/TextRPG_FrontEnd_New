import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterCreatorComponent } from './components/character-creator/character-creator.component';
import { CharacterSelectorComponent } from './components/character-selector/character-selector.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCreatorComponent,
    CharacterSelectorComponent,
    MainMenuComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
