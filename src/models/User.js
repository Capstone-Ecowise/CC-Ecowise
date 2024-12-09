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

  findUnique: async (identifier) => {
    return prisma.user.findUnique({
      where: {
        username: identifier,
      },
    });
  },
  update: async (username, data) => {
    if (!username) {
      throw new Error("Username is required for updating a user.");
    }

    try {
      const response = await prisma.user.update({
        where: { username: username },
        data: {
          ...data,
        },
      });

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  get: async (req) => {
    try {
      const username = req.decodedToken.username;

      const response = await prisma.user.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
          username: true,
          password: true,
          email: true,
          name: true,
          profil: true,
          points: true,
          status: true,
        },
      });

      if (!response) {
        throw new Error("User not found");
      }

      return response;
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  },

  getAllUsersOrderedByPoints: async () => {
    try {
      const response = await prisma.user.findMany({
        orderBy: {
          points: "desc",
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          profil: true,
          points: true,
          status: true,
        },
      });

      return response;
    } catch (error) {
      throw new Error(
        `Error fetching users ordered by points: ${error.message}`
      );
    }
  },
};

module.exports = User;
