module.exports = (sequelize, DataTypes) => {
    const Trilha = sequelize.define('Trilha', {
        nome: DataTypes.STRING,
        codigo: DataTypes.STRING,
        duracao: DataTypes.TIME
    });

    Trilha.associate = models => {
        Trilha.belongsTo(models.Usuario, { foreignKey: 'criadorId', as: 'criador' });
        Trilha.belongsToMany(models.Usuario, { through: 'UsuarioTrilha', as: 'participantes' });
        Trilha.hasMany(models.Pergunta, { foreignKey: 'trilhaId' });
    };

    return Trilha;
};