module.exports=(sequelize, DataTypes)=>{
    const book_share = sequelize.define('book_share', {
        sh_book: DataTypes.INTEGER,
        sh_usr: DataTypes.INTEGER,
        adicionefreezeTableName: true
    }, {})

    book_share.associate = (models)=>{
        book_share.belongsTo(models.book, {foreignKey: 'sh_book'})
        book_share.belongsTo(models.user, {foreignKey: 'sh_usr'})
    }

    return book_share
}