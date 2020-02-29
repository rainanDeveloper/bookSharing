module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('book', {
        bk_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        bk_title: {
          allowNull: false,
          type: DataTypes.STRING,
          length: 120
        },
        bk_subtitle: {
          allowNull: false,
          type: DataTypes.STRING,
          length: 120
        },
        bk_author: {
          allowNull: false,
          type: DataTypes.INTEGER,
          defaultValue: 1
        },
        bk_category: {
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
      });
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('book');
    }
  };