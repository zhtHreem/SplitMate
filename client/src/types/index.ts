
export enum SplitType {
  EQUAL = 'equal',
  CUSTOM = 'custom',
  PERCENTAGE = 'percentage'
}

export interface CustomSplit {
  memberId: string;
  amount: number;
}

