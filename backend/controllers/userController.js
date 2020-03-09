const { user } = require('../models/');

module.exports = {
    async store(request, response){
        const {usr_login, usr_pass, usr_name, usr_email, usr_cpf, usr_data_nasc, usr_latitude, usr_longitude} = request.body

        if (usr_login==null||usr_pass==null||usr_name==null||usr_email==null||usr_cpf==null||usr_data_nasc==null||usr_latitude==null||usr_longitude==null){
            return response.status(400).json({success: false, messageError: `You must specify all the user parameters!`}) 
        }

        User = await user.findOne({where:{usr_email: usr_email}})

        if (!User){
            try {
                User = await user.create({
                    usr_login: usr_login,
                    usr_pass:usr_pass,
                    usr_name:usr_name,
                    usr_email:usr_email,
                    usr_cpf:usr_cpf,
                    usr_avatar: "",
                    usr_data_nasc: usr_data_nasc,
                    usr_latitude: usr_latitude,
                    usr_longitude: usr_longitude,
                    usr_stars:0})
    
                console.log("User created successfully!")
    
                return response.json(User)
            } catch (error) {
                console.log(`Error during user creation: ${error}`)
                return response.json({success: false, messageError: "Error during user creation"})
            }
        }
        else{
            console.log(`User already exists!`)

            return response.json(User)
        }
    },
    async show(request, response){
        const {usr_id} = request.params

        try {
            const User = await user.findByPk(usr_id)

            if(User!==null){
                console.log("Request successfully found data!")

                return response.json(User)
            }
            else{
                return response.json({success: false, messageError: "User id not found!"})
            }
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            response.json({success: false, messageError: "Error during data search"})
        }
    },
    async list(request, response){

        try {
            const Users = await user.findAll()

            console.log("Request successfully found data!")

            return response.json(Users)
        } catch (error) {
            console.log(`Error during data search: ${error}`)
        }
    },
    async delete(request, response){
        const {usr_id} = request.params

        const User = await user.findByPk(usr_id)

        if (User){
            if (User.destroy()){
                response.json({success: true})
            }
            else{
                response.json({success: true})
            }
        }
        else{
            response.json({success: false, messageError: "User id not found!"})
        }
    },
    async this.changeLocation(request, response){
        const {usr_id, usr_latitude, usr_longitude} = request.body

        const User = await user.findByPk(usr_id)

        if (User && typeof(usr_latitude)=='number' && typeof(usr_longitude)=='number'){
            User.usr_latitude = usr_latitude
            User.usr_longitude = usr_longitude
            await User.save()
            return response.json({success: true})
        }
        else{
            return response.status(400).json({success: false, messageError: `You must specify parameters!`})
        }
    }
}