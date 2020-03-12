const { book } = require('../models/')

module.exports = {
    async store(request, response){
        const {bk_title, bk_subtitle, bk_author, bk_category} = request.body

        if (typeof(bk_title)!=='string'||typeof(bk_subtitle)!=='string'||typeof(bk_author)!=='number'||typeof(bk_category)!=='number'){
            return response.status(400).json({success: false, messageError: `You must specify all the book parameters!`}) 
        }

        try {
            Book = await book.create({bk_title, bk_subtitle, bk_author, bk_category})

            console.log("Book created successfully!")

            return response.json(Book)
        } catch (error) {
            console.log(`Error during book creation: ${error}`)
            return response.json({success: false, messageError: "Error during book creation"})
        }
    }
}