export interface ItemsReadDto {
  itemId: number;
  itemName: string;
  itemDescription: string;
  stockQuantity: number;
  price: number;
}

export type ItemsWriteDto = Omit<ItemsReadDto, 'itemId'>;
