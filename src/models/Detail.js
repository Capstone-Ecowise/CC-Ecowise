const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Detail = {
  findUnique: async (className) => {
    try {
      const detail = await prisma.detail.findFirst({
        where: {
          class_name: className,
        },
      });
      return detail;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Detail;
