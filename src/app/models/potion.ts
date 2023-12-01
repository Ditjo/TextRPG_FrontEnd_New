import { PotionType } from "./potionType";

export interface Potion
{
    id: number;
    inventoryId: number;
    potionId: number;
    amount: number;

    potionType: PotionType[] | null;
}