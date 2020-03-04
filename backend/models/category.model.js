module.exports=(sequelize, DataTypes)=>{
    const category = sequelize.define('category', {
        cat_desc: DataTypes.STRING,
        adicionefreezeTableName: true
    }, {})

    category.associate = (models)=>{
        category.hasMany(models.book, {as: 'books'})
    }

    return category
}