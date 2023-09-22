import UserDto from "../UserDtos/UserDto";
import WordDto from "../WordDtos/WordDto";

export default class WordCollectionDto {
  WordCollection_ID!: number;
  Name!: string;
  Description!: string;
  Words!: Array<WordDto>;
  User!: UserDto;

  CreatedDate!: Date;
  UpdatedDate!: Date;
}
