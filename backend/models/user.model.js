module.exports=(sequelize, DataTypes)=>{
    const user = sequelize.define('user', {
        usr_login: DataTypes.STRING,
        usr_pass: DataTypes.STRING,
        usr_name: DataTypes.STRING,
        usr_email: DataTypes.STRING,
        usr_cpf: DataTypes.STRING,
        usr_avatar: DataTypes.STRING,
        usr_data_nasc: DataTypes.DATEONLY,
        usr_latitude: DataTypes.DECIMAL(18,14),
        usr_longitude: DataTypes.DECIMAL(18,14),
        usr_stars: DataTypes.INTEGER
    }, {tableName: 'user'})

    user.associate = (models)=>{
        user.belongsToMany(models.book, {through: 'book_share', foreignKey: 'sh_user'})
        user.belongsToMany(models.book, {through: 'book_request', foreignKey: 'rq_user'})
    }

    return user
}