import { IsNotEmpty, IsString } from "class-validator"

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsString()
  status: string

  @IsNotEmpty()
  applicants: string[]
}
