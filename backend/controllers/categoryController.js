const { category } = require('../models/');

module.exports = {
    async store(request, response){
        const {cat_desc} = request.body

        try {
            Category = await category.create({
                cat_desc: cat_desc
            })

            console.log("Category created successfully!")

            return response.json(Category)
        } catch (error) {
            console.log(`Error during category creation: ${error}`)
            return response.json({success: false, messageError: "Error during category creation"})
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
                return response.json({success: false, messageError: "Category id not found!"})
            }
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            response.json({success: false, messageError: "Error during data search"})
        }
    },
    async list(request, response){
        try {
            const Categorys = await category.findAll()

            console.log("Request successfully found data!")

            return response.json(Categorys)
        } catch (error) {
            console.log(`Error during data search: ${error}`)
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
            response.json({success: false, messageError: "Category id not found!"})
        }
    }
}