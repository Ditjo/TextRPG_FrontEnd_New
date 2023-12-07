import { baseId } from "./baseId";
import { EntityBaseSystem } from "./entityBaseSystem";
import { Inventory } from "./inventory";

export interface Monster extends baseId
{
    monsterName: string | null;
    monsterXp: number;
    levelDifficulty: number;
    note: string | null;

    ebs: EntityBaseSystem;
    inventory: Inventory;
}