import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Monster } from '../../models/monster';
import { GenericService } from '../../services/generic.service';
import { TableURL } from '../../tools/table-url';
import { Hero } from '../../models/hero';
import { DiceRollInterval } from '../../tools/diceroller';

@Component({
  selector: 'app-game-battle',
  templateUrl: './game-battle.component.html',
  styleUrl: './game-battle.component.css'
})
export class GameBattleComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monsterService: GenericService<Monster>
  ){
    this.staticHero = this.router.getCurrentNavigation()?.extras?.state?.['input']
    this.dynamicHero = JSON.parse(JSON.stringify(this.staticHero));
    this.GetAMonsterToFight();
    
  }

ngOnInit(){

}

  staticHero!:Hero
  dynamicHero!:Hero
  staticMonster?:Monster
  dynamicMonster?:Monster
  monstersTurn:boolean = false
  turns:number = 2

  GetAMonsterToFight():void{
    this.monsterService.getAll(TableURL.Monster).subscribe(
      (data) =>{
        let temp  = data.filter(x => x.levelDifficulty <= this.staticHero.level)
        this.staticMonster = temp.at(DiceRollInterval(1,temp.length)-1)
        if (this.staticMonster != null){
          this.dynamicMonster = JSON.parse(JSON.stringify(this.staticMonster))
          this.InitiateBattle()
        }
      }
    )
  }

  InitiateBattle():void{
    if ( this.dynamicMonster == null)
      return

    if ((this.dynamicMonster?.entityBaseSystem.agility + DiceRollInterval(1,3)) > (this.dynamicHero.entityBaseSystem.agility + DiceRollInterval(1,3))){
      this.monstersTurn = true;
      console.log('Monster goes first');
      this.BattleLoop();
    }
    else{
      console.log('Hero goes first');
      
    }

  }

  BattleLoop():void{
    // console.log('BattleLoop');
    
    if (this.monstersTurn){
      //Reset Dynamic Monster
      while (this.turns != 0){
        this.turns -= 1
        this.CallMonster()
      }
      this.turns = 2;
      this.monstersTurn = false
      //Reset Dynamic Hero
    }
    else{
      this.monstersTurn = true;
    }
  }

  CallMonster():void{
    console.log('Monster is Called');
  }
  Attack():void{
    // console.log('Before Change');
    // console.log('Static Hero');
    // console.log(this.staticHero);
    // console.log('Dynamic Hero');
    // console.log(this.dynamicHero);
    // this.dynamicHero.heroXp += 5
    // console.log('After Change');
    // console.log('Static Hero');
    // console.log(this.staticHero);
    // console.log('Dynamic Hero');
    // console.log(this.dynamicHero);

    console.log('Hero Attack');
    this.BattleLoop()
  }
  Defend():void{
    console.log('Hero Defend');
    this.BattleLoop()
  }
  MoveCloser():void{
    console.log('Hero Moves Closer');
    this.BattleLoop()
  }
  MoveAway():void{
    console.log('Hero Moves Away');
    this.BattleLoop()
  }
  Rest():void{
    console.log('Hero Rests');
    this.BattleLoop()
  }
  UseItem():void{
    console.log('Hero Uses Item');
    this.BattleLoop()
  }
  Flea():void{
    console.log('Hero Fleeas');
    this.router.navigate(["../adventure-menu"], {relativeTo: this.route, state: { input: this.staticHero}})
  }
  Return(): void{
    this.router.navigate(["../adventure-menu"], {relativeTo: this.route, state: { input: this.staticHero}})
  }
}
