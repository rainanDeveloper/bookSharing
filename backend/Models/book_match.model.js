module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('book_match', {
            mt_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            mt_book: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            mt_usr: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1
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
    },
    down: (queryInterface)=>{
        return queryInterface.dropTable('book_match')
    },
}