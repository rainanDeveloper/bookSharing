const { category } = require('../models/');

module.exports = {
    async store(request, response){
        const {cat_desc} = request.body

        if (cat_desc==null){
            return response.status(400).json({success: false, messageError: `You must specify the "cat_desc" (category description) parameter!`}) 
        }

        try {
            Category = await category.create({
                cat_desc: cat_desc
            })

            console.log("Category created successfully!")

            return response.json(Category)
        } catch (error) {
            console.log(`Error during category creation: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during category creation"})
        }
    },
    async show(request, response){
        const {cat_id} = request.params

        try {
            const Category = await category.findByPk(cat_id)

            if(Category!==null){
                console.log("Request successfully found data!")

                return response.json(Category)
            }
            else{
                return response.status(500).json({success: false, messageError: "Category id not found!"})
            }
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during data search"})
        }
    },
    async list(request, response){
        try {
            const Categorys = await category.findAll()

            console.log("Request successfully found data!")

            return response.json(Categorys)
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during data search"})
        }
    },
    async delete(request, response){
        const {cat_id} = request.params

        const Category = await category.findByPk(cat_id)

        if (Category){
            if (Category.destroy()){
                response.json({success: true})
            }
            else{
                response.json({success: true})
            }
        }
        else{
            response.status(400).json({success: false, messageError: "Category id not found!"})
        }
    }
}