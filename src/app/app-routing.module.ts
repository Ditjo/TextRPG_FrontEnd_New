import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './components/options/options.component';
import { CharacterSelectorComponent } from './components/character-selector/character-selector.component';
import { CharacterCreatorComponent } from './components/character-creator/character-creator.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

const routes: Routes = [
  {path:'mainmenu', component: MainMenuComponent},
  {path:'character-creator', component: CharacterCreatorComponent},
  {path:'charactor-selector', component: CharacterSelectorComponent},
  {path:'options', component: OptionsComponent},
  {path:'', redirectTo: 'mainmenu', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
