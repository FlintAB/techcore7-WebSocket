import {
   ArrayMaxSize,
   IsArray,
   ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { MergeCartItemDto } from './merge-cart-item.dto';

export class MergeCartDto {
   @IsArray()
   @ArrayMaxSize(100)
   @ValidateNested({ each: true })
   @Type(() => MergeCartItemDto)
   items: MergeCartItemDto[];
}