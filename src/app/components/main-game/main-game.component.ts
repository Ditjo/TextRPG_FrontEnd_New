import { Component } from '@angular/core';
import { Hero } from '../../models/hero';
import { GenericService } from '../../services/generic.service';
import { TableURL } from '../../tools/table-url';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrl: './main-game.component.css'
})
export class MainGameComponent {

  constructor(
    private heroService:GenericService<Hero>,
  ){
    
  }
  ngOnInit(){


    let i = localStorage.getItem('HeroToGame')

    if (i != null ){
      this.heroService.getById(TableURL.Hero, i as unknown as number).subscribe(
        (data)=> {
          this.playingHero = data;
        }
      )
    localStorage.removeItem('HeroToGame')
  }
  }

  playingHero?:Hero
}
