module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        usuario: DataTypes.STRING,
        senha: DataTypes.STRING,
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        dataNascimento: DataTypes.DATE
    });

    Usuario.associate = models => {
        Usuario.hasMany(models.Trilha, { foreignKey: 'criadorId' }); // Relaciona para quando o usuario cria uma trilha
        Usuario.belongsToMany(models.Trilha, { through: 'UsuarioTrilha', as: 'trilhasParticipando' }); // para quando o usuario participa de uma trilha
        Usuario.hasMany(models.HistoricoResposta, { foreignKey: 'usuarioId' });
    };

    return Usuario;
};