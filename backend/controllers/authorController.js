const { author } = require('../models/');

module.exports = {
    async store(request, response){
        const {auth_name} = request.body

        if (auth_name==null){
            return response.status(400).json({success: false, messageError: `You must specify the "auth_name" (author name) parameter!`}) 
        }

        try {
            Author = await author.create({
                auth_name: auth_name
            })

            console.log("Author created successfully!")

            return response.json(Author)
        } catch (error) {
            console.log(`Error during author creation: ${error}`)
            return response.json({success: false, messageError: "Error during author creation"})
        }
    },
    async show(request, response){
        const {auth_id} = request.params

        try {
            const Author = await author.findByPk(auth_id)

            if(Author!==null){
                console.log("Request successfully found data!")

                return response.json(Author)
            }
            else{
                return response.json({success: false, messageError: "Author id not found!"})
            }
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            response.json({success: false, messageError: "Error during data search"})
        }
    },
    async list(request, response){
        try {
            const Authors = await author.findAll()

            console.log("Request successfully found data!")

            return response.json(Authors)
        } catch (error) {
            console.log(`Error during data search: ${error}`)
        }
    },
    async delete(request, response){
        const {auth_id} = request.params

        const Author = await author.findByPk(auth_id)

        if (Author){
            if (Author.destroy()){
                response.json({success: true})
            }
            else{
                response.json({success: true})
            }
        }
        else{
            response.json({success: false, messageError: "Author id not found!"})
        }
    }
}