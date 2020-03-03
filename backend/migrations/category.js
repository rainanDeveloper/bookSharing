module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('category', {
        cat_id: {
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
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updated_at: {
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