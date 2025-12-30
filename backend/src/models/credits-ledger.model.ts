import mongoose, { Document, Schema, Types } from "mongoose";

/* =======================
   Enums
======================= */

export enum CreditSourceEnum {
  SESSION = "SESSION",
  PURCHASE = "PURCHASE",
  ADMIN = "ADMIN",
  REFUNDED = "REFUNDED",
}

export enum CreditStatusEnum {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  REVERSED = "REVERSED",
}

export enum CreditTypeEnum {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

/* =======================
   Interface
======================= */

export interface CreditsLedgerDocument extends Document {
  userId: Types.ObjectId;
  type: CreditTypeEnum; // CREDIT or DEBIT
  amount: number; // Always positive
  source: CreditSourceEnum; // SESSION / PURCHASE / ADMIN / REFUNDED
  sourceId?: Types.ObjectId; // sessionId | paymentId | adminId
  status: CreditStatusEnum;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   Schema
======================= */

const creditLedgerSchema = new Schema<CreditsLedgerDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: Object.values(CreditTypeEnum),
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    source: {
      type: String,
      enum: Object.values(CreditSourceEnum),
      required: true,
    },

    sourceId: {
      type: Schema.Types.ObjectId,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(CreditStatusEnum),
      default: CreditStatusEnum.CONFIRMED,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

/* =======================
   Indexes
======================= */

// Prevent duplicate credit for same source
creditLedgerSchema.index(
  { userId: 1, source: 1, sourceId: 1, type: 1 },
  { unique: true, partialFilterExpression: { sourceId: { $exists: true } } }
);

// Fast balance calculation
creditLedgerSchema.index({ userId: 1, createdAt: -1 });

/* =======================
   Validation
======================= */

creditLedgerSchema.pre("validate", function () {
  if (this.amount <= 0) {
    throw new Error("Credit amount must be greater than zero");
  }
});

/* =======================
   Model
======================= */

const CreditsLedgerModel = mongoose.model<CreditsLedgerDocument>(
  "CreditsLedger",
  creditLedgerSchema
);

export default CreditsLedgerModel;
