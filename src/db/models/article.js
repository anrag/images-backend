export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.TEXT("medium"),
        unique: true,
        allowNull: false,
      },
      longArticle: {
        type: DataTypes.TEXT("long"),
        unique: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(200),
        unique: false,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(4000),
        unique: true,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        unique: false,
        allowNull: true,
      },
      featureImage: {
        type: DataTypes.TEXT("medium"),
        unique: false,
        allowNull: false,
      },
      secondaryImage: {
        type: DataTypes.TEXT("medium"),
        unique: false,
        allowNull: false,
      },
      shortArticle: {
        type: DataTypes.TEXT("long"),
        unique: true,
        allowNull: false,
      },
      featureVideo: {
        type: DataTypes.TEXT("medium"),
        unique: false,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "article",
      indexes: [
        {
          unique: false,
          fields: ["title"],
        },
      ],
    }
  );
  return Article;
};
