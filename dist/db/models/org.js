"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (sequelize, DataTypes) => {
  const Org = sequelize.define("org", {
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
    tableName: "org",
    indexes: [{
      unique: false,
      fields: ["name"]
    }]
  });
  return Org;
};
exports.default = _default;
//# sourceMappingURL=org.js.map