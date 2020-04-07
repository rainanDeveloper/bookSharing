const { user, book, book_request, book_share } = require('../models/')

modules.exports = {
    async store(request, response){
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