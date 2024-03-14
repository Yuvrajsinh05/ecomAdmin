import OpenAI from "openai";
import { createClient } from "pexels";

function getRandomItemFromArray(array) {
  console.log("array", array)
  const takeItem = array[Math.floor(Math.random() * array.length)];
  return takeItem;
}

async function chatWithOpenAiModal(promt) {
  console.log("promt", promt)
  // return;
  const ChatWithAi = new OpenAI({ apiKey: process.env.OPENAI })
  const completion = await ChatWithAi.chat.completions.create({
    messages: [{ role: "system", content: promt }],
    model: "gpt-3.5-turbo",
  });
  return await completion.choices[0].message.content;
}

export const fetchDataObjectsOfTypeRangBrand = (type, subtype, foundCategory) => {
  if (subtype) {
      const subCategory = foundCategory.SubCategories.find(sub => sub.type === type);
      if (subCategory) {
          const subTypeData = subCategory.SubType.find(sub => sub.Name === subtype);
          if (subTypeData) {
              return subTypeData;
          } else {
              return "Subtype not found";
          }
      } else {
          return "Type not found";
      }
  } else {
      return foundCategory.SubCategories.find(sub => sub.type === type);
  }

}

async function GenrateImageForProduct(word) {
  try {
    const client = new createClient(process.env.PEXELKEY);
    const query = word;
    // Search for photos based on the query
    const generateImage = await client.photos.search({ query, per_page: 1 });
    // If no photos are found, throw an error with a specific message
    if (!generateImage || !generateImage?.photos || generateImage.photos.length === 0) {
      throw new Error('No images found for the given query');
    }
    // Extract the URL of the first photo
    const WebPageImage = generateImage.photos[0]?.src?.original;
    return WebPageImage;
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error in fetching image:', err.message);
    // Throw an error with a specific message
    throw { status: 400, message: "Failed While Generating Image" } // Generic error message
  }
}

export async function generateRandomProductFashion(reference) {
  console.log("referce" ,reference)
  console.log("referce" ,reference.SubCategories)
  try {
    // Get random category
    const category = reference.Categories;

    console.log("debuger1111111")
    // Get random subcategory
    const subcategoryObj = getRandomItemFromArray(reference.SubCategories);
    const subcategory = subcategoryObj.type;
    console.log("debuger222222")
    // Get random type
    const typeObj = getRandomItemFromArray(subcategoryObj.SubType);
    console.log("debuger3333333")
    const type = typeObj.Name;

    // Get random brand
    const brand = getRandomItemFromArray(typeObj.Brands);
    console.log("debuger44444")
    // Generate random price
    const price = Math.floor(Math.random() * 501); // Generates a random number between 0 and 500

    const GenerateSubType = await chatWithOpenAiModal(`Generate subtype for ${category} ${subcategory} ${type} in string only word`)
    const GenerateNameProduct = await chatWithOpenAiModal(`Generate Product name for ${category} ${subcategory} ${type} ${GenerateSubType} ${brand} ${price} in string only word`)
    const GenerateNameProductDescription = await chatWithOpenAiModal(`Generate Product description for ${category} ${subcategory} ${type} ${GenerateSubType} ${GenerateNameProduct} ${brand} ${price} in string  words only give description no other text strict Output`)
    const GenerateRandomWordForImage = await chatWithOpenAiModal(`Generate Product String Word TO Fetch A Image  Based on "${subcategory}" "${type}" "${GenerateNameProduct}" "${brand}"  only a Word No Other Text Strict Output Not Defficult Give Simple Word that is possible to get image with it very very simple we can find photos of that word`)

    console.log("images generattion stars with Word", GenerateRandomWordForImage)
    const GenerateImage = await GenrateImageForProduct(GenerateRandomWordForImage.trim().replace(/"/g, ''))
    console.log("images generattion ends...")
    // Construct and return the product schema
    return {
      category: category,
      subcategory: subcategory,
      SubType: type,
      type: type,
      brand: brand,
      price: price,
      name: GenerateNameProduct,
      description: GenerateNameProductDescription,
      image: GenerateImage
    };
  } catch (err) {
    console.log("Err creating fashion", err)
    throw err;
  }
}