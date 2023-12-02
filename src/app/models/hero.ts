import { baseId } from "./baseId";
import { Career } from "./career";
import { EntityBaseSystem } from "./entityBaseSystem";
import { Inventory } from "./inventory";
import { Race } from "./race";

export interface Hero extends baseId
{
    // id: number;
    heroName: string | null;
    heroXp: number;
    level: number;
    raceId: number;
    careerId: number;
    note: string | null;

    ebs: EntityBaseSystem;
    inventory: Inventory;
    race: Race | null;
    career: Career | null;
}