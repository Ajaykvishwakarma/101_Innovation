const mongoose = require('mongoose');
const favSchema = new mongoose.Schema(
    {
        code: { type: Number, required: true},
        url: { type: String, required: true},
        icon: { type: String, required: true},
        creator: { type: String, required: true},
        product_name: { type: String, required: true},
        generic_name: { type: String, required: true},
        quantity: { type: String, required: true},
        packaging: { type: String, required: true},
        packaging_tags: { type: String, required: true},
        serving_size: { type: String, required: false, default: null },
        energy_100g: { type: Number, required: true},
        energy_from_fat_100g: { type: String, required: false, default: null },
        fat_100g: { type: Number, required: true},
        saturated_fat_100g: { type: Number, required: true},
        monounsaturated_fat_100g: { type: Number, required: false, default: null },
        polyunsaturated_fat_100g: { type: Number, required: false, default: null },
        omega_3_fat_100g: { type: Number, required: true},
        omega_6_fat_100g: { type: Number, required: false, default: null },
        trans_fat_100g: { type: Number, required: false, default: null },
        cholesterol_100g: { type: Number, required: true},
        carbohydrates_100g: { type: Number, required: true},
        sugars_100g: { type: Number, required: true},
        fiber_100g: { type: Number, required: true},
        proteins_100g: { type: Number, required: true},
        salt_100g: { type: Number, required: true},
        sodium_100g: { type: Number, required: true},
    },{
        versionKey : false
    }
    
)


module.exports = mongoose.model('favorite', favSchema)