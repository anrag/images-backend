"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'role',
    indexes: [{
      unique: false,
      fields: ['name']
    }]
  });
  return Role;
};
exports.default = _default;
//# sourceMappingURL=role.js.map