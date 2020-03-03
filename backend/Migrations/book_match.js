module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('book_match', {
            mt_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            mt_request: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
                references: {
                    model: 'book_request',
                    key: 'rq_id'
                }
            },
            mt_share: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
                references: {
                    model: 'book_share',
                    key: 'sh_id'
                }
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