import { WordCreate } from "./WordCollectionCreateDto";

export default class WordCollectionUpdateDto {
  Name!: string;
  Description!: string;
  // Words!: Array<WordCreate>;
}
