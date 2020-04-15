const { book } = require('../models/')
const { Op } = require("sequelize")

module.exports = {
    async store(request, response){
        const {bk_title, bk_subtitle, bk_author, bk_category} = request.body

        if (typeof(bk_title)=='null'||typeof(bk_subtitle)=='null'||typeof(bk_author)=='null'||typeof(bk_category)=='null'){
            return response.status(400).json({success: false, messageError: `You must specify all the book parameters!`}) 
        }

        try {
            Book = await book.create({bk_title, bk_subtitle, bk_author, bk_category})

            console.log("Book created successfully!")

            return response.json(Book)
        } catch (error) {
            console.log(`Error during book creation: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during book creation"})
        }
    },
    async show(request, response){
        const {bk_id} = request.params

        try {
            const Book = await book.findByPk(bk_id)

            if(Book){
                console.log("Request successfully found data!")

                return response.json(Book)
            }
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during data search"})
        }
    },
    async list(request, response){
        try {
            const Books = await book.findAll()

            console.log("Request successfully found data!")

            return response.json(Books)
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during data search"})
        }
    },
    async delete(request, response){
        const {usr_id} = request
        if(usr_id!==null){
            const {bk_id} = request.params

            const Book = await book.findByPk(bk_id)

            if (Book){
                if (Book.destroy()){
                    response.json({success: true})
                }
                else{
                    response.status(500).json({success: true})
                }
            }
            else{
                response.status(400).json({success: false, messageError: "Book id not found!"})
            }
        }
    },
    async search(request, response){
        const {author, category} = request.query

        let whereStatement = {}

        if (author && category){
            whereStatement = {
                bk_author: author,
                bk_category: category
            }
        }
        else{
            if(author){
                whereStatement = {
                    bk_author: author
                }
            }
            if(category){
                whereStatement = {
                    bk_category: category
                }    
            }
        }

        try {
            const Books = await book.findAll({
                where: whereStatement
            })

            console.log("Request successfully found data!")

            return response.json(Books)
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            return response.status(500).json({success: false, messageError: "Error during data search"})
        }
    }
}