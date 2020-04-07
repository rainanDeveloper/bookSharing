const Sequelize = require('sequelize')
const config = require('../config/config.json')
const { user, book, book_request, book_share } = require('../models/')

sequelize = new Sequelize(config)

module.exports = {
    async store(request, response){
        const {usr_id} = request
        if(usr_id){
            const {bk_id, rq_distance} = request.body
            
            const Book = await book.findByPk(bk_id)

            if (Book){
                try {

                    let bkRequest = await book_request.findOne({where: {rq_book: bk_id, rq_usr: usr_id}})

                    if (bkRequest==null){
                        bkRequest = await book_request.create({rq_book: bk_id, rq_usr: usr_id, rq_distance})
                    }
                    
                    console.log("Book requested successfully!")

                    const bkShMatch = await book_share.findOne({where: {sh_book: bkRequest.rq_book}})

                    if(bkShMatch){
                        
                        const donator = await user.findByPk(bkShMatch.sh_usr)
                        const requester = await user.findByPk(usr_id)

                        if(donator){
                            let horizontalDegDiff = requester.usr_latitude - donator.usr_latitude
                            let verticalDegDiff = requester.usr_longitude - donator.usr_longitude

                            let distanceBetweenUsers = Math.pow((Math.pow(horizontalDegDiff, 2)+Math.pow(verticalDegDiff, 2)), 0.5)

                            let distanceInKm = distanceBetweenUsers*111.045

                            if (distanceInKm<=bkRequest.rq_distance){
                                try {
                                    let bookMatch = await book_match.findOne({where: {mt_request: bkRequest.id, mt_share: bkShMatch.id}})

                                    if(bookMatch==null){
                                        bookMatch = await book_match.create({mt_request: bkRequest.id, mt_share: bkShMatch.id})
                                    }

                                    return response.json({
                                            match: true,
                                            matchId: bookMatch.id,
                                            request: bkRequest,
                                            distance: distanceInKm
                                        })
                                } catch (error) {
                                    console.log(`Error while performing match between users: ${error}`)
                                    return response.status(500).json({success: false, messageError: "Error: a match was supose to happen, but something went wrong!"})
                                }
                            }
                            else{
                                return response.json(bkRequest)
                            }
                        }
                    }
                    else{
                        return response.json(bkRequest)
                    }
                    
                } catch (error) {
                    console.log(`Error while doing book request: ${error}`)
                    return response.status(500).json({success: false, messageError: "Error while doing book request"})
                }
            }
        }
    },
    async list(request, response){
        const {usr_id} = request
        if(usr_id){
            try {
                const [bkRequests] = await sequelize.query(`SELECT * FROM book_request INNER JOIN book ON book.id = book_request.rq_book INNER JOIN author ON author.id=book.bk_author WHERE book_request.rq_usr=${usr_id}`)
                
                return response.json(bkRequests)
            } catch(error) {
                return response.status(500).json({success: false, messageError: `Error during searching for user requests: ${error}`})
            }
        }
    },
    async delete(request, response){
        const {usr_id} = request
        if(usr_id){
            try {
                const {id} = request.params

                const bkRequest = await book_request.findByPk(id)

                if(bkRequest){
                    if(bkRequest.destroy()){
                        return response.json({success: true})
                    }
                    else{
                        return response.status(500).json({success: false})
                    }
                }
            } catch (error) {
                return response.status(400).json({success: false, messageError: "Request id not found!"})
            }
        }
    }
}