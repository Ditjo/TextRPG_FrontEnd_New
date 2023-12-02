import { baseId } from "./baseId";
import { PotionType } from "./potionType";

export interface Potion extends baseId
{
    // id: number;
    inventoryId: number;
    potionId: number;
    amount: number;

    potionType: PotionType[] | null;
}