module.exports=(sequelize, DataTypes)=>{
    const book = sequelize.define('book', {
        bk_title: DataTypes.STRING,
        bk_subtitle: DataTypes.STRING,
        bk_author: DataTypes.INTEGER,
        bk_category: DataTypes.INTEGER
    }, {tableName: 'book'})

    book.associate = (models)=>{
        book.belongsTo(models.author, {foreignKey: 'bk_author'})
        book.belongsTo(models.category, {foreignKey: 'bk_category'})
        book.belongsToMany(models.user, {as: "donator", through: { model: models.book_share, unique: false }, foreignKey: 'sh_book'})
        book.belongsToMany(models.user, {as: "requester", through: { model: models.book_request, unique: false }, foreignKey: 'rq_book'})
    }

    return book
}