import { IsNotEmpty, IsString } from "class-validator"

export class VerifyDTO {
  @IsNotEmpty()
  @IsString()
  tweetUrl: string
}
