import { Pipe, PipeTransform } from "@angular/core";
import WordCollectionDto from "../models/WordCollectionDtos/WordCollectionDto";

@Pipe({ name: 'wordCount' })
export class WordCountPipe implements PipeTransform {
  constructor(
  ) { }
  transform(wordCollection: WordCollectionDto, trigger: number): string {

    console.log("WordCountPipe trigger");


    // let benefitName = benefitDto.Local_Benefits.find(s => s.Local.LocalizationCode == currentLanguage)?.LocalBenefitName;
    // if (benefitName) {
    //   return benefitName;
    // } else {
    //   return "";
    // }
    return "";
  }
}
