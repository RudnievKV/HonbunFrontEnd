export class WordCreateDto {
  WordCollection_ID!: number;
  Stage_ID!: number;
  Definitions!: Array<Definition>;
  IsInSRS!: boolean;
}
export class Definition {
  PartOfSpeech!: string;
  Meaning!: string;
  Reading!: string;
  OriginalEntry!: string;
}
