const { book } = require('../models/')
const { user } = require('../models/')
const { book_request } = require('../models/')
const { book_share } = require('../models/')
const { book_match } = require('../models/')

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
    async storeBookShare(request, response){
        const {usr_id} = request
        if(usr_id!==null){
            const {bk_id} = request.body
            
            const Book = await book.findByPk(bk_id)

            if (Book){
                try {
                    let bkShare = await book_share.findOne({where: {sh_book: bk_id, sh_usr: usr_id}})

                    if (bkShare==null){
                        bkShare = await book_share.create({sh_book: bk_id, sh_usr: usr_id})
                    }

                    console.log("Book shared successfully!")

                    const bkRqMatch = await book_request.findOne({where: {rq_book: bk_id, rq_usr: usr_id}})

                    if(bkRqMatch){
                        const donator = await user.findByPk(usr_id)
                        const requester = await user.findByPk(bkRqMatch.rq_usr)

                        if(requester){
                            let horizontalDegDiff = requester.usr_latitude - donator.usr_latitude
                            let verticalDegDiff = requester.usr_longitude - donator.usr_longitude

                            let distanceBetweenUsers = Math.pow((Math.pow(horizontalDegDiff, 2)+Math.pow(verticalDegDiff, 2)), 0.5)

                            let distanceInKm = distanceBetweenUsers*111.045

                            if (distanceInKm<=bkRqMatch.rq_distance){
                                try {
                                    let bookMatch = await book_match.findOne({where: {mt_request: bkRqMatch.id, mt_share: bkShare.id}})

                                    if(bookMatch==null){
                                        bookMatch = await book_match.create({mt_request: bkRqMatch.id, mt_share: bkShare.id})
                                    }

                                    return response.json({
                                            match: true,
                                            matchId: bookMatch.id,
                                            request: bkRqMatch,
                                            distance: distanceInKm
                                        })
                                } catch (error) {
                                    console.log(`Error while performing match between users: ${error}`)
                                    return response.status(500).json({success: false, messageError: "Error: a match was supose to happen, but something went wrong!"})
                                }
                            }
                            else{
                                return response.json(bkShare)
                            }
                        }
                    }

                    return response.json(bkShare)
                } catch (error) {
                    console.log(`Error during sharing book: ${error}`)
                    return response.status(500).json({success: false, messageError: "Error during sharing book"})
                }
            }
        }
    }
}