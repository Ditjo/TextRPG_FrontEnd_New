import { Armour } from "./armour";
import { Potion } from "./potion";
import { Weapon } from "./weapon";

export interface Inventory
{
    id: number;
    gold: number;
    armourId: number;

    weapon: Weapon[] | null;
    armour: Armour | null;
    potion: Potion[] | null;
}