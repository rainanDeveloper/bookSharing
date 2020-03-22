module.exports=(sequelize, DataTypes)=>{
    const book_share = sequelize.define('book_share', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {tableName: 'book_share'})

    return book_share
}