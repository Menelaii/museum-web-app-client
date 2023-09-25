import {MilitaryRankDTO} from "../military-ranks/military-rank.dto";

export interface MilitaryRankDetailsDTO {
  dateOfAssignment: Date;
  rank: MilitaryRankDTO;
}
