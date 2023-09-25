import {CareerDetailsDTO} from "../details/career-details.dto";
import {MilitaryRankDetailsUploadDTO} from "../details/military-rank-details-upload.dto";
import {MedalDetailsUploadDTO} from "../details/medal-details-upload.dto";

export interface BiographyUploadDTO {
  surname: string;
  name: string;
  patronymic: string;
  birthDate: Date;
  placeOfBirth: string;
  dateOfDeath: Date;
  placeOfDeath: string;
  medalDetails: MedalDetailsUploadDTO[];
  militaryRankDetails: MilitaryRankDetailsUploadDTO[];
  militaryServiceDetails: CareerDetailsDTO[];
  employmentHistory: CareerDetailsDTO[];
}
