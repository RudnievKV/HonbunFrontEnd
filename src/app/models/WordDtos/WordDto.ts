import MeaningReadingDto from "../MeaningReadingDtos/MeaningReadingDto";
import StageDto from "../StageDtos/StageDto";

export default class WordDto {
  Word_ID!: number;

  WordCollection_ID!: number;
  Stage!: StageDto;
  MeaningReadings!: Array<MeaningReadingDto>;
  IsInSRS!: boolean;
  CreatedDate!: Date;
  UpdatedDate!: Date;
  StartInitialSRSDate!: Date;
  StartCurrentSRSDate!: Date;
}
