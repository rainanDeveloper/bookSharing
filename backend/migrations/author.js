module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('author', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            auth_name: {
                allowNull: false,
                type: DataTypes.STRING,
                length: 120
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        })
    }
}