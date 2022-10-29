"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('userrole', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    roleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    freezeTableName: true,
    tableName: 'userrole'
  });
  return UserRole;
};
exports.default = _default;
//# sourceMappingURL=userrole.js.map