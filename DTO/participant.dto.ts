import { IsNotEmpty, IsString } from "class-validator"

export class ParticipantDTO {
  @IsNotEmpty()
  @IsString()
  walletAddress: string

  @IsNotEmpty()
  @IsString()
  twitterHandle: string
}
