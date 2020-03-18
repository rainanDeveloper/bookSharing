module.exports=(sequelize, DataTypes)=>{
    const book_request = sequelize.define('book_request', {
        rq_book: DataTypes.INTEGER,
        rq_usr: DataTypes.INTEGER,
        rq_distance: DataTypes.DECIMAL(18, 10)
    }, {tableName: 'book_request'})

    book_request.associate = (models)=>{
        book_request.belongsTo(models.book, {foreignKey: 'rq_book'})
        book_request.belongsTo(models.user, {foreignKey: 'rq_usr'})
    }

    return book_request
}