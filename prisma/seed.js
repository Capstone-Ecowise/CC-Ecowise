const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function seeder() {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);

    const userData = [
      {
        username: "bimadhrmwn",
        password: hashedPassword,
        email: "bimadharmawan6@Gmail.com",
        name: "Bima Dharmawan",
        points: 0,
        status: "Seed",
      },
      {
        username: "hafizattariq",
        password: hashedPassword,
        email: "hafizattariq02@gmail.com",
        name: "Hafiz Attariq",
        points: 0,
        status: "Seed",
      },
    ];

    await prisma.user.createMany({
      data: userData,
    });

    console.log("Seeding success");
  } catch (error) {
    console.error("Failed to seed database", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seeder();
