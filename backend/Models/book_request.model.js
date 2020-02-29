module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('book_request', {
            rq_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            rq_book: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            rq_usr: {
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
        return queryInterface.dropTable('book_request')
    },
}