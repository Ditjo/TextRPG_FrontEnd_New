export interface Armour{
    id: number;
    armourTypeName: string | null;
    armourModifier: number;
    availableToHero: boolean;
    value: number;
    note: string | null;
}