module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('book', {
        id: {
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
          defaultValue: 1,
          references: {
            model: 'author',
            key: 'id'
          }
        },
        bk_category: {
          allowNull: false,
          type: DataTypes.INTEGER,
          defaultValue: 1,
          references: {
            model: 'category',
            key: 'id'
          }
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
      });
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('book');
    }
  };