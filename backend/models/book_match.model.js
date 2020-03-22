module.exports=(sequelize, DataTypes)=>{
    const book_match = sequelize.define('book_match', {
        mt_request: DataTypes.INTEGER,
        mt_share: DataTypes.INTEGER
    }, {tableName: 'book_match'})

    book_match.associate = (models)=>{
        book_match.belongsTo(models.book_request, {foreignKey: 'mt_request'})
        book_match.belongsTo(models.book_share, {foreignKey: 'mt_share'})
    }

    return book_match
}