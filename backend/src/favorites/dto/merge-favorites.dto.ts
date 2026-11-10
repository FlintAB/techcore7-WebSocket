import {
   ArrayMaxSize,
   ArrayUnique,
   IsArray,
   IsInt,
   Min,
} from 'class-validator';

export class MergeFavoritesDto {
   @IsArray()
   @ArrayMaxSize(100)
   @ArrayUnique()
   @IsInt({ each: true })
   @Min(1, { each: true })
   productIds: number[];
}