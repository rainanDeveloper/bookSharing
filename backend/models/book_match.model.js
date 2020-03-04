module.exports=(sequelize, DataTypes)=>{
    const book_match = sequelize.define('book_match', {
        rq_book: DataTypes.INTEGER,
        mt_share: DataTypes.INTEGER
    }, {tableName: 'book_match'})

    book_match.associate = (models)=>{
        book_match.belongsTo(models.book_request, {foreignKey: 'rq_book'})
        book_match.belongsTo(models.book_share, {foreignKey: 'mt_share'})
    }

    return book_match
}