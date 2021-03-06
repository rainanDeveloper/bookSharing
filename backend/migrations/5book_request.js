module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('book_request', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            rq_book: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
                references: {
                    model: 'book',
                    key: 'id'
                }
            },
            rq_usr: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            rq_distance: {
                allowNull: false,
                type: DataTypes.DECIMAL(18, 10),
                defaultValue: 10
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
    },
    down: (queryInterface)=>{
        return queryInterface.dropTable('book_request')
    },
}