import { DefaultPrivacyLevel } from "./user";
import { Like, Comment } from ".";

export enum TransactionStatus {
  pending = "pending",
  incomplete = "incomplete",
  complete = "complete"
}

export enum TransactionRequestStatus {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected"
}

export interface Transaction {
  id: string;
  uuid: string;
  source: string; // Empty if Payment or Request; Populated with BankAccount ID
  amount: number;
  description: string;
  privacyLevel: DefaultPrivacyLevel;
  receiverId: string;
  senderId: string;
  balanceAtCompletion?: number;
  status: TransactionStatus;
  requestStatus?: TransactionRequestStatus;
  requestResolvedAt?: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export interface TransactionResponseItem extends Transaction {
  likes: Like[];
  comments: Comment[];
  receiverName: string;
  senderName: string;
}

export type TransactionPayload = Omit<
  Transaction,
  "id" | "uuid" | "createdAt" | "modifiedAt"
>;

export type TransactionUpdateActionPayload = Pick<
  Transaction,
  "id" | "requestStatus"
>;

type TransactionQueryBase = {
  dateRangeStart?: string;
  dateRangeEnd?: string;
  amountMin?: number;
  amountMax?: number;
  status?: TransactionStatus;
};

export type TransactionQueryPayload = Partial<TransactionQueryBase>;

export type TransactionDateRangePayload = Partial<
  Pick<TransactionQueryPayload, "dateRangeStart" | "dateRangeEnd">
>;

export type TransactionAmountRangePayload = Partial<
  Pick<TransactionQueryPayload, "amountMin" | "amountMax">
>;

export type TransactionClearFiltersPayload = {
  filterType: "date" | "amount";
};
