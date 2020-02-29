module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('author', {
            auth_id: {
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
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        })
    }
}