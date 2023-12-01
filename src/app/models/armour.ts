import { baseId } from "./baseId";

export interface Armour extends baseId
{
    // id: number;
    armourTypeName: string | null;
    armourModifier: number;
    availableToHero: boolean;
    value: number;
    note: string | null;
}