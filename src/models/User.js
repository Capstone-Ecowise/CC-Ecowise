const { PrismaClient, sql, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {
  getByUsername: async (identifier) => {
    try {
      const response = await prisma.$queryRaw`
            SELECT 
                "User".id, 
                "User".username,
                "User".password, 
                "User".name,
                "User".email,
                "User".status,
                "User".points
            FROM "User"
            WHERE "User".username = ${identifier} OR "User".email = ${identifier}
            LIMIT 1
        `;

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = User;
