module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('user', {
        usr_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        usr_login: {
          allowNull: false,
          type: DataTypes.STRING,
          length: 120
        },
        usr_pass: {
          allowNull: false,
          type: DataTypes.CHAR,
          length: 64
        },
        usr_name: {
          allowNull: false,
          type: DataTypes.STRING,
          length: 120
        },
        usr_email: {
          allowNull: false,
          type: DataTypes.STRING,
          length: 120
        },
        usr_cpf: {
          allowNull: false,
          type: DataTypes.CHAR,
          length: 11
        },
        usr_avatar: {
          allowNull: false,
          type: DataTypes.STRING,
          length: 120
        },
        usr_data_nasc: {
          allowNull: false,
          type: DataTypes.DATEONLY,
        },
        usr_latitude: {
          allowNull: false,
          type: DataTypes.DECIMAL(18,14)
        },
        usr_longitude: {
          allowNull: false,
          type: DataTypes.DECIMAL(18,14)
        },
        usr_stars: {
          allowNull: false,
          type: DataTypes.INTEGER
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
      return queryInterface.dropTable('user');
    }
  };