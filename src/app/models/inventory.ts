import { Armour } from "./armour";
import { baseId } from "./baseId";
import { Potion } from "./potion";
import { Weapon } from "./weapon";

export interface Inventory extends baseId
{
    // id: number;
    gold: number;
    armourId: number | null;

    weapons: Weapon[] | null;
    armour: Armour | null;
    potions: Potion[] | null;
}