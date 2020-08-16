module.exports=(sequelize, DataTypes)=>{
    const user = sequelize.define('user', {
        usr_login: DataTypes.STRING,
        usr_pass: DataTypes.CHAR,
        usr_salt: DataTypes.CHAR,
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
        user.belongsToMany(models.book, {as:'requestedBook', through: { model: models.book_share, unique: false }, foreignKey: 'sh_usr'})
        user.belongsToMany(models.book, {as:'sharedBook', through: { model: models.book_request, unique: false }, foreignKey: 'rq_usr'})
    }

    return user
}