const path = require("path");

// load dotenv if not in production environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.join(__dirname, "../", ".env.local"),
  });
}

const PrismaClient = require("@prisma/client").PrismaClient;
const Prisma = new PrismaClient();

async function seed() {
  try {
    console.log("seeding initialized");

    let existingUser = await Prisma.users.findMany({
      where: { username: "admin" },
      select: { username: true },
    });
    console.log(existingUser);

    // abort if database is seeded on the first run
    if (existingUser.length) {
      console.log("database is seeded . aborting...");
      return;
    }

    await Prisma.users.create({
      data: {
        username: "admin",
        email: "admin@gmail.com",
        isAdmin: true,
        password:
          "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
      },
    });

    await Prisma.pagedata.create({
      data: {
        id: 1,
        username: "admin",
        handlerText: "Luxury Travel Hackers",
        avatarUrl:
          "https://luxurytravelhackers.com/wp-content/uploads/2020/04/Logo_LTH-09-copy-1-300x286.png",
        avatarBorderColor: "#ffffff",
        bgColor: "#cca567",
        accentColor: "#bdd7ff",
        handlerFontSize: "20",
        handlerFontColor: "#262621",
        avatarwidth: "50",
        footerBgColor: "#000000ad",
        footerTextSize: "12",
        footerText: "Powered by Luxury Travel Hackers",
        footerTextColor: "#ffffff",
        handlerDescription:
          "The number one luxury travel booking platform",
        handlerDescriptionFontColor: "#262621",
        linktreeWidth: "320",
        linkdata: {
          create: {
            bgColor: "#2C6BED",
            textColor: "#ffffff",
            displayText: "Welcome to Luxury Travel Hackers",
            iconClass: "fas fa-link",
            linkUrl: "",
            linkEffect: "None",
          },
        },
        socialdata: {
          create: {
            iconClass: "fab fa-github",
            linkUrl: "",
            bgColor: "#2C6BED",
            borderRadius: "5",
          },
        },
      },
    });

    await Prisma.$disconnect();
    console.log("disconnected from database");
    console.log("seeding ran successfully");

    return;
  } catch (e) {
    console.log(e);
    console.error("error occured \ncould not run seeding successfully");
    console.log(e.message);
    process.exit(1);
  }
}

seed()
  .then(() => process.exit())
  .catch((err) => console.error(err));
