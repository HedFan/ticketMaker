export interface IFetchingData {
  readonly id: number;
  readonly name: string;
  readonly priority: IPriority;
  readonly partner: IPartner;
  readonly status: IStatus;
  readonly description: string;
  readonly approuve: boolean;
  readonly detail_description: IDetailDescription[];
}

export type IPriority = "Hight" | "Medium" | "Low";

export type IPartner = "Jack & Jones" | "Name IT" | "LMTD" | "Object" | "Only" | "Vero Moda" | "Vila" | "JJXX" | "Noisy May" | "JDY" | "Only & Sons" | "Pieces" | "YAS" | "Selected" | "Mamalicious";

export type IStatus = "Pending" | "Sent" | "In Progress" | "Completed" | "Rejected";

export interface IDetailDescription {
  readonly photo_id: number;
  readonly style: string[];
  readonly text: string;
}
