import { Definition } from "../WordDtos/WordCreateDto";

export default class WordCollectionCreateDto {
  Name!: string;
  Description!: string;
  //Words!: Array<WordCreate>;
  User_ID!: number;
}
export class WordCreate {
  Stage_ID!: number;
  IsInSRS!: boolean;
  Definitions!: Array<Definition>;
}
