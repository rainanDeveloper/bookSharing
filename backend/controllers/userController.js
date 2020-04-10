const { user } = require('../models/')
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')


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
                return response.status(500).json({success: false, messageError: "Error during user creation"})
            }
        }
        else{
            console.log(`User already exists!`)

            return response.json(User)
        }
    },
    async login(request, response){
        const {usr_login, usr_pass} = request.body
        if(typeof(usr_login)=="string"&&typeof(usr_pass)=="string"){
            User = await user.findAll({
                where: {
                    usr_login: usr_login,
                    usr_pass: usr_pass
                }
            })
            if(User.length>0){
                const id = User[0].id

                var token = jwt.sign({id}, config.SECRET, {
                    expiresIn: 3600
                })

                response.json({auth: true, token: token, username: User[0].usr_name})
            }
            else{
                console.log(`Failed login attempt`)
                return response.status(401).json({success: false, messageError: "User not found: login and pass fields does not match or are not in our database!"})
            }
        }
    },
    async validateJWT(request, response, next){
        const token = request.headers['x-access-token']

        if(!token){
            return response.status(401).json({auth: false, message: 'No token provided.'})
        }

        jwt.verify(token, config.SECRET, async (error, decoded)=>{
            if(error){
                return response.status(401).json({auth: false, message: 'Failed to authenticate token.'})
            }

            request.usr_id = decoded.id

            next()
        })
    },
    async show(request, response){
        const {usr_id} = request.params

        try {
            const User = await user.findByPk(usr_id)

            if(User!==null){
                console.log("Request successfully found data!")

                let {usr_id, usr_login, usr_name, usr_email, usr_avatar, usr_data_nasc, usr_latitude, usr_longitude, usr_stars} = User

                return response.json({usr_id, usr_login, usr_name, usr_email, usr_avatar, usr_data_nasc, usr_latitude, usr_longitude, usr_stars})
            }
            else{
                return response.status(400).json({success: false, messageError: "User id not found!"})
            }
        } catch (error) {
            console.log(`Error during data search: ${error}`)
            response.status(500).json({success: false, messageError: "Error during data search"})
        }
    },
    async list(request, response){
        try {
            const Users = await user.findAll({attributes: ['id', 'usr_login', 'usr_name', 'usr_email', 'usr_avatar', 'usr_data_nasc', 'usr_latitude', 'usr_longitude', 'usr_stars']})

            console.log("Request successfully found data!")

            return response.json(Users)
        } catch (error) {
            console.status(500).log(`Error during data search: ${error}`)
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
            response.status(500).json({success: false, messageError: "User id not found!"})
        }
    },
    async changeLocation(request, response){
        const token = request.headers['x-access-token']

        if (!token){
            return response.status(401).json({auth: false, message: 'No token provided.'})
        }

        jwt.verify(token, config.SECRET, async (error, decoded)=>{

            if (error){
                return response.status(500).json({auth: false, message: 'Failed to authenticate token.'})
            }

            const usr_id = decoded.id

            const {usr_latitude, usr_longitude} = request.body

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
        })
    }
}