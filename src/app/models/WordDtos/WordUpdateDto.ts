import { Definition } from "./WordCreateDto";

export class WordUpdateDto {
  WordCollection_ID!: number;
  Stage_ID!: number;
  Definitions!: Array<Definition>;
  IsInSRS!: boolean;
}
