import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MuseumDTO {
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly address: string;

  @Field()
  readonly city: string;

  @Field()
  readonly image: string;
}