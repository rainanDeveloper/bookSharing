module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('category', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        cat_desc: {
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
        },
      });
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('category');
    }
  };