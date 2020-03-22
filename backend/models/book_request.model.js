module.exports=(sequelize, DataTypes)=>{
    const book_request = sequelize.define('book_request', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rq_distance: DataTypes.DECIMAL(18, 10)
    }, {tableName: 'book_request'})

    return book_request
}