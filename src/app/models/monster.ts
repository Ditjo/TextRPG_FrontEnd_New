import { EntityBaseSystem } from "./entityBaseSystem";
import { Inventory } from "./inventory";

export interface Monster
{
    id: number;
    monsterName: string | null;
    monsterXp: number;
    levelDifficulty: number;
    note: string | null;

    ebs: EntityBaseSystem;
    inventory: Inventory;
}