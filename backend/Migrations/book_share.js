module.exports = {
    up: (queryInterface, DataTypes)=>{
        return queryInterface.createTable('book_share', {
            sh_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            sh_book: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
                references: {
                    model: 'book',
                    key: 'bk_id'
                }
            },
            sh_usr: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
                references: {
                    model: 'user',
                    key: 'usr_id'
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
        return queryInterface.dropTable('book_share')
    },
}