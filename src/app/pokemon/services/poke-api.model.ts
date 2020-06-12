export interface PokeAPIList {
  results: PokeAPIResult[];
}

export interface PokeAPIResult {
  name: string;
  url: string;
}

export interface PokeAPITypeSlot {
  slot: number;
  type: PokeAPIResult;
}

export interface Pokemon  {
  name: string;
  types: PokeAPITypeSlot[];
  sprites: {
    front_default: string;
  };
}
