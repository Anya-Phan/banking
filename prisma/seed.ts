import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { create } from "domain";
import "dotenv/config";
const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});


async function main() {


  // Create user
  const user = await prisma.user.create({
    data: {
      email: "demo@email.com",
      name: "Demo User",
    },
  })

  // Create banks
  const vietcombank = await prisma.bank.create({
    data: {
      name: "Vietcombank",
      balance: 18000000,
      userId: user.id,
      digit: "0000"
    },
  })

  const mbbank = await prisma.bank.create({
    data: {
      name: "MB Bank",
      balance: 3500000,
      userId: user.id,
      digit: "0000"
    },
  })

  const cash = await prisma.bank.create({
    data: {
      name: "Cash Wallet",
      balance: 800000,
      userId: user.id,
      digit: "0000"
    },
  })

  // Create transactions
  await prisma.transaction.createMany({
    data: [
      {
        amount: 18000000,
        type: "INCOME",
        category: "Salary",
        note: "Monthly salary",
        bankId: vietcombank.id,
        userId: user.id,
      },
      {
        amount: -120000,
        type: "EXPENSE",
        category: "Transport",
        note: "Grab ride",
        bankId: mbbank.id,
        userId: user.id,
      },
      {
        amount: -65000,
        type: "EXPENSE",
        category: "Food",
        note: "Coffee",
        bankId: cash.id,
        userId: user.id,
      },
      {
        amount: -250000,
        type: "EXPENSE",
        category: "Shopping",
        note: "Uniqlo T-shirt",
        bankId: vietcombank.id,
        userId: user.id,
      },
      {
        amount: -90000,
        type: "EXPENSE",
        category: "Food",
        note: "Lunch",
        bankId: mbbank.id,
        userId: user.id,
      },
    ],
  })

  console.log("Seed completed 🌱")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })