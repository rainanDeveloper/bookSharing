const { book } = require('../models/')

module.exports = {
    async store(request, response){
        const {bk_title, bk_subtitle, bk_author, bk_book} = request.body

        if (typeof(bk_title)!=='string'||typeof(bk_subtitle)!=='string'||typeof(bk_author)!=='number'||typeof(bk_book)!=='number'){
            return response.status(400).json({success: false, messageError: `You must specify all the book parameters!`}) 
        }

        try {
            Book = await book.create({bk_title, bk_subtitle, bk_author, bk_book})

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

            if(Book!==null){
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
        const {bk_id} = request.params

        const Book = await book.findByPk(bk_id)

        if (Book){
            if (Book.destroy()){
                response.json({success: true})
            }
            else{
                response.json({success: true})
            }
        }
        else{
            response.status(500).json({success: false, messageError: "Book id not found!"})
        }
    }
}