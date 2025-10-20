export interface IFetchingData {
  readonly id: number;
  readonly name: string;
  readonly priority: IPriority;
  readonly partner: IPartner;
  readonly status: IStatus;
  readonly description: string;
  readonly isApprouve: boolean;
  readonly isSentToPartner: boolean;
  readonly detail_description: IDetailDescription[];
}

export const PRIORITY_OPTIONS = ["Hight", "Medium", "Low"] as const;
export type IPriority = (typeof PRIORITY_OPTIONS)[number] | "";

export const PARTNER_OPTIONS = ["Jack & Jones", "Name IT", "LMTD", "Object", "Only", "Vero Moda", "Vila", "JJXX", "Noisy May", "JDY", "Only & Sons", "Pieces", "YAS", "Selected", "Mamalicious"] as const;
export type IPartner = (typeof PARTNER_OPTIONS)[number] | "";

export const STATUS_OPTIONS = ["Pending", "Sent", "In Progress", "Completed", "Rejected"] as const;
export type IStatus = (typeof STATUS_OPTIONS)[number];

export interface IDetailDescription {
  readonly photo_id: number;
  readonly style: string[];
  readonly text: string;
}
