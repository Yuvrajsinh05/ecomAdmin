import mongoose from "mongoose";
import { connectDB } from "@/utils/features";
import { fetchDataObjectsOfTypeRangBrand, generateRandomProductFashion } from "./operations";

export const GET = async (request) => {
    try {
        await connectDB();

        const foundCategory = await mongoose.connection.db.collection('categories').find({Categories:"Fashion"}).toArray()

        console.log("foundCategory",foundCategory)
        const getProduct = await generateRandomProductFashion(foundCategory[0])
        // const requestBody = await request.text();
        console.log("getProduct", getProduct);
        // const data = JSON.parse(requestBody);
        const creationResponse = await createProduct(getProduct);
        return creationResponse;
    } catch (err) {
        console.error("Error occurred:", err);
        return new Response(JSON.stringify({ err: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

const createProduct = async (bodyObj) => {
    console.log("duvgger1" ,bodyObj)
    // return;
    try {
        const { category, type, SubType, subcategory } = bodyObj;

        console.log("req.bodycall", bodyObj)
        if (!category) {
            return new Response(JSON.stringify({ message: "Missing Category" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const foundCategory = await mongoose.connection.db.collection('categories').find({Categories:category}).toArray()
        console.log("duvgger2")
        if (!foundCategory[0]) {
            return new Response(JSON.stringify({ message: "Limited For Category Fashion , Electronics , Beauty." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        console.log("duvgger3",foundCategory[0])

        if (!foundCategory[0].SubCategories[0].SubType) {
            const possibleTypes = foundCategory[0].SubCategories.map(subCate => subCate.type);
            if (!possibleTypes.includes(type)) {
                return new Response(JSON.stringify({ message: `We are only selling this Category Type. ${possibleTypes.join(", ")}` }), { status: 400, headers: { 'Content-Type': 'application/json' } });

            }
        }
        console.log("duvgger4")
        if (foundCategory[0].SubCategories[0].SubType) {
            const subCateGoryExists = foundCategory[0].SubCategories.map(subcate => subcate.type)
            if (!subCateGoryExists.includes(subcategory)) {
                return new Response(JSON.stringify({ message: `We are only selling this subcategory Products. ${subCateGoryExists.join(", ")}` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
            console.log("duvgger5")
            const CloneSubCate = foundCategory[0].SubCategories.find(subCategory => subCategory.type === subcategory);
            const PossibleType = CloneSubCate.SubType.map(type => type.Name)

            console.log("duvgger6")
            if (!PossibleType.includes(type)) {
                return new Response(JSON.stringify({ message: `We are only selling this Types Products. ${PossibleType.join(", ")}` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
        }
        console.log("duvgger7")
        if (category == 'Fashion') {
            try {
                const MatchTypeObj = fetchDataObjectsOfTypeRangBrand(subcategory, type, foundCategory[0])
                console.log("duvgger8")
                const addFashionProduct = await CreateFashionProduct(bodyObj, MatchTypeObj)
                console.log("duvgger9")
                return new Response(JSON.stringify({ data: addFashionProduct, message: "Fashion Product Created" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } catch (err) {
                return new Response(JSON.stringify({ message: "Error occurred in /admin/createProduct", err: err }), { status: 500, headers: { 'Content-Type': 'application/json' } });
            }

        } 

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error occurred in /admin/createProduct", err: err }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}


const CreateFashionProduct = async (bodyData, matchType) => {
    try {
        const { name, price, image, description, category, subcategory, type, SubType, brand } = bodyData;
        if (!name || !price || !image || !description || !subcategory || !category || !type || !SubType || !brand) {
            const missingFields = [];
            if (!name) missingFields.push("name");
            if (!price) missingFields.push("price");
            if (!image) missingFields.push("image");
            if (!description) missingFields.push("description");
            if (!subcategory) missingFields.push("subcategory");
            if (!category) missingFields.push("category");
            if (!type) missingFields.push("type");
            if (!SubType) missingFields.push("SubType");
            if (!brand) missingFields.push("brand");
            throw new Response(JSON.stringify({ status: 400, message: `The following fields are mandatory: ${missingFields.join(", ")}.` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!matchType?.Brands.includes(brand)) {
            throw new Response(JSON.stringify({ status: 400, message: "We Are Still Limited With Some Brands", PossibleBrands: matchType?.Brands }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const priceRanges = matchType?.Range.map(range => range.split(' - ').map(Number));
        let priceRangeToUpdate = null;
        for (const range of priceRanges) {
            const [min, max] = range;
            if (price >= min && price <= max) {
                priceRangeToUpdate = range.join(' - ');
                break;
            }
        }
        if (!priceRangeToUpdate) {
            throw new Response(JSON.stringify({ status: 400, message: "Price is not within any allowed range." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        const filter = { Category: category, type: type };
        const update = {
            $inc: {
                [`Brands.${brand}`]: 1,
                [`PriceRange.${priceRangeToUpdate}`]: 1
            }
        };

        const newProduct = {
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            subcategory: subcategory,
            type: type,
            SubType: SubType,
            brand: brand
        };

        try {
            const saved = await mongoose.connection.db.collection('fashions').insertOne(newProduct);
            console.log("createFashion",saved)
            if (saved) {
                await mongoose.connection.db.collection('filtercounts').findOneAndUpdate(filter, update);
                await mongoose.connection.db.collection('categories').findOneAndUpdate({ Categories: "Fashion" }, { $inc: { count: 1 } });
            }
        } catch (error) {
            console.error("Error:", error);
            throw new Response(JSON.stringify({ status: 500, message: "Error occurred while saving fashion product", error: error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        
        return { status: 200, message: "Fashion Product Created" };

    } catch (err) {
        console.error(err);
        return err instanceof Response ? err : new Response(JSON.stringify({ status: 500, message: "Error occurred while creating fashion product", err: err }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
