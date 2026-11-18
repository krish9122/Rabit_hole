
import assert from "node:assert/strict";
import argon2 from "argon2";

import { prisma } from "../config/database.js";
import { registerUser } from "../modules/auth/auth.service.js";

const testRegistration = async (): Promise<void> => {
  let accountId: string | undefined;

  const testPassword = "RabbitHole_Test@2026";

  try {
    console.log("\nTesting Rabbit Hole registration...\n");

    // 1. Call our registration service
    const result = await registerUser(testPassword);

    accountId = result.user.accountId;

    console.log("1. Registration service executed successfully");

    // 2. Check generated account ID
    assert.match(result.user.accountId, /^RH-[A-F0-9]{32}$/);

    console.log("2. Account ID generated successfully");

    // 3. Check generated recovery key
    assert.match(result.recoveryKey, /^RH-/);

    console.log("3. Recovery key generated successfully");

    // 4. Find the user in PostgreSQL
    const savedUser = await prisma.user.findUnique({
      where: {
        accountId: result.user.accountId,
      },
    });

    assert.ok(savedUser, "User was not saved in PostgreSQL");

    console.log("4. User successfully saved in PostgreSQL");

    // 5. Verify password was hashed correctly
    const passwordMatches = await argon2.verify(
      savedUser.passwordHash,
      testPassword
    );

    assert.equal(passwordMatches, true);

    console.log("5. Password hash verified successfully");

    // 6. Verify recovery key was hashed correctly
    const recoveryKeyMatches = await argon2.verify(
      savedUser.recoveryKeyHash,
      result.recoveryKey
    );

    assert.equal(recoveryKeyMatches, true);

    console.log("6. Recovery key hash verified successfully");

    // 7. Check sensitive hashes aren't returned
    assert.equal(
      Object.hasOwn(result.user, "passwordHash"),
      false
    );

    assert.equal(
      Object.hasOwn(result.user, "recoveryKeyHash"),
      false
    );

    console.log("7. Sensitive hashes were not returned");

    console.log("\nAll registration tests passed!");
  } catch (error) {
    console.error("\nRegistration test failed:", error);
    throw error;
  } finally {
    // Remove the temporary test account
    if (accountId) {
      await prisma.user.deleteMany({
        where: { accountId },
      });
    }

    await prisma.$disconnect();
  }
};

void testRegistration();
