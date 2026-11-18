
import { randomBytes } from "node:crypto";
import argon2 from "argon2";

import { prisma } from "../../config/database.js";

// Generate a random public account ID
const generateAccountId = (): string => {
  return `RH-${randomBytes(16).toString("hex").toUpperCase()}`;
};

// Generate a secret recovery key
const generateRecoveryKey = (): string => {
  return `RH-${randomBytes(32).toString("base64url")}`;
};

const registerUser = async (password: string) => {
  // 1. Generate anonymous credentials
  const accountId = generateAccountId();
  const recoveryKey = generateRecoveryKey();

  // 2. Hash password and recovery key using Argon2id
  const [passwordHash, recoveryKeyHash] = await Promise.all([
    argon2.hash(password, {
      type: argon2.argon2id,
    }),

    argon2.hash(recoveryKey, {
      type: argon2.argon2id,
    }),
  ]);

  // 3. Save the user in PostgreSQL
  const user = await prisma.user.create({
    data: {
      accountId,
      passwordHash,
      recoveryKeyHash,
    },
    select: {
      id: true,
      accountId: true,
      createdAt: true,
    },
  });

  // 4. Return the recovery key only once
  return {
    user,
    recoveryKey,
  };
};

export { registerUser };
