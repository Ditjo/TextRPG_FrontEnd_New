export interface PotionType{
    id: number;
    potionTypeNUmber: string | null;
    potionDice: number;
    availableToHero: boolean;
    value: number;
    note: string | null;
}