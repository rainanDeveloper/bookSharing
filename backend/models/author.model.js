module.exports=(sequelize, DataTypes)=>{
    const author = sequelize.define('author', {
        auth_name: DataTypes.STRING
    }, {})

    author.associate = (models)=>{
        author.hasMany(models.book, {as: 'books'})
    }

    return author
}