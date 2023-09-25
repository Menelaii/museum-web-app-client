import {MedalDTO} from "../medals/medal.dto";

export interface MedalDetailsDTO {
  dateOfAward: Date;
  placeOfAward: string;
  medal: MedalDTO;
}
