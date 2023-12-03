import { IsNotEmpty, IsString } from "class-validator"

export class UpdateCre8orNumberDTO {
  @IsNotEmpty()
  @IsString()
  walletAddress: string

  @IsNotEmpty()
  @IsString()
  cre8orNumber: string
}
