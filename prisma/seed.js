const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function seeder() {
  try {
    await prisma.detail.createMany({
      data: [
        {
          class_name: "Battery",
          description: `
            <p>There are different types of batteries, including alkaline, lithium-ion, lead-acid, and rechargeable batteries.</p>
            <p>To manage battery waste responsibly, it's important to avoid throwing them in regular trash and instead recycle them at designated collection points or return them to specialized retailers or recycling centers to ensure safe disposal and recycling.</p>
        `,
          tips: `
            <ul>
                <li>To safely handle batteries, tape the terminals to reduce fire risks, and place similar batteries individually or side by side in clear plastic bags to prevent contact between ends.</li>
                <li>Leaking batteries should be sealed in clear plastic bags.</li>
                <li>Avoid disposing of lead-acid batteries in the trash or municipal recycling bins; instead, return them to a battery retailer or a local household hazardous waste collection program.</li>
            </ul>
        `,
        },
        {
          class_name: "Biological",
          description: `
            <p>Biological recycling of food waste can be done through a number of methods, including composting, anaerobic digestion, and animal feeding.</p>
          `,
          tips: `
            <ul>
              <li>To manage food scraps effectively, use a dedicated bin with a lid to contain odors and deter scavengers, lining it with bags for easy disposal.</li>
              <li>Collect organic waste such as fruit and vegetable peels, eggshells, coffee grounds, and plate scrapings, avoiding contaminants like plastics, glass, or non-organic materials.</li>
              <li>Store the bin in a cool, dry place, preferably in the kitchen, and empty it regularly to prevent odors and ensure space for new scraps.</li>
            </ul>
          `,
        },
        {
          class_name: "Cardboard",
          description: `
            <p>Cardboard can be recycled more than 20 times before the fibers become too weak. Recycling cardboard has many environmental benefits.</p>
          `,
          tips: `
            <ul>
              <li>To recycle cardboard effectively, ensure it is clean and dry, as wet or greasy cardboard can contaminate other recyclables and jam sorting equipment.</li>
              <li>Empty and flatten the boxes, removing packing materials like Styrofoam, but tape and labels can remain as they are removed at recycling centers.</li>
              <li>For oversized boxes, drop them off at a local recycling center, following safety procedures. Consider reusing cardboard for storage, crafts, packing, or donating boxes in good condition.</li>
              <li>If only part of the cardboard is clean, such as the top of a pizza box, separate it from the greasy parts to maximize recyclability.</li>
            </ul>
          `,
        },
        {
          class_name: "Clothes",
          description: `
            <p>Waste clothes are recycled through a process that involves sorting, shredding, and separating the fibers to create new yarn or fabric.</p>
          `,
          tips: `
            <ul>
              <li>The recycling process for clothes begins with sorting them by color and material to avoid re-dyeing, saving energy and dyes.</li>
              <li>The clothes are then shredded into small pieces, with zippers and buttons removed using magnets.</li>
              <li>Next, the fibers are separated through a carding process that combs and straightens them.</li>
              <li>These fibers are mixed with virgin fibers for added strength and spun into yarn, which is subsequently woven into fabric using industrial weaving machines.</li>
            </ul>
          `,
        },
        {
          class_name: "Glass",
          description: `
            <p>Some types of glass, like heat-resistant glass, should not be recycled because they can alter the viscosity of the fluid in the furnace.</p>
          `,
          tips: `
            <ul>
              <li>Glass is infinitely recyclable because it can be remelted and reformed into new products with the same qualities as the original.</li>
              <li>Recycling glass has many environmental benefits, including saving electricity, oil, and landfill space, and preventing air pollutants from being released.</li>
            </ul>
          `,
        },
        {
          class_name: "Metal",
          description: `
            <p>Many types of metals can be recycled, including aluminum, steel, copper, brass, bronze, silver, and gold. Recycled metal can be used to make a variety of products, such as airplanes, automobiles, bicycles, bridges, and computers.</p>
          `,
          tips: `
            <ul>
              <li>The process of recycling scrap metal begins with collection, followed by sorting it into different types using tools like magnets to separate iron from other metals.</li>
              <li>Next, the metal is shredded and melted in high-temperature furnaces or smelters to remove impurities.</li>
              <li>The purified metal is then solidified into ingots, which are transported to factories and plants for further use.</li>
            </ul>
          `,
        },
        {
          class_name: "Paper",
          description: `
            <p>Paper recycling is an important way to reduce pollution and minimize waste. You can also recycle paper at home by creating a recycling center with labeled bins for paper and cardboard.</p>
            <p>Paper that cannot be recycled includes: Paper contaminated with food, Carbon paper, and Stickers.</p>
          `,
          tips: `
            <ul>
              <li>The recycling process for paper starts with collection from recycling bins, drop-off centers, curbside programs, or commercial services.</li>
              <li>The paper is then sorted into different grades and types before being cleaned with soap and water to remove ink, glue, and staples.</li>
              <li>It is reprocessed by mixing it with water to create a slurry, which is de-inked, bleached, and colored if necessary.</li>
              <li>Finally, the slurry is rolled into thin sheets, dried, cut, and prepared for reuse.</li>
            </ul>
          `,
        },
        {
          class_name: "Plastic",
          description: `
            <p>Plastic can also be recycled through chemical recycling, which involves changing the chemical structure of plastic waste to create raw materials for manufacturing.</p>
            <p>This process can use technologies like pyrolysis, gasification, hydro-cracking, and depolymerization.</p>
          `,
          tips: `
            <ul>
              <li>The plastic recycling process begins with users placing plastic into recycling containers, which is then sorted by type and separated from other materials.</li>
              <li>The plastic is washed, shredded into smaller pieces, heated, and extruded into new pellets for reuse.</li>
              <li>To reduce plastic waste, avoid single-use plastics like straws and cutlery, steer clear of non-recyclable plastics, and choose products with minimal plastic packaging.</li>
              <li>Opt for reusable items like shopping bags, water bottles, travel cutlery, and keep cups.</li>
            </ul>
          `,
        },
        {
          class_name: "Shoes",
          description: `
            <p>Used shoes can be donated to social organizations or sold in developing countries to support local economies.</p>
            <p>Due to their environmental impact, it's important to avoid discarding shoes in regular trash bins and instead take advantage of recycling or donation options available.</p>
          `,
          tips: `
            <ul>
              <li>Shoes can be recycled or reused through various options, including recycling centers that handle footwear, and companies like TerraCycle that specialize in recycling shoes.</li>
              <li>Recycling shoes contributes to environmental sustainability and promotes the use of recycled materials in the footwear industry.</li>
              <li>However, shoes should not be disposed of in household recycling bins or black bins.</li>
            </ul>
          `,
        },
        {
          class_name: "Trash",
          description: `
            <p>Before disposal, they should be disinfected and placed in a sealed container, which can then be discarded with household trash.</p>
            <p>Proper protective gear should be worn by anyone handling medical waste to ensure safety. Always follow local guidelines for disposal to manage this waste responsibly.</p>
          `,
          tips: `
            <ul>
              <li>To properly dispose of medical waste, use FDA-approved, corrosion-resistant, and durable containers.</li>
              <li>Separate and seal the waste in the correct containers, labeling them appropriately.</li>
              <li> Follow local guidelines for disposal, and keep sharp containers out of reach of children and pets.</li>
              <li>Sharps should never be placed in recycling bins or medication drop boxes. Before disposal, disinfect sharps with a bleach solution.</li>
              <li>Place the sealed container in a paper bag and discard it with household trash.</li>
              <li>Those handling medical waste should wear proper protective equipment, including gloves, masks, goggles, and full-body protective suits.</li>
            </ul>
          `,
        },
      ],
    });

    console.log("Seeding success");
  } catch (error) {
    console.error("Failed to seed database", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seeder();
