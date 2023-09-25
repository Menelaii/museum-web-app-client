import {MedalShortDTO} from "../medals/medal-short.dto";
import {MilitaryRankShortDTO} from "../military-ranks/military-rank-short.dto";

export interface BiographyCreationOptionsDTO {
  medals: MedalShortDTO[];
  militaryRanks: MilitaryRankShortDTO[]
}
