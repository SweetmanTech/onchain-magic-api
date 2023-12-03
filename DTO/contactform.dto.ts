import { IsNotEmpty, IsString, IsEmail } from "class-validator"

export class ContactFormDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  message: string
}
