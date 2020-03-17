const { book } = require('../models/')
const { sharerequest } = require('../models/')
const { book_share } = require('../models/')

module.exports = {
    async store(request, response){
        const {bk_title, bk_subtitle, bk_author, bk_book} = request.body

        if (typeof(bk_title)=='null'||typeof(bk_subtitle)=='null'||typeof(bk_author)=='null'||typeof(bk_book)=='null'){
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
        const {usr_id} = request
        if(usr_id!==null){
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
                response.status(400).json({success: false, messageError: "Book id not found!"})
            }
        }
    },
    async storeBookRequest(request, response){
        const {usr_id} = request
        if(usr_id!==null){
            const {bk_id} = request.body
            
            const Book = await book.findByPk(bk_id)

            if (Book){
                try {
                    const bkRequest = await book_request.create({rq_book: bk_id, rq_usr: usr_id})
                    
                    console.log("Book request successfully!")

                    return response.json(bkRequest)
                } catch (error) {
                    console.log(`Error while doing book request: ${error}`)
                    return response.status(500).json({success: false, messageError: "Error while doing book request"})
                }
            }
        }
    },
    async storeBookShare(request, response){
        const {usr_id} = request
        if(usr_id!==null){
            const {bk_id} = request.body
            
            const Book = await book.findByPk(bk_id)

            if (Book){
                try {
                    const bkShare = await book_share.create({sh_book: bk_id, sh_usr: usr_id})
                    
                    console.log("Book shared successfully!")

                    return response.json(bkShare)
                } catch (error) {
                    console.log(`Error during sharing book: ${error}`)
                    return response.status(500).json({success: false, messageError: "Error during sharing book"})
                }
            }
        }
    }
}