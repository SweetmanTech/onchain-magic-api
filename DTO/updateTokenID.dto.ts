import { IsNotEmpty, IsString } from "class-validator"

export class UpdateTokenIDDTO {
  @IsNotEmpty()
  @IsString()
  tokenID: string

  @IsNotEmpty()
  @IsString()
  walletAddress: string
}
