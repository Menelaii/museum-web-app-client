import {FileAttachmentDTO} from "../file-attachments/file-attachment.dto";
import {CareerDetailsDTO} from "../details/career-details.dto";
import {MilitaryRankDetailsDTO} from "../details/military-rank-details.dto";
import {MedalDetailsDTO} from "../details/medal-details.dto";
import {ImageAttachmentDTO} from "../file-attachments/image-attachment.dto";
import {BiographyShortDTO} from "./biography-short.dto";

export interface BiographyDTO extends BiographyShortDTO {
  placeOfBirth: string;
  placeOfDeath: string;
  medalDetails: MedalDetailsDTO[];
  militaryRankDetails: MilitaryRankDetailsDTO[];
  militaryServiceDetails: CareerDetailsDTO[];
  employmentHistory: CareerDetailsDTO[];
  images: ImageAttachmentDTO[];
  presentation: FileAttachmentDTO;
}
