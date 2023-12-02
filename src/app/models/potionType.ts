import { baseId } from "./baseId";

export interface PotionType extends baseId
{
    // id: number;
    potionTypeNUmber: string | null;
    potionDice: number;
    availableToHero: boolean;
    value: number;
    note: string | null;
}